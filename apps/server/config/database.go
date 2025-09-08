package config

import (
	"fmt"

	"github.com/caarlos0/env/v11"
)

type DatabaseConfig struct {
	PostgresURL string `env:"POSTGRES_URL,required"`
	RedisURL    string `env:"REDIS_URL,required"`
}

func LoadDatabaseConfig() (*DatabaseConfig, error) {
	cfg, err := env.ParseAs[DatabaseConfig]()
	if err != nil {
		return &DatabaseConfig{}, fmt.Errorf("%+v", err)
	}

	return &cfg, nil
}
