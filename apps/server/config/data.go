package config

import (
	"fmt"

	"github.com/caarlos0/env/v11"
)

type DataConfig struct {
	TWELVE_DATA_SECRET_KEY string `env:"TWELVE_DATA_SECRET_KEY"`
}

func LoadDataConfig() (*DataConfig, error) {
	cfg, err := env.ParseAs[DataConfig]()
	if err != nil {
		return &DataConfig{}, fmt.Errorf("%+v", err)
	}

	return &cfg, nil
}
