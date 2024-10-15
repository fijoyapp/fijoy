package config

import (
	"fmt"

	"github.com/caarlos0/env/v11"
)

type SentryConfig struct {
	SENTRY_DSN_SERVER string `env:"SENTRY_DSN_SERVER"`
}

func LoadSentryConfig() (*SentryConfig, error) {
	cfg, err := env.ParseAs[SentryConfig]()
	if err != nil {
		return &SentryConfig{}, fmt.Errorf("%+v", err)
	}

	return &cfg, nil
}
