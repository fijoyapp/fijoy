package handlers

import (
	"database/sql"
	"encoding/json"
	"fijoy/.gen/neondb/public/model"
	"fmt"
	"net/http"

	. "fijoy/.gen/neondb/public/table"

	. "github.com/go-jet/jet/v2/postgres"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"
)

type userHandler struct {
	tokenAuth *jwtauth.JWTAuth
	db        *sql.DB
}

func NewUserHandler(r *chi.Mux, tokenAuth *jwtauth.JWTAuth, db *sql.DB) {
	handler := &userHandler{tokenAuth, db}

	r.Group(func(r chi.Router) {
		r.Route("/user", func(r chi.Router) {
			r.Use(jwtauth.Verifier(tokenAuth))
			r.Use(jwtauth.Authenticator(tokenAuth))

			r.Get("/", handler.GetUserData)
		})
	})
}

func (uh *userHandler) GetUserData(w http.ResponseWriter, r *http.Request) {
	_, claims, _ := jwtauth.FromContext(r.Context())
	stmt := SELECT(FijoyUser.AllColumns).FROM(FijoyUser).
		WHERE(FijoyUser.Email.EQ(String(claims["email"].(string))))

	var dest struct {
		model.FijoyUser
	}

	err := stmt.Query(uh.db, &dest)
	if err != nil {
		panic(err)
	}

	jsonText, _ := json.MarshalIndent(dest, "", "\t")

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, string(jsonText))
}
