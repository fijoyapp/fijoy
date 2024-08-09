package config

import (
	"fmt"

	"github.com/caarlos0/env/v11"
)

type DatabaseConfig struct {
	DB_URL string `env:"DB_URL,required"`
}

func LoadDatabaseConfig() (*DatabaseConfig, error) {
	cfg, err := env.ParseAs[DatabaseConfig]()
	if err != nil {
		return &DatabaseConfig{}, fmt.Errorf("%+v", err)
	}

	return &cfg, nil
}
