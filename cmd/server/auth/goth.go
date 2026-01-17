package auth

import (
	"beavermoney.app/cmd/server/config"
	"github.com/go-chi/jwtauth/v5"
	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
)

// SetupGoth initializes the Goth OAuth library with the session store and providers.
func SetupGoth(cfg *config.Config) {
	maxAge := 60 * 10 // 10 minutes
	store := sessions.NewCookieStore([]byte(cfg.SessionSecret))
	store.MaxAge(maxAge)
	store.Options.Path = "/"
	store.Options.HttpOnly = true // HttpOnly should always be enabled
	store.Options.Secure = cfg.IsProd
	gothic.Store = store

	goth.UseProviders(
		google.New(
			cfg.GoogleClientID,
			cfg.GoogleClientSecret,
			cfg.GoogleRedirectURL,
			"email", "profile",
		),
	)
}

// NewJWTAuth creates a new JWT authenticator with the given secret.
func NewJWTAuth(secret string) *jwtauth.JWTAuth {
	return jwtauth.New("HS256", []byte(secret), nil)
}
