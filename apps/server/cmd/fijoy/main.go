package main

import (
	"context"
	"encoding/json"
	"fijoy"
	"fijoy/config"
	"fijoy/ent"
	"fijoy/ent/migrate"
	"fijoy/internal/util/market"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	// "fijoy/internal/util/market"
	// market_client "fijoy/internal/util/market/client"

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
	"github.com/redis/go-redis/v9"
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
		Dsn: cfg.Sentry.SentryDSNServer,

		SendDefaultPII: true,
		EnableTracing:  true,
		EnableLogs:     true,
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

	entClient, err := ent.Open("postgres", cfg.Database.PostgresURL)
	if err != nil {
		panic(err)
	}

	ctx := context.Background()
	if err := entClient.Schema.Create(
		ctx,
		// TODO: disable the following options in production
		migrate.WithDropIndex(true),
		migrate.WithDropColumn(true),
	); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	redisURL := cfg.Database.RedisURL

	redisOpts, err := redis.ParseURL(redisURL)
	if err != nil {
		panic(err)
	}

	// Initialize Redis client
	rdb := redis.NewClient(redisOpts)

	// Ping the Redis server to check the connection
	pong, err := rdb.Ping(ctx).Result()
	if err != nil {
		panic(err)
	}
	fmt.Println("Connected to Redis:", pong)

	sentryMiddleware := sentryhttp.New(sentryhttp.Options{
		Repanic:         true,
		WaitForDelivery: false,
		Timeout:         5 * time.Second,
	})

	analyticsService := analytics_usecase.New(cfg.Analytics)

	// var marketDataClient market.MarketDataClient
	// if cfg.Market.TWELVE_DATA_SECRET_KEY == "" {
	// 	log.Println("Using mock market data client")
	// 	marketDataClient = market.NewMockMarketDataClient()
	// } else {
	// 	log.Println("Using Twelve Data market data client")
	// 	marketDataClient = market.NewTwelveMarketDataClient(constants.TwelveDataBaseUrl, cfg.Market.TWELVE_DATA_SECRET_KEY)
	// }

	marketDataClient := market.NewYahooDataClient(rdb)

	userRepo := user_repository.NewUserRepository()
	userKeyRepo := user_repository.NewUserKeyRepository()

	authUseCase := auth_usecase.New(userRepo, userKeyRepo, entClient)

	r := chi.NewRouter()
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{cfg.Server.WebURL}, // Use this to allow specific origin hosts
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token", "sentry-trace", "baggage"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
		Debug:            false,
	}))
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.RequestID)
	r.Use(fijoy_middleware.LoggerMiddleware(logger))
	r.Use(fijoy_middleware.CookieMiddleWare())
	r.Use(sentryMiddleware.Handle)

	// TODO: migrate to this, also get rid of default server as it is not prod ready
	// nolint:staticcheck
	srv := handler.NewDefaultServer(fijoy.NewSchema(entClient, cfg.Auth, marketDataClient))
	srv.Use(entgql.Transactioner{TxOpener: entClient})

	r.Group(func(r chi.Router) {
		r.Use(jwtauth.Verifier(cfg.Auth.JWTAuth))
		r.Use(jwtauth.Authenticator(cfg.Auth.JWTAuth))

		r.Handle("/graphql",
			playground.Handler("Fijoy", "/query"),
		)
		r.Handle("/query", srv)
	})

	auth_handler.RegisterHTTPEndpoints(r, cfg.Auth, authUseCase, cfg.Server, analyticsService)
	health_handler.RegisterHTTPEndpoints(r)

	// Start our server
	server := newServer(":"+cfg.Server.Port, r)

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
