package handler

import (
	"github.com/go-chi/chi/v5"
)

func RegisterHTTPEndpoints(r *chi.Mux) {
	handler := NewHealthHandler()

	r.Route("/", func(r chi.Router) {
		r.Get("/health", handler.CheckHealth)
	})
}
