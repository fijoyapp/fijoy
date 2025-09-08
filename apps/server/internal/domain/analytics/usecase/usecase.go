package usecase

import (
	"fmt"
	"net/http"
	"strings"

	"fijoy/config"
)

type AnalyticsUseCase interface {
	SendToDiscord(msg string) error
}

type analyticsUseCase struct {
	analyticsConfig *config.AnalyticsConfig
}

func New(analyticsConfig *config.AnalyticsConfig) AnalyticsUseCase {
	return &analyticsUseCase{analyticsConfig: analyticsConfig}
}

func (s *analyticsUseCase) SendToDiscord(msg string) error {
	// Send message to Discord
	resp, err := http.Post(
		s.analyticsConfig.DiscordWebhook,
		"application/json",
		strings.NewReader(
			fmt.Sprint(msg),
		),
	)
	if err != nil {
		return err
	}

	defer func() {
		if err := resp.Body.Close(); err != nil {
			return
		}
	}()

	return nil
}
