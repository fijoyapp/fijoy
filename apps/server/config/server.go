package config

import (
	"fmt"

	"github.com/caarlos0/env/v11"
)

type ServerConfig struct {
	WebURL string `env:"WEB_URL,required"`
	Port   string `env:"PORT"`
}

func LoadServerConfig() (*ServerConfig, error) {
	cfg, err := env.ParseAs[ServerConfig]()
	if err != nil {
		return &ServerConfig{}, fmt.Errorf("%+v", err)
	}

	if !IsProd() {
		cfg.Port = "3000"
	}

	return &cfg, nil
}
