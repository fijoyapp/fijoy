package config

import (
	"fmt"
	"os"

	"github.com/caarlos0/env/v10"
	"github.com/joho/godotenv"
)

type AppConfig struct {
	DB_URL               string `env:"DB_URL,required"`
	JWT_SECRET           string `env:"JWT_SECRET,required"`
	GOOGLE_REDIRECT_URL  string `env:"GOOGLE_REDIRECT_URL"`
	GOOGLE_CLIENT_ID     string `env:"GOOGLE_CLIENT_ID"`
	GOOGLE_CLIENT_SECRET string `env:"GOOGLE_CLIENT_SECRET"`
	WEB_URL              string `env:"WEB_URL,required"`
	PORT                 string `env:"PORT"`
	DISCORD_WEBHOOK      string `env:"DISCORD_WEBHOOK"`
}

func LoadAppConfig() (AppConfig, error) {
	if os.Getenv("RAILWAY_PUBLIC_DOMAIN") == "" {
		err := godotenv.Load()
		if err != nil {
			return AppConfig{}, fmt.Errorf("error loading .env file: %w", err)
		}
	}

	cfg := AppConfig{}

	if err := env.Parse(&cfg); err != nil {
		return AppConfig{}, fmt.Errorf("%+v", err)
	}

	if os.Getenv("RAILWAY_PUBLIC_DOMAIN") == "" {
		cfg.PORT = "3000"
	}

	return cfg, nil
}
