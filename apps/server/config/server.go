package config

import (
	"fmt"

	"github.com/caarlos0/env/v11"
)

type ServerConfig struct {
	WEB_URL string `env:"WEB_URL,required"`
	PORT    string `env:"PORT"`
}

func LoadServerConfig() (*ServerConfig, error) {
	cfg, err := env.ParseAs[ServerConfig]()
	if err != nil {
		return &ServerConfig{}, fmt.Errorf("%+v", err)
	}

	if !IsProd() {
		cfg.PORT = "3000"
	}

	return &cfg, nil
}
