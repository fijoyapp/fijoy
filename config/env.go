package config

import (
	"github.com/caarlos0/env/v10"
	"github.com/joho/godotenv"
)

type AppConfig struct {
	DB_URL string `env:"DB_URL"`
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
