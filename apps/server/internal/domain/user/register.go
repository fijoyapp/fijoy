package user

import (
	"database/sql"
	"fijoy/config"
	"fijoy/internal/gen/proto/fijoy/v1/fijoyv1connect"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"
)

func RegisterConnect(r *chi.Mux, authConfig *config.AuthConfig, db *sql.DB) {
	userServer := NewUserHandler(db)

	path, handler := fijoyv1connect.NewUserServiceHandler(userServer)

	r.Group(func(r chi.Router) {
		r.Use(jwtauth.Verifier(authConfig.JWT_AUTH))
		r.Use(jwtauth.Authenticator(authConfig.JWT_AUTH))

		r.Mount(path, handler)
	})
}
