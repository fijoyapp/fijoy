package config

import (
	"github.com/caarlos0/env/v10"
	"github.com/joho/godotenv"
)

type AppConfig struct {
	DB_URL               string `env:"DB_URL"`
	JWT_SECRET           string `env:"JWT_SECRET"`
	GOOGLE_REDIRECT_URL  string `env:"GOOGLE_REDIRECT_URL"`
	GOOGLE_CLIENT_ID     string `env:"GOOGLE_CLIENT_ID"`
	GOOGLE_CLIENT_SECRET string `env:"GOOGLE_CLIENT_SECRET"`
	FRONTEND_URL         string `env:"FRONTEND_URL"`
}

func LoadAppConfig() (AppConfig, error) {
	err := godotenv.Load()
	if err != nil {
		return AppConfig{}, err
	}

	cfg := AppConfig{}

	err = env.Parse(&cfg)
	if err != nil {
		return AppConfig{}, err
	}

	return cfg, nil
}
