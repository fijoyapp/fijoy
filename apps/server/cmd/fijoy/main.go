package main

import (
	"context"
	"encoding/json"
	"fijoy/config"
	"fijoy/constants"
	"fijoy/ent"
	"fijoy/ent/migrate"
	"fijoy/internal/util/market"
	market_client "fijoy/internal/util/market/client"
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

	profile_handler "fijoy/internal/domain/profile/handler"
	profile_repository "fijoy/internal/domain/profile/repository"
	profile_usecase "fijoy/internal/domain/profile/usecase"

	user_handler "fijoy/internal/domain/user/handler"
	user_repository "fijoy/internal/domain/user/repository"
	user_usecase "fijoy/internal/domain/user/usecase"

	account_handler "fijoy/internal/domain/account/handler"
	account_repository "fijoy/internal/domain/account/repository"
	account_usecase "fijoy/internal/domain/account/usecase"

	transaction_handler "fijoy/internal/domain/transaction/handler"
	transaction_repository "fijoy/internal/domain/transaction/repository"
	transaction_usecase "fijoy/internal/domain/transaction/usecase"

	currency_handler "fijoy/internal/domain/currency/handler"

	analytics_usecase "fijoy/internal/domain/analytics/usecase"

	health_handler "fijoy/internal/domain/health/handler"

	"github.com/bufbuild/protovalidate-go"
	"github.com/go-playground/validator/v10"
	_ "github.com/lib/pq"
	"go.uber.org/zap"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	connectcors "connectrpc.com/cors"
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

	// TODO: migrate to this
	// srv := handler.NewDefaultServer(fijoy.NewSchema(entClient))
	// http.Handle("/",
	// 	playground.Handler("Fijoy", "/query"),
	// )
	// http.Handle("/query", srv)
	// log.Println("listening on :8081")
	// if err := http.ListenAndServe(":8081", nil); err != nil {
	// 	log.Fatal("http server terminated", err)
	// }

	validator := validator.New(validator.WithRequiredStructEnabled())
	protoValidator, err := protovalidate.New()
	if err != nil {
		panic(err)
	}

	sentryMiddleware := sentryhttp.New(sentryhttp.Options{
		Repanic: true,
	})

	analyticsService := analytics_usecase.New(cfg.Analytics)

	var marketDataClient market.MarketDataClient
	if cfg.Market.TWELVE_DATA_SECRET_KEY == "" {
		log.Println("Using mock market data client")
		marketDataClient = market_client.NewMockMarketDataClient()
	} else {
		log.Println("Using Twelve Data market data client")
		marketDataClient = market_client.NewTwelveMarketDataClient(constants.TwelveDataBaseUrl, cfg.Market.TWELVE_DATA_SECRET_KEY)
	}

	userRepo := user_repository.NewUserRepository()
	userKeyRepo := user_repository.NewUserKeyRepository()
	profileRepo := profile_repository.NewProfileRepository()
	accountRepo := account_repository.NewAccountRepository()
	transactionRepo := transaction_repository.NewTransactionRepository()

	authUseCase := auth_usecase.New(userRepo, userKeyRepo, entClient)
	userUseCase := user_usecase.New(userRepo, entClient)
	profileUseCase := profile_usecase.New(validator, entClient, profileRepo)
	accountUseCase := account_usecase.New(validator, entClient, marketDataClient, profileRepo, accountRepo, transactionRepo)
	transctionUseCase := transaction_usecase.New(validator, entClient, transactionRepo, accountRepo)

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.RequestID)
	r.Use(fijoy_middleware.LoggerMiddleware(logger))
	r.Use(sentryMiddleware.Handle)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{cfg.Server.WEB_URL}, // Use this to allow specific origin hosts
		// AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   connectcors.AllowedMethods(),
		AllowedHeaders:   append(connectcors.AllowedHeaders(), "Fijoy-Profile-Id", "sentry-trace", "baggage"),
		ExposedHeaders:   connectcors.ExposedHeaders(),
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
		Debug:            false,
	}))

	// r.Get("/error", func(w http.ResponseWriter, r *http.Request) {
	// 	hub := sentry.GetHubFromContext(r.Context())
	// 	hub.CaptureException(errors.New("test error"))
	// })
	// r.Get("/panic", func(w http.ResponseWriter, r *http.Request) {
	// 	panic("server panic")
	// })

	auth_handler.RegisterHTTPEndpoints(r, cfg.Auth, authUseCase, cfg.Server, analyticsService)

	user_handler.RegisterConnect(r, protoValidator, cfg.Auth, userUseCase)
	profile_handler.RegisterConnect(r, protoValidator, cfg.Auth, profileUseCase)
	account_handler.RegisterConnect(r, protoValidator, cfg.Auth, accountUseCase)
	transaction_handler.RegisterConnect(r, protoValidator, cfg.Auth, transctionUseCase)

	currency_handler.RegisterConnect(r)

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
