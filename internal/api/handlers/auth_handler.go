package handlers

import (
	"context"
	"crypto/rand"
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fijoy/.gen/neondb/public/model"
	"fmt"
	"io"
	"net/http"
	"time"

	. "fijoy/.gen/neondb/public/table"

	. "github.com/go-jet/jet/v2/postgres"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"
	"golang.org/x/oauth2"
)

type googleUserInfo struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	Picture       string `json:"picture"`
	VerifiedEmail bool   `json:"verified_email"`
}

type authHandler struct {
	googleOAuthConfig *oauth2.Config
	tokenAuth         *jwtauth.JWTAuth
	db                *sql.DB
}

func NewAuthHandler(r *chi.Mux, googleOAuthConfig *oauth2.Config, tokenAuth *jwtauth.JWTAuth, db *sql.DB) {
	handler := &authHandler{googleOAuthConfig, tokenAuth, db}
	r.Route("/auth", func(r chi.Router) {
		r.Get("/google/login", handler.GoogleLogin)
		r.Get("/google/logout", handler.GoogleLogout)
		r.Get("/google/callback", handler.GoogleCallback)
	})
}

func (ah *authHandler) GoogleLogin(w http.ResponseWriter, r *http.Request) {
	googleOAuthState := generateStateOAuthCookie(w)
	url := ah.googleOAuthConfig.AuthCodeURL(googleOAuthState)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func (ah *authHandler) GoogleLogout(w http.ResponseWriter, r *http.Request) {
	cookie := http.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().AddDate(0, 0, -1),
		HttpOnly: true,
		Path:     "/",
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	}
	http.SetCookie(w, &cookie)
	http.Redirect(w, r, "http://localhost:5173", http.StatusFound)
}

func (ah *authHandler) GoogleCallback(w http.ResponseWriter, r *http.Request) {
	googleOAuthState, _ := r.Cookie("google_oauth_state")

	if r.FormValue("state") != googleOAuthState.Value {
		http.Error(w, "Invalid state", http.StatusBadRequest)
		return
	}

	data, err := ah.getUserDataFromGoogle(r.FormValue("code"))
	if err != nil {
		http.Error(w, "Failed to get user data", http.StatusInternalServerError)
	}
	fmt.Printf("UserInfo %s \n", data)

	var googleUserInfo googleUserInfo
	err = json.Unmarshal(data, &googleUserInfo)
	if err != nil {
		http.Error(w, "Failed to unmarshal user data", http.StatusInternalServerError)
	}

	fmt.Println(googleUserInfo.Email)

	stmt := SELECT(FijoyUser.AllColumns).FROM(FijoyUser).
		WHERE(FijoyUser.Email.EQ(String(googleUserInfo.Email)))

	var dest struct {
		model.FijoyUser
	}

	err = stmt.Query(ah.db, &dest)
	if err != nil {
		http.Error(w, "Failed to query user data", http.StatusInternalServerError)
	}
	fmt.Println(dest.Email)

	if dest.Email == "" {
		user := model.FijoyUser{
			ID:    "itsjoeoui",
			Email: googleUserInfo.Email,
		}
		insertStmt := FijoyUser.INSERT(FijoyUser.AllColumns).MODEL(user)

		dest := model.FijoyUser{}
		err = insertStmt.Query(ah.db, &dest)
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(dest.ID)
	}

	_, tokenString, _ := ah.tokenAuth.Encode(map[string]interface{}{"email": googleUserInfo.Email})

	cookie := &http.Cookie{
		Name:     "jwt",
		Value:    tokenString,
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: true,
		Path:     "/",
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	}

	http.SetCookie(w, cookie)
	http.Redirect(w, r, "http://localhost:5173", http.StatusFound)
}

func generateStateOAuthCookie(w http.ResponseWriter) string {
	expiration := time.Now().Add(20 * time.Minute)

	b := make([]byte, 16)
	rand.Read(b)
	state := base64.URLEncoding.EncodeToString(b)
	cookie := http.Cookie{Name: "google_oauth_state", Value: state, Expires: expiration}

	http.SetCookie(w, &cookie)
	return state
}

func (ah *authHandler) getUserDataFromGoogle(code string) ([]byte, error) {
	// Use code to get token and get user info from Google.
	token, err := ah.googleOAuthConfig.Exchange(context.Background(), code)
	if err != nil {
		return nil, fmt.Errorf("code exchange wrong: %s", err.Error())
	}
	response, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		return nil, fmt.Errorf("failed getting user info: %s", err.Error())
	}
	defer response.Body.Close()
	contents, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, fmt.Errorf("failed read response: %s", err.Error())
	}
	return contents, nil
}
