package config

import (
	"fmt"

	"github.com/caarlos0/env/v10"
)

type AuthConfig struct {
	JWT_SECRET           string `env:"JWT_SECRET,required"`
	GOOGLE_REDIRECT_URL  string `env:"GOOGLE_REDIRECT_URL"`
	GOOGLE_CLIENT_ID     string `env:"GOOGLE_CLIENT_ID"`
	GOOGLE_CLIENT_SECRET string `env:"GOOGLE_CLIENT_SECRET"`
}

func LoadAuthConfig() (AuthConfig, error) {
	cfg := AuthConfig{}

	if err := env.Parse(&cfg); err != nil {
		return AuthConfig{}, fmt.Errorf("%+v", err)
	}

	return cfg, nil
}
