package main

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/charmbracelet/log"

	_ "beavermoney.app/ent/runtime"

	"beavermoney.app"
	"beavermoney.app/cmd/server/auth"
	"beavermoney.app/cmd/server/config"
	"beavermoney.app/cmd/server/database"
	"beavermoney.app/cmd/server/seed"
	"beavermoney.app/cmd/server/setup"
	"beavermoney.app/ent/user"
	"beavermoney.app/ent/userkey"
	"beavermoney.app/internal/contextkeys"
	"beavermoney.app/internal/fxrate"
	"beavermoney.app/internal/market"
	"entgo.io/contrib/entgql"
	entsql "entgo.io/ent/dialect/sql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/jwtauth/v5"
	"github.com/markbates/goth/gothic"
)

func main() {
	ctx := context.Background()

	// Load config
	cfg, err := config.Load()
	if err != nil {
		panic(err)
	}

	// Setup logging
	logger := setupLogging(cfg.IsProd)

	// Setup auth
	tokenAuth := auth.NewJWTAuth(cfg.JWTSecret)
	auth.SetupGoth(cfg)

	// Connect database
	entClient, db, err := database.Connect(cfg.PostgresURL)
	if err != nil {
		panic(err)
	}
	defer entClient.Close() //nolint:errcheck
	defer db.Close()        //nolint:errcheck

	// Run migrations
	if err := database.Migrate(db, logger); err != nil {
		panic(err)
	}

	// Setup database (currencies, etc.)
	if err := setup.Setup(ctx, entClient, logger); err != nil {
		logger.Error(
			"database setup failed",
			slog.String("error", err.Error()),
		)
		panic(err)
	}

	// Setup internal clients
	fxrateProvider := fxrate.NewFrankfurterProvider(cfg.FrankfurterBaseURL)
	fxrateClient := fxrate.NewClient(fxrateProvider)

	marketProvider := market.NewYahooProvider()
	marketClient := market.NewClient(marketProvider)

	// Seed database (dev only)
	if !cfg.IsProd {
		// Seed data always for now
		if err := seed.Seed(ctx, entClient, fxrateClient, marketClient); err != nil {
			logger.Error(
				"seeding database failed",
				slog.String("error", err.Error()),
			)
		}
	}

	// Setup router
	r := chi.NewRouter()
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{cfg.WebURL},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{
			"Accept",
			"Authorization",
			"Content-Type",
			"X-CSRF-Token",
			"sentry-trace",
			"X-Household-ID",
			"baggage",
		},
		AllowCredentials: true,
		MaxAge:           300,
		Debug:            false,
	}))

	r.Use(middleware.Logger)

	// Setup GQL
	gqlHandler := handler.NewDefaultServer(
		beavermoney.NewSchema(logger, entClient, fxrateClient, marketClient),
	)
	gqlHandler.Use(entgql.Transactioner{TxOpener: entClient})

	r.Handle("/", playground.Handler("GraphQL playground", "/query"))
	r.Group(func(r chi.Router) {
		r.Use(jwtauth.Verifier(tokenAuth))
		r.Use(jwtauth.Authenticator(tokenAuth))
		r.Use(auth.Middleware(entClient))

		r.Handle("/query", gqlHandler)
	})

	// Setup Auth routes
	r.Get(
		"/auth/{provider}/callback",
		func(res http.ResponseWriter, req *http.Request) {
			p := req.PathValue("provider")
			if !cfg.IsProd && p == "local" {
				userID := entClient.User.Query().
					Where(user.EmailEQ("joey@beavermoney.app")).
					OnlyIDX(contextkeys.NewPrivacyBypassContext(ctx))

				_, tokenString, _ := tokenAuth.Encode(
					map[string]any{
						"user_id": strconv.Itoa(userID),
					},
				)

				res.Header().
					Set("Location", cfg.WebURL+"/auth/callback?token="+tokenString)
				res.WriteHeader(http.StatusTemporaryRedirect)
				return
			}

			gothicUser, err := gothic.CompleteUserAuth(res, req)
			if err != nil {
				fmt.Fprintln(res, err) //nolint:errcheck
				return
			}

			switch gothicUser.Provider {
			case "google":
				if verifiedEmail, ok := gothicUser.RawData["verified_email"].(bool); !ok ||
					!verifiedEmail {
					fmt.Fprintln( //nolint:errcheck
						res,
						"email not verified or could not be determined",
					)
					return
				}

				userID, err := entClient.User.Create().
					SetEmail(gothicUser.Email).
					SetName(gothicUser.Name).
					OnConflict(entsql.ConflictColumns(user.FieldEmail)).
					Ignore().ID(contextkeys.NewPrivacyBypassContext(ctx))
				if err != nil {
					res.WriteHeader(http.StatusInternalServerError)
					logger.Error(
						"failed creating user",
						slog.String("error", err.Error()),
					)
					return
				}

				err = entClient.UserKey.Create().
					SetUserID(userID).
					SetKey(gothicUser.UserID).
					SetProvider(userkey.ProviderGoogle).
					OnConflict(entsql.ConflictColumns(userkey.FieldProvider, userkey.FieldKey)).
					Ignore().Exec(contextkeys.NewPrivacyBypassContext(ctx))
				if err != nil {
					res.WriteHeader(http.StatusInternalServerError)
					logger.Error(
						"failed creating user key",
						slog.String("error", err.Error()),
					)
					return
				}

				// TODO: implement short-lived token + refresh token
				_, tokenString, _ := tokenAuth.Encode(
					map[string]interface{}{
						"user_id": strconv.Itoa(userID),
					},
				)

				res.Header().
					Set("Location", cfg.WebURL+"/auth/callback?token="+tokenString)
				res.WriteHeader(http.StatusTemporaryRedirect)

			default:
				fmt.Fprintf( //nolint:errcheck
					res,
					"provider %s not supported",
					gothicUser.Provider,
				)
				return
			}
		},
	)

	r.Get(
		"/logout/{provider}",
		func(res http.ResponseWriter, req *http.Request) {
			gothic.Logout(res, req) //nolint:errcheck

			res.Header().Set("Location", cfg.WebURL)
			res.WriteHeader(http.StatusTemporaryRedirect)
		},
	)

	r.Get("/auth/{provider}", func(res http.ResponseWriter, req *http.Request) {
		gothic.BeginAuthHandler(res, req)
	})

	// Health check endpoint
	r.Get(
		"/health",
		http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusOK)
			w.Write([]byte("OK")) //nolint:errcheck
		}),
	)

	// Start server
	http.ListenAndServe(":"+cfg.Port, r) //nolint:errcheck
}

func setupLogging(isProd bool) *slog.Logger {
	logOptions := log.Options{
		ReportCaller:    true,
		ReportTimestamp: true,
	}
	if isProd {
		logOptions.Formatter = log.JSONFormatter
		logOptions.Level = log.InfoLevel
	} else {
		logOptions.TimeFormat = time.Kitchen
		logOptions.Level = log.DebugLevel
	}

	slogHandler := log.NewWithOptions(os.Stderr, logOptions)
	logger := slog.New(slogHandler)
	slog.SetDefault(logger)

	return logger
}
