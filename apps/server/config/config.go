package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func IsOnRailway() bool {
	return os.Getenv("RAILWAY_PUBLIC_DOMAIN") != ""
}

type Config struct {
	Auth      *AuthConfig
	Database  *DatabaseConfig
	Analytics *AnalyticsConfig
	Server    *ServerConfig
	Sentry    *SentryConfig
}

func LoadConfig() (*Config, error) {
	if !IsOnRailway() {
		err := godotenv.Load()
		if err != nil {
			return &Config{}, fmt.Errorf("error loading .env file: %w", err)
		}
	}

	auth, err := LoadAuthConfig()
	if err != nil {
		return &Config{}, fmt.Errorf("error loading auth config: %w", err)
	}

	database, err := LoadDatabaseConfig()
	if err != nil {
		return &Config{}, fmt.Errorf("error loading database config: %w", err)
	}

	analytics, err := LoadAnalyticsConfig()
	if err != nil {
		return &Config{}, fmt.Errorf("error loading analytics config: %w", err)
	}

	server, err := LoadServerConfig()
	if err != nil {
		return &Config{}, fmt.Errorf("error loading server config: %w", err)
	}

	sentry, err := LoadSentryConfig()
	if err != nil {
		return &Config{}, fmt.Errorf("error loading sentry config: %w", err)
	}

	cfg := &Config{
		Auth:      auth,
		Database:  database,
		Analytics: analytics,
		Server:    server,
		Sentry:    sentry,
	}

	return cfg, nil
}
