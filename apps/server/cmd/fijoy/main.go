package main

import (
	"context"
	"encoding/json"
	"fijoy"
	"fijoy/config"
	"fijoy/ent"
	"fijoy/ent/migrate"

	// "fijoy/internal/util/market"
	// market_client "fijoy/internal/util/market/client"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	auth_handler "fijoy/internal/domain/auth/handler"
	auth_usecase "fijoy/internal/domain/auth/usecase"
	fijoy_middleware "fijoy/internal/middleware"

	user_repository "fijoy/internal/domain/user/repository"

	analytics_usecase "fijoy/internal/domain/analytics/usecase"

	health_handler "fijoy/internal/domain/health/handler"

	"entgo.io/contrib/entgql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/lib/pq"
	"go.uber.org/zap"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/jwtauth/v5"

	"github.com/getsentry/sentry-go"
	sentryhttp "github.com/getsentry/sentry-go/http"
	_ "github.com/rs/cors"
)

var logger *zap.Logger

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		panic(err)
	}
	version, err := getVersionFromPackageJSON()
	if err != nil {
		panic(err)
	}

	// To initialize Sentry's handler, you need to initialize Sentry itself beforehand
	if err := sentry.Init(sentry.ClientOptions{
		Dsn: cfg.Sentry.SENTRY_DSN_SERVER,
		// Set TracesSampleRate to 1.0 to capture 100%
		// of transactions for tracing.
		// We recommend adjusting this value in production,
		TracesSampleRate: 1.0,
		AttachStacktrace: true,
		Release:          version,
	}); err != nil {
		fmt.Printf("Sentry initialization failed: %v\n", err)
	}
	defer sentry.Flush(2 * time.Second)

	logger, err = zap.NewProduction()
	if err != nil {
		panic(err)
	}

	defer func() {
		if err := logger.Sync(); err != nil {
			logger.Error(err.Error())
		}
	}()

	entClient, err := ent.Open("postgres", cfg.Database.DB_URL)
	if err != nil {
		panic(err)
	}

	ctx := context.Background()
	if err := entClient.Schema.Create(ctx, migrate.WithGlobalUniqueID(true)); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	sentryMiddleware := sentryhttp.New(sentryhttp.Options{
		Repanic: true,
	})

	analyticsService := analytics_usecase.New(cfg.Analytics)

	// var marketDataClient market.MarketDataClient
	// if cfg.Market.TWELVE_DATA_SECRET_KEY == "" {
	// 	log.Println("Using mock market data client")
	// 	marketDataClient = market_client.NewMockMarketDataClient()
	// } else {
	// 	log.Println("Using Twelve Data market data client")
	// 	marketDataClient = market_client.NewTwelveMarketDataClient(constants.TwelveDataBaseUrl, cfg.Market.TWELVE_DATA_SECRET_KEY)
	// }

	userRepo := user_repository.NewUserRepository()
	userKeyRepo := user_repository.NewUserKeyRepository()

	authUseCase := auth_usecase.New(userRepo, userKeyRepo, entClient)

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.RequestID)
	r.Use(fijoy_middleware.LoggerMiddleware(logger))
	r.Use(fijoy_middleware.CookieMiddleWare())
	r.Use(sentryMiddleware.Handle)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{cfg.Server.WEB_URL}, // Use this to allow specific origin hosts
		// AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		// AllowedMethods:   connectcors.AllowedMethods(),
		AllowedHeaders: []string{"sentry-trace", "baggage"},
		// ExposedHeaders:   connectcors.ExposedHeaders(),
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
		Debug:            false,
	}))

	// TODO: migrate to this, also get rid of default server as it is not prod ready
	// nolint:staticcheck
	srv := handler.NewDefaultServer(fijoy.NewSchema(entClient, cfg.Auth))
	srv.Use(entgql.Transactioner{TxOpener: entClient})

	r.Group(func(r chi.Router) {
		r.Use(jwtauth.Verifier(cfg.Auth.JWT_AUTH))
		r.Use(jwtauth.Authenticator(cfg.Auth.JWT_AUTH))

		r.Handle("/graphql",
			playground.Handler("Fijoy", "/query"),
		)
		r.Handle("/query", srv)
	})

	auth_handler.RegisterHTTPEndpoints(r, cfg.Auth, authUseCase, cfg.Server, analyticsService)
	health_handler.RegisterHTTPEndpoints(r)

	// Start our server
	server := newServer(":"+cfg.Server.PORT, r)

	// Listen for syscall signals for process to interrupt/quit
	serverCtx, serverStopCtx := signal.NotifyContext(
		context.Background(),
		syscall.SIGHUP, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT,
	)
	defer serverStopCtx()

	go func() {
		<-serverCtx.Done()

		// Shutdown signal with grace period of 30 seconds
		shutdownCtx, cancel := context.WithTimeout(serverCtx, 30*time.Second)
		defer cancel()

		// Trigger graceful shutdown
		if err := server.Shutdown(shutdownCtx); err != nil {
			log.Printf("Error during server shutdown: %v", err)
		}

		// Check if shutdown timed out
		if shutdownCtx.Err() == context.DeadlineExceeded {
			log.Println("Graceful shutdown timed out, forcing exit.")
		}
	}()

	// Run the server
	err = server.ListenAndServe()
	if err != nil && err != http.ErrServerClosed {
		log.Fatal(err)
	}

	// Wait for server context to be stopped
	<-serverCtx.Done()
}

func newServer(addr string, r *chi.Mux) *http.Server {
	return &http.Server{
		Addr:    addr,
		Handler: r,
	}
}

// Struct to hold the version
type PackageJSON struct {
	Version string `json:"version"`
}

func getVersionFromPackageJSON() (string, error) {
	file, err := os.ReadFile("package.json")
	if err != nil {
		return "", err
	}

	var pkg PackageJSON
	err = json.Unmarshal(file, &pkg)
	if err != nil {
		return "", err
	}

	return pkg.Version, nil
}
