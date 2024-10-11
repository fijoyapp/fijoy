package main

import (
	"context"
	"database/sql"
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
	analytics_usecase "fijoy/internal/domain/analytics/usecase"
	health_handler "fijoy/internal/domain/health/handler"
	transaction_repository "fijoy/internal/domain/transaction/repository"

	currency_handler "fijoy/internal/domain/currency/handler"

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

	// Setup Postgres
	db, err := setupDB("postgres", cfg.Database.DB_URL)
	if err != nil {
		panic(err)
	}
	defer db.Close()

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
	userUseCase := user_usecase.New(userRepo, client)
	authUseCase := auth_usecase.New(userRepo, userKeyRepo, client)

	profileRepo := profile_repository.NewProfileRepository(db)
	profileUseCase := profile_usecase.New(validator, db, profileRepo)

	accountRepo := account_repository.NewAccountRepository(db)
	transactionRepo := transaction_repository.NewTransactionRepository(db)
	accountUseCase := account_usecase.New(validator, db, accountRepo, transactionRepo)

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
	currency_handler.RegisterConnect(r)

	health_handler.RegisterHTTPEndpoints(r)
	// connect_handler.NewWorkspaceHandler(r, tokenAuth, db, validator)
	// connect_handler.NewAccountHandler(r, tokenAuth, db, validator)
	// connect_handler.NewCategoryHandler(r, tokenAuth, db, validator)
	// connect_handler.NewTransactionHandler(r, tokenAuth, db, validator)

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

// func waitForShutdown(server *http.Server) {
// 	// How does this function work?
//
// 	// We first deflare a Go channel named sig to receive a os.Signal
// 	sig := make(chan os.Signal, 1)
// 	// What Notify does is that it registers the signals to the channel
// 	// In this case, it registers Interrupt and SIGTERM
// 	// In this case, when one of these 2 gets triggered, it will send a signal to the channel
// 	signal.Notify(sig, os.Interrupt, syscall.SIGTERM)
// 	<-sig // this blocks the executation until the signal is received
//
// 	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
// 	defer cancel() // making sure that we cancel the context
//
// 	// Very nice graceful shutdown
// 	if err := server.Shutdown(ctx); err != nil {
// 		panic(err)
// 	}
// }

// setupDB initiates the database connection
func setupDB(driver, url string) (*sql.DB, error) {
	db, err := sql.Open(driver, url)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		db.Close()
		return nil, err
	}

	return db, nil
}
