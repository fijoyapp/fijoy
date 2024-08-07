package auth

import (
	"database/sql"
	"fijoy/config"
	"fijoy/internal/service"

	"github.com/go-chi/chi/v5"
)

func RegisterHTTPEndpoints(r *chi.Mux, authConfig *config.AuthConfig, db *sql.DB, serverConfig *config.ServerConfig, analyticsService service.AnalyticsService) {
	handler := NewAuthHandler(authConfig, db, serverConfig, analyticsService)

	r.Route("/v1/auth", func(r chi.Router) {
		r.Get("/local/login", handler.localLogin)
		r.Get("/google/login", handler.googleLogin)
		r.Get("/google/callback", handler.googleCallback)
		r.Get("/logout", handler.logout)
	})
}
