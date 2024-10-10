package handler

import (
	"fijoy/proto/fijoy/v1/fijoyv1connect"

	"github.com/go-chi/chi/v5"
)

func RegisterConnect(r *chi.Mux) {
	currencyServer := NewCurrencyHandler()

	path, handler := fijoyv1connect.NewCurrencyServiceHandler(currencyServer)

	r.Group(func(r chi.Router) {
		r.Mount(path, handler)
	})
}
