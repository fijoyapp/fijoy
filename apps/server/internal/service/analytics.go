package service

import (
	"fijoy/config"
	"fmt"
	"net/http"
	"strings"
)

type AnalyticsService interface {
	SendToDiscord(msg string) error
}

type analyticsService struct {
	analyticsConfig *config.AnalyticsConfig
}

func NewAnalyticsService(analyticsConfig *config.AnalyticsConfig) AnalyticsService {
	return &analyticsService{analyticsConfig: analyticsConfig}
}

func (s *analyticsService) SendToDiscord(msg string) error {
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
