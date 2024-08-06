package config

import (
	"fmt"

	"github.com/caarlos0/env/v10"
)

type DatabaseConfig struct {
	DB_URL string `env:"DB_URL,required"`
}

func LoadDatabaseConfig() (DatabaseConfig, error) {
	cfg := DatabaseConfig{}

	if err := env.Parse(&cfg); err != nil {
		return DatabaseConfig{}, fmt.Errorf("%+v", err)
	}

	return cfg, nil
}
