package config

import (
	"fmt"

	"github.com/caarlos0/env/v11"
)

type MarketConfig struct {
	TWELVE_DATA_SECRET_KEY string `env:"TWELVE_DATA_SECRET_KEY"`
}

func LoadMarketConfig() (*MarketConfig, error) {
	cfg, err := env.ParseAs[MarketConfig]()
	if err != nil {
		return &MarketConfig{}, fmt.Errorf("%+v", err)
	}

	return &cfg, nil
}
