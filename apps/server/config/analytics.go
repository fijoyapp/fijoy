package config

import (
	"fmt"

	"github.com/caarlos0/env/v11"
)

type AnalyticsConfig struct {
	DISCORD_WEBHOOK string `env:"DISCORD_WEBHOOK"`
}

func LoadAnalyticsConfig() (*AnalyticsConfig, error) {
	cfg, err := env.ParseAs[AnalyticsConfig]()
	if err != nil {
		return &AnalyticsConfig{}, fmt.Errorf("%+v", err)
	}

	return &cfg, nil
}
