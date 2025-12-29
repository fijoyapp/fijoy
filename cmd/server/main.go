package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strconv"
	"time"

	"fijoy.app/ent/investment"
	_ "fijoy.app/ent/runtime"

	"entgo.io/ent/dialect"
	entsql "entgo.io/ent/dialect/sql"
	"fijoy.app"
	"fijoy.app/ent"
	"fijoy.app/ent/account"
	"fijoy.app/ent/transactioncategory"
	"fijoy.app/ent/user"
	"fijoy.app/ent/userhousehold"
	"fijoy.app/ent/userkey"
	"fijoy.app/internal/contextkeys"
	"fijoy.app/internal/fxrate"
	"fijoy.app/internal/market"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/caarlos0/env/v11"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/jwtauth/v5"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/gorilla/sessions"
	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/joho/godotenv"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
	"github.com/shopspring/decimal"
)

type config struct {
	PostgresURL string `env:"POSTGRES_URL,notEmpty"`

	WebURL string `env:"WEB_URL,notEmpty"`

	Port string `env:"PORT,notEmpty"`

	GoogleClientID     string `env:"GOOGLE_CLIENT_ID"`
	GoogleClientSecret string `env:"GOOGLE_CLIENT_SECRET"`
	GoogleRedirectURL  string `env:"GOOGLE_REDIRECT_URL"`

	SessionSecret string `env:"SESSION_SECRET,notEmpty"`
	JWTSecret     string `env:"JWT_SECRET,notEmpty"`

	// AWSAccessKeyID     string `env:"AWS_ACCESS_KEY_ID,notEmpty"`
	// AWSSecretAccessKey string `env:"AWS_SECRET_ACCESS_KEY,notEmpty"`
	// S3Endpoint         string `env:"S3_ENDPOINT,notEmpty"`
	// S3Bucket           string `env:"S3_BUCKET,notEmpty"`
	// AWSRegion          string `env:"AWS_REGION,notEmpty"`
}

func main() {
	ctx := context.Background()

	isProd := os.Getenv("RAILWAY_PUBLIC_DOMAIN") != ""

	// Load environment variables
	if !isProd {
		err := godotenv.Load()
		if err != nil {
			panic(err)
		}
	}

	cfg, err := env.ParseAs[config]()
	if err != nil {
		panic(err)
	}

	// Setup jwtauth
	tokenAuth := jwtauth.New("HS256", []byte(cfg.JWTSecret), nil)

	// Goth setup
	maxAge := 60 * 10 // 10 minutes
	store := sessions.NewCookieStore([]byte(cfg.SessionSecret))
	store.MaxAge(maxAge)
	store.Options.Path = "/"
	store.Options.HttpOnly = true // HttpOnly should always be enabled
	store.Options.Secure = isProd
	gothic.Store = store

	goth.UseProviders(
		google.New(
			cfg.GoogleClientID,
			cfg.GoogleClientSecret,
			cfg.GoogleRedirectURL,
			"email", "profile",
		),
	)

	// Setup Ent
	db, err := sql.Open(
		"pgx",
		cfg.PostgresURL,
	)
	if err != nil {
		panic(err)
	}

	// TODO: remove this when we go to production
	db.ExecContext(ctx, "DROP SCHEMA public CASCADE; CREATE SCHEMA public;")

	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		panic(err)
	}

	m, err := migrate.NewWithDatabaseInstance(
		"file://ent/migrate/migrations",
		"postgres", driver)
	if err != nil {
		panic(err)
	}
	err = m.Up()
	if err != nil && err != migrate.ErrNoChange {
		log.Fatalf("migration failed: %v", err)
		panic(err)
	}

	log.Println("migration completed successfully")

	drv := entsql.OpenDB(dialect.Postgres, db)
	entClient := ent.NewClient(ent.Driver(drv))
	defer entClient.Close()

	// Setup internal clients
	fxrateProvider := fxrate.NewFrankfurterProvider()
	fxrateClient := fxrate.NewClient(fxrateProvider)

	marketProvider := market.NewYahooProvider()
	marketClient := market.NewClient(marketProvider)

	// Seed database
	if err := seed(ctx, entClient, fxrateClient, marketClient); err != nil {
		log.Fatalf("failed seeding database: %v", err)
	}

	// Setup router + CORS

	r := chi.NewRouter()
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{
			cfg.WebURL,
		}, // Use this to allow specific origin hosts
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
		MaxAge:           300, // Maximum value not ignored by any of major browsers
		Debug:            false,
	}))

	r.Use(middleware.Logger)

	// Setup GQL
	gqlHandler := handler.NewDefaultServer(
		fijoy.NewSchema(entClient, fxrateClient, marketClient),
	)
	r.Handle("/", playground.Handler("GraphQL playground", "/query"))
	r.Group(func(r chi.Router) {
		r.Use(jwtauth.Verifier(tokenAuth))
		r.Use(jwtauth.Authenticator(tokenAuth))
		r.Use(AuthMiddleware(entClient))

		r.Handle("/query", gqlHandler)
	})

	// Setup Auth routes
	r.Get(
		"/auth/{provider}/callback",
		func(res http.ResponseWriter, req *http.Request) {
			p := req.PathValue("provider")
			// TODO: set this to local only when we go to production
			if p == "local" {
				userID := entClient.User.Query().
					Where(user.EmailEQ("joey@itsjoeoui.com")).
					OnlyIDX(contextkeys.NewPrivacyBypassContext(ctx))

				_, tokenString, _ := tokenAuth.Encode(
					map[string]interface{}{
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
				// TODO: redirect to frontend with error message
				fmt.Fprintln(res, err)
				return
			}

			switch gothicUser.Provider {
			case "google":
				if verifiedEmail, ok := gothicUser.RawData["verified_email"].(bool); !ok ||
					!verifiedEmail {
					fmt.Fprintln(
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
					log.Printf("failed creating user: %v", err)
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
					log.Printf("failed creating user key: %v", err)
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
				fmt.Fprintf(
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
			gothic.Logout(res, req)

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
			w.Write([]byte("OK"))
		}),
	)

	// Start server
	http.ListenAndServe(":"+cfg.Port, r)
}

func AuthMiddleware(client *ent.Client) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()

			_, claims, err := jwtauth.FromContext(ctx)
			if err != nil {
				http.Error(
					w,
					"Unauthorized: Invalid token",
					http.StatusUnauthorized,
				)
				return
			}

			userIDStr, ok := claims["user_id"].(string)
			if !ok {
				http.Error(
					w,
					"Unauthorized: Invalid user ID",
					http.StatusUnauthorized,
				)
			}
			userID, err := strconv.Atoi(userIDStr)
			if err != nil {
				http.Error(
					w,
					"Bad Request: Invalid user ID format",
					http.StatusBadRequest,
				)
			}

			ctx = context.WithValue(ctx, contextkeys.UserIDKey(), userID)

			householdIDStr := r.Header.Get("X-Household-ID")
			if householdIDStr != "" {
				hid, err := strconv.Atoi(householdIDStr)
				if err != nil {
					http.Error(
						w,
						"Bad Request: Invalid Household ID",
						http.StatusBadRequest,
					)
					return
				}

				isMember, err := client.UserHousehold.Query().
					Where(
						userhousehold.UserID(userID),
						userhousehold.HouseholdID(hid),
					).
					Exist(contextkeys.NewPrivacyBypassContext(ctx))
				if err != nil {
					// Log this error in production
					http.Error(
						w,
						"Internal Server Error",
						http.StatusInternalServerError,
					)
					return
				}

				if isMember {
					ctx = context.WithValue(
						ctx,
						contextkeys.HouseholdIDKey(),
						hid,
					)
				}

			}

			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func seed(
	ctx context.Context,
	entClient *ent.Client,
	fxrateClient *fxrate.Client,
	marketClient *market.Client,
) error {
	alreadySeeded := entClient.User.Query().
		Where(user.EmailEQ("joey@itsjoeoui.com")).
		ExistX(contextkeys.NewPrivacyBypassContext(ctx))
	if alreadySeeded {
		return nil
	}

	cad := entClient.Currency.Create().SetCode("CAD").SaveX(ctx)
	usd := entClient.Currency.Create().SetCode("USD").SaveX(ctx)

	usdToCadRate, err := fxrateClient.GetRate(ctx, "USD", "CAD", time.Now())
	if err != nil {
		panic(err)
	}

	joey := entClient.User.Create().
		SetEmail("joey@itsjoeoui.com").
		SetName("Joey").
		SaveX(ctx)

	household := entClient.Household.Create().
		SetName("Joey's Household").
		SetCurrency(cad).
		SetLocale("en-CA").
		SaveX(ctx)

	ctx = context.WithValue(ctx, contextkeys.HouseholdIDKey(), household.ID)

	entClient.UserHousehold.Create().
		SetUser(joey).
		SetHousehold(household).
		SetRole(userhousehold.RoleAdmin).
		SaveX(ctx)

	differentJoey := entClient.User.Create().
		SetEmail("joey@jyu.dev").
		SetName("Different Joey").
		SaveX(ctx)

	differentHousehold := entClient.Household.Create().
		SetName("Different Joey's Household").
		SetCurrency(cad).
		SetLocale("en-CA").
		SaveX(ctx)

	differentCtx := context.WithValue(
		ctx,
		contextkeys.HouseholdIDKey(),
		differentHousehold.ID,
	)

	entClient.UserHousehold.Create().
		SetUser(differentJoey).
		SetHousehold(differentHousehold).
		SetRole(userhousehold.RoleAdmin).
		SaveX(differentCtx)

	entClient.UserHousehold.Create().
		SetUser(differentJoey).
		SetHousehold(household).
		SetRole(userhousehold.RoleMember).
		SaveX(ctx)

	entClient.Account.Create().
		SetName("You should not see this account").
		SetCurrency(usd).
		SetFxRate(usdToCadRate).
		SetUser(differentJoey).
		SetHousehold(differentHousehold).
		SetType(account.TypeLiquidity).
		SaveX(differentCtx)

	chase := entClient.Account.Create().
		SetName("Chase Total Checking").
		SetCurrency(usd).
		SetFxRate(usdToCadRate).
		SetIconPath("chase.com").
		SetUser(joey).
		SetHousehold(household).
		SetType(account.TypeLiquidity).
		SaveX(ctx)

	wealthsimple := entClient.Account.Create().
		SetName("Wealthsimple Visa Infinite").
		SetUser(joey).
		SetIconPath("wealthsimple.com").
		SetFxRate(decimal.NewFromInt(1)).
		SetCurrency(cad).
		SetHousehold(household).
		SetType(account.TypeLiability).
		SaveX(ctx)

	webull := entClient.Account.Create().
		SetHousehold(household).
		SetFxRate(decimal.NewFromInt(1)).
		SetIconPath("webull.ca").
		SetName("Webull").
		SetUser(joey).
		SetCurrency(cad).
		SetType(account.TypeInvestment).
		SaveX(ctx)

	restaurant := entClient.TransactionCategory.Create().
		SetName("Restaurant").
		SetHousehold(household).
		SetType(transactioncategory.TypeExpense).
		SaveX(ctx)

	grocery := entClient.TransactionCategory.Create().
		SetName("Grocery").
		SetHousehold(household).
		SetType(transactioncategory.TypeExpense).
		SaveX(ctx)

	investmentCategory := entClient.TransactionCategory.Create().
		SetName("Investment").
		SetHousehold(household).
		SetType(transactioncategory.TypeTransfer).
		SaveX(ctx)

	salary := entClient.TransactionCategory.Create().
		SetName("Salary").
		SetHousehold(household).
		SetType(transactioncategory.TypeIncome).
		SaveX(ctx)

	{
		transaction := entClient.Transaction.Create().
			SetUser(joey).
			SetHousehold(household).
			SetCategory(salary).
			SetDatetime(genRandomDatetime()).SaveX(ctx)
		entClient.TransactionEntry.Create().
			SetAccount(chase).
			SetHousehold(household).
			SetTransaction(transaction).
			SetCurrency(usd).
			SetAmount(decimal.NewFromInt(1000000)).SaveX(ctx)
	}

	{
		const n = 1000
		txCreates := make([]*ent.TransactionCreate, n)
		for i := range txCreates {
			txCreates[i] = entClient.Transaction.Create().
				SetUser(joey).
				SetHousehold(household).
				SetCategory(restaurant).
				SetDatetime(genRandomDatetime())
		}
		transactions := entClient.Transaction.CreateBulk(txCreates...).
			SaveX(ctx)

		txEntryCreates := make([]*ent.TransactionEntryCreate, n)
		for i, t := range transactions {
			txEntryCreates[i] = entClient.TransactionEntry.Create().
				SetAccount(chase).
				SetHousehold(household).
				SetTransaction(t).
				SetCurrency(usd).
				SetAmount(genRandomAmount().Mul(decimal.NewFromInt(-1)))
		}
		entClient.TransactionEntry.CreateBulk(txEntryCreates...).SaveX(ctx)
	}

	{
		const n = 1000
		txCreates := make([]*ent.TransactionCreate, n)
		for i := range txCreates {
			txCreates[i] = entClient.Transaction.Create().
				SetUser(joey).
				SetHousehold(household).
				SetCategory(grocery).
				SetDatetime(genRandomDatetime())
		}
		transactions := entClient.Transaction.CreateBulk(txCreates...).
			SaveX(ctx)

		txEntryCreates := make([]*ent.TransactionEntryCreate, n)
		for i, t := range transactions {
			txEntryCreates[i] = entClient.TransactionEntry.Create().
				SetAccount(wealthsimple).
				SetHousehold(household).
				SetTransaction(t).
				SetCurrency(cad).
				SetAmount(genRandomAmount().Mul(decimal.NewFromInt(-1)))
		}
		entClient.TransactionEntry.CreateBulk(txEntryCreates...).SaveX(ctx)
	}

	xeqtQuote, err := marketClient.EquityQuote(ctx, "XEQT.TO")
	if err != nil {
		panic(err)
	}

	xeqt := entClient.Investment.Create().
		SetHousehold(household).
		SetSymbol("XEQT.TO").
		SetName("XEQT").
		SetQuote(xeqtQuote.CurrentPrice).
		SetCurrency(cad).
		SetType(investment.TypeStock).
		SetAccount(webull).
		SaveX(ctx)

	{
		transaction := entClient.Transaction.Create().
			SetUser(joey).
			SetHousehold(household).
			SetCategory(investmentCategory).
			SetDatetime(genRandomDatetime()).SaveX(ctx)

		entClient.Lot.Create().
			SetInvestment(xeqt).
			SetTransaction(transaction).
			SetHousehold(household).
			SetAmount(decimal.NewFromInt(100)).
			SetPrice(decimal.NewFromFloat(25.50)).
			SaveX(ctx)
	}

	{
		transaction := entClient.Transaction.Create().
			SetUser(joey).
			SetHousehold(household).
			SetCategory(investmentCategory).
			SetDatetime(genRandomDatetime()).SaveX(ctx)
		entClient.Lot.Create().
			SetInvestment(xeqt).
			SetTransaction(transaction).
			SetHousehold(household).
			SetAmount(decimal.NewFromInt(50)).
			SetPrice(decimal.NewFromFloat(27.75)).
			SaveX(ctx)
	}

	return nil
}

func genRandomAmount() decimal.Decimal {
	minInt := 0
	maxInt := 10000
	randomInt := rand.Intn(maxInt-minInt) + minInt

	return decimal.NewFromInt(int64(randomInt)).Div(decimal.NewFromInt(100))
}

func genRandomDatetime() time.Time {
	return time.Now().Add(time.Duration(-rand.Intn(365*24)) * time.Hour).UTC()
}
