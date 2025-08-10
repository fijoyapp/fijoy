package handler

import (
	"fijoy/config"
	analytics_usecase "fijoy/internal/domain/analytics/usecase"
	auth_usecase "fijoy/internal/domain/auth/usecase"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"
)

func RegisterHTTPEndpoints(
	r *chi.Mux,
	authConfig *config.AuthConfig,
	authUseCase auth_usecase.AuthUseCase,
	serverConfig *config.ServerConfig,
	analyticsUseCase analytics_usecase.AnalyticsUseCase,
) {
	handler := NewAuthHandler(
		authConfig,
		authUseCase,
		serverConfig,
		analyticsUseCase,
	)

	r.Route("/v1/auth", func(r chi.Router) {
		r.Get("/local/login", handler.localLogin)
		r.Get("/google/login", handler.googleLogin)
		r.Get("/google/callback", handler.googleCallback)
		r.Get("/logout", handler.logout)

		r.Group(func(r chi.Router) {
			r.Use(jwtauth.Verifier(authConfig.JWT_AUTH))
			r.Use(jwtauth.Authenticator(authConfig.JWT_AUTH))

			r.Post("/set-profile", handler.setProfile)
		})
	})
}
