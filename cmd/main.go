package main

import (
	"database/sql"
	"fijoy/config"
	"fijoy/internal/api/handlers"
	"net/http"

	_ "github.com/lib/pq"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/jwtauth/v5"
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

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	handlers.NewAuthHandler(r, googleOAuthConfig, tokenAuth, db)
	handlers.NewUserHandler(r, tokenAuth, db)

	http.ListenAndServe(":3000", r)
}

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
