package usecase

import (
	"fijoy/config"
	"fmt"
	"net/http"
	"strings"
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
		s.analyticsConfig.DISCORD_WEBHOOK,
		"application/json",
		strings.NewReader(
			fmt.Sprint(msg),
		),
	)
	if err != nil {
		return err
	}

	defer resp.Body.Close()

	return nil
}
