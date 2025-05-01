package handler

import (
	"fijoy/config"
	"fijoy/internal/domain/profile/usecase"
	"fijoy/proto/fijoy/v1/fijoyv1connect"

	"github.com/bufbuild/protovalidate-go"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"
)

func RegisterConnect(r *chi.Mux, protoValidator protovalidate.Validator, authConfig *config.AuthConfig, useCase usecase.ProfileUseCase) {
	profileServer := NewProfileHandler(protoValidator, useCase)

	path, handler := fijoyv1connect.NewProfileServiceHandler(profileServer)

	r.Group(func(r chi.Router) {
		r.Use(jwtauth.Verifier(authConfig.JWT_AUTH))
		r.Use(jwtauth.Authenticator(authConfig.JWT_AUTH))

		r.Mount(path, handler)
	})
}
