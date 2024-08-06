package main

import (
	"database/sql"
	"fijoy/config"
	connect_handler "fijoy/internal/delivery/connect"
	http_handler "fijoy/internal/delivery/http"
	"net/http"

	"github.com/go-playground/validator/v10"
	_ "github.com/lib/pq"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/jwtauth/v5"

	connectcors "connectrpc.com/cors"
	_ "github.com/rs/cors"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var tokenAuth *jwtauth.JWTAuth

func main() {
	cfg, err := config.LoadAppConfig()
	if err != nil {
		panic(err)
	}

	tokenAuth = jwtauth.New("HS256", []byte(cfg.JWT_SECRET), nil)

	// Setup Postgres
	db, err := setupDB("postgres", cfg.DB_URL)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	googleOAuthConfig := &oauth2.Config{
		RedirectURL:  cfg.GOOGLE_REDIRECT_URL,
		ClientID:     cfg.GOOGLE_CLIENT_ID,
		ClientSecret: cfg.GOOGLE_CLIENT_SECRET,
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}

	validator := validator.New(validator.WithRequiredStructEnabled())

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.RequestID)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{cfg.WEB_URL}, // Use this to allow specific origin hosts
		// AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   connectcors.AllowedMethods(),
		AllowedHeaders:   append(connectcors.AllowedHeaders(), "Fijoy-Workspace-Id"),
		ExposedHeaders:   connectcors.ExposedHeaders(),
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
		Debug:            false,
	}))

	http_handler.NewAuthHandler(r, googleOAuthConfig, tokenAuth, db, cfg.WEB_URL, cfg.DISCORD_WEBHOOK)
	connect_handler.NewUserHandler(r, tokenAuth, db)
	connect_handler.NewWorkspaceHandler(r, tokenAuth, db, validator)
	connect_handler.NewAccountHandler(r, tokenAuth, db, validator)
	connect_handler.NewCategoryHandler(r, tokenAuth, db, validator)
	connect_handler.NewTransactionHandler(r, tokenAuth, db, validator)

	r.Get("/health", func(w http.ResponseWriter, _ *http.Request) {
		w.Write([]byte("OK"))
	})

	// Start our server
	server := newServer(":"+cfg.PORT, r)

	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		panic(err)
	}

	// go func() {
	// 	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
	// 		panic(err)
	// 	}
	// }()
	//
	// waitForShutdown(server)
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
