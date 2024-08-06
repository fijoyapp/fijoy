package config

import (
	"fmt"

	"github.com/caarlos0/env/v10"
)

type ServerConfig struct {
	WEB_URL string `env:"WEB_URL,required"`
	PORT    string `env:"PORT"`
}

func LoadServerConfig() (ServerConfig, error) {
	cfg := ServerConfig{}

	if err := env.Parse(&cfg); err != nil {
		return ServerConfig{}, fmt.Errorf("%+v", err)
	}

	if !IsOnRailway() {
		cfg.PORT = "3000"
	}

	return cfg, nil
}
