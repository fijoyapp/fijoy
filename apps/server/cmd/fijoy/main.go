package main

import (
	"context"
	"fijoy/config"
	"fijoy/ent"
	"fijoy/ent/migrate"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	auth_handler "fijoy/internal/domain/auth/handler"
	auth_usecase "fijoy/internal/domain/auth/usecase"

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

	snapshot_handler "fijoy/internal/domain/snapshot/handler"
	snapshot_repository "fijoy/internal/domain/snapshot/repository"
	snapshot_usecase "fijoy/internal/domain/snapshot/usecase"

	currency_handler "fijoy/internal/domain/currency/handler"

	analytics_usecase "fijoy/internal/domain/analytics/usecase"

	health_handler "fijoy/internal/domain/health/handler"

	"github.com/bufbuild/protovalidate-go"
	"github.com/go-playground/validator/v10"
	_ "github.com/lib/pq"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	connectcors "connectrpc.com/cors"
	_ "github.com/rs/cors"
)

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		panic(err)
	}

	client, err := ent.Open("postgres", cfg.Database.DB_URL)
	ctx := context.Background()
	if err := client.Schema.Create(ctx, migrate.WithGlobalUniqueID(true)); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	validator := validator.New(validator.WithRequiredStructEnabled())
	protoValidator, err := protovalidate.New()
	if err != nil {
		panic(err)
	}

	analyticsService := analytics_usecase.New(cfg.Analytics)

	userRepo := user_repository.NewUserRepository()
	userKeyRepo := user_repository.NewUserKeyRepository()
	profileRepo := profile_repository.NewProfileRepository()
	accountRepo := account_repository.NewAccountRepository()
	snapshotRepo := snapshot_repository.NewSnapshotRepository()
	transactionRepo := transaction_repository.NewTransactionRepository()

	authUseCase := auth_usecase.New(userRepo, userKeyRepo, client)
	userUseCase := user_usecase.New(userRepo, client)
	profileUseCase := profile_usecase.New(validator, client, profileRepo)
	accountUseCase := account_usecase.New(validator, client, accountRepo, transactionRepo)
	snapshotUseCase := snapshot_usecase.New(validator, client, snapshotRepo)
	transctionUseCase := transaction_usecase.New(validator, client, transactionRepo, snapshotRepo, accountRepo)

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.RequestID)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{cfg.Server.WEB_URL}, // Use this to allow specific origin hosts
		// AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   connectcors.AllowedMethods(),
		AllowedHeaders:   append(connectcors.AllowedHeaders(), "Fijoy-Profile-Id"),
		ExposedHeaders:   connectcors.ExposedHeaders(),
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
		Debug:            false,
	}))

	auth_handler.RegisterHTTPEndpoints(r, cfg.Auth, authUseCase, cfg.Server, analyticsService)

	user_handler.RegisterConnect(r, protoValidator, cfg.Auth, userUseCase)
	profile_handler.RegisterConnect(r, protoValidator, cfg.Auth, profileUseCase)
	account_handler.RegisterConnect(r, protoValidator, cfg.Auth, accountUseCase)
	transaction_handler.RegisterConnect(r, protoValidator, cfg.Auth, transctionUseCase)
	snapshot_handler.RegisterConnect(r, protoValidator, cfg.Auth, snapshotUseCase)

	currency_handler.RegisterConnect(r)

	health_handler.RegisterHTTPEndpoints(r)

	// Start our server
	server := newServer(":"+cfg.Server.PORT, r)

	// Server run context
	serverCtx, serverStopCtx := context.WithCancel(context.Background())

	// Listen for syscall signals for process to interrupt/quit
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGHUP, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT)

	go func() {
		<-sig

		// Shutdown signal with grace period of 30 seconds
		shutdownCtx, _ := context.WithTimeout(serverCtx, 30*time.Second)

		go func() {
			<-shutdownCtx.Done()
			if shutdownCtx.Err() == context.DeadlineExceeded {
				log.Fatal("graceful shutdown timed out.. forcing exit.")
			}
		}()

		// Trigger graceful shutdown
		err := server.Shutdown(shutdownCtx)
		if err != nil {
			log.Fatal(err)
		}
		serverStopCtx()
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
