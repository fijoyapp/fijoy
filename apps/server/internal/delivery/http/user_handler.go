package handler

import (
	"database/sql"
	"encoding/json"
	"fijoy/.gen/neondb/public/model"
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
	handler := userHandler{tokenAuth, db}

	r.Route("/v1/user", func(r chi.Router) {
		r.Use(jwtauth.Verifier(tokenAuth))
		r.Use(jwtauth.Authenticator(tokenAuth))

		r.Get("/", handler.getUserData)
	})
}

func (uh userHandler) getUserData(w http.ResponseWriter, r *http.Request) {
	_, claims, _ := jwtauth.FromContext(r.Context())

	// workspaces := claims["workspaces"].([]interface{})
	// var result []string
	// for _, v := range workspaces {
	// 	if str, ok := v.(string); ok {
	// 		result = append(result, str)
	// 	}
	// }

	// fmt.Println(result)
	// if contains(result, "workspace_mtrusxj2r6wm2tfbnw97rb5c") {
	// 	fmt.Println("Yoooo")
	// }

	stmt := SELECT(FijoyUser.AllColumns).FROM(FijoyUser).
		WHERE(FijoyUser.ID.EQ(String(claims["user_id"].(string))))

	dest := model.FijoyUser{}

	err := stmt.QueryContext(r.Context(), uh.db, &dest)
	if err != nil {
		http.Error(w, "Failed to get user: "+err.Error(), http.StatusInternalServerError)
	}

	json.NewEncoder(w).Encode(dest)
}

func contains(slice []string, value string) bool {
	for _, el := range slice {
		if el == value {
			return true
		}
	}
	return false
}
