package config

import (
	"fmt"

	"github.com/caarlos0/env/v10"
)

type DiscordConfig struct {
	DISCORD_WEBHOOK string `env:"DISCORD_WEBHOOK"`
}

func LoadDiscordConfig() (DiscordConfig, error) {
	cfg := DiscordConfig{}

	if err := env.Parse(&cfg); err != nil {
		return DiscordConfig{}, fmt.Errorf("%+v", err)
	}

	return cfg, nil
}
