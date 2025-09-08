package config

import (
	"fmt"

	"github.com/caarlos0/env/v11"
	"github.com/go-chi/jwtauth/v5"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

type AuthConfig struct {
	JWTSecret          string `env:"JWT_SECRET,required"`
	GoogleRedirectURL  string `env:"GOOGLE_REDIRECT_URL"`
	GoogleClientID     string `env:"GOOGLE_CLIENT_ID"`
	GoogleClientSecret string `env:"GOOGLE_CLIENT_SECRET"`

	Google  *oauth2.Config
	JWTAuth *jwtauth.JWTAuth
}

func LoadAuthConfig() (*AuthConfig, error) {
	cfg, err := env.ParseAs[AuthConfig]()
	if err != nil {
		return &AuthConfig{}, fmt.Errorf("%+v", err)
	}

	cfg.JWTAuth = jwtauth.New("HS256", []byte(cfg.JWTSecret), nil)

	cfg.Google = &oauth2.Config{
		RedirectURL:  cfg.GoogleRedirectURL,
		ClientID:     cfg.GoogleClientID,
		ClientSecret: cfg.GoogleClientSecret,
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}

	return &cfg, nil
}
