package config

import (
	"fmt"

	"github.com/caarlos0/env/v11"
	"github.com/go-chi/jwtauth/v5"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

type AuthConfig struct {
	JWT_SECRET           string `env:"JWT_SECRET,required"`
	GOOGLE_REDIRECT_URL  string `env:"GOOGLE_REDIRECT_URL"`
	GOOGLE_CLIENT_ID     string `env:"GOOGLE_CLIENT_ID"`
	GOOGLE_CLIENT_SECRET string `env:"GOOGLE_CLIENT_SECRET"`

	GOOGLE   *oauth2.Config
	JWT_AUTH *jwtauth.JWTAuth
}

func LoadAuthConfig() (*AuthConfig, error) {
	cfg, err := env.ParseAs[AuthConfig]()
	if err != nil {
		return &AuthConfig{}, fmt.Errorf("%+v", err)
	}

	cfg.JWT_AUTH = jwtauth.New("HS256", []byte(cfg.JWT_SECRET), nil)

	cfg.GOOGLE = &oauth2.Config{
		RedirectURL:  cfg.GOOGLE_REDIRECT_URL,
		ClientID:     cfg.GOOGLE_CLIENT_ID,
		ClientSecret: cfg.GOOGLE_CLIENT_SECRET,
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}

	return &cfg, nil
}
