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

type accountHandler struct {
	tokenAuth *jwtauth.JWTAuth
	db        *sql.DB
}

func NewAccountHandler(tokenAuth *jwtauth.JWTAuth, db *sql.DB) chi.Router {
	handler := &accountHandler{tokenAuth, db}

	router := chi.NewRouter()

	router.Use(jwtauth.Verifier(tokenAuth))
	router.Use(jwtauth.Authenticator(tokenAuth))

	router.Get("/", handler.getAccount)
	return router
}

func (ah *accountHandler) getAccount(w http.ResponseWriter, r *http.Request) {
	_, claims, _ := jwtauth.FromContext(r.Context())
	stmt := SELECT(FijoyUser.AllColumns).FROM(FijoyUser).
		WHERE(FijoyUser.ID.EQ(String(claims["user_id"].(string))))
	dest := &model.FijoyUser{}

	err := stmt.Query(ah.db, &dest)
	if err != nil {
		panic(err)
	}

	jsonText, _ := json.MarshalIndent(dest, "", "\t")

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, string(jsonText))
}
