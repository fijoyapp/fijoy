package handler

import (
	"context"
	"crypto/rand"
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fijoy/internal/gen/postgres/model"
	"fmt"
	"io"
	"net/http"
	"time"

	. "fijoy/internal/gen/postgres/table"

	. "github.com/go-jet/jet/v2/postgres"
	"github.com/go-jet/jet/v2/qrm"
	"github.com/nrednav/cuid2"

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
	frontendUrl       string
}

func NewAuthHandler(r *chi.Mux, googleOAuthConfig *oauth2.Config, tokenAuth *jwtauth.JWTAuth, db *sql.DB, frontendUrl string) {
	handler := &authHandler{googleOAuthConfig, tokenAuth, db, frontendUrl}

	r.Route("/v1/auth", func(r chi.Router) {
		r.Get("/google/login", handler.googleLogin)
		r.Get("/google/callback", handler.googleCallback)
		r.Get("/logout", handler.logout)
	})
}

func (ah authHandler) googleLogin(w http.ResponseWriter, r *http.Request) {
	googleOAuthState := generateStateOAuthCookie(w)
	url := ah.googleOAuthConfig.AuthCodeURL(googleOAuthState)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func (ah authHandler) logout(w http.ResponseWriter, r *http.Request) {
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
	http.Redirect(w, r, ah.frontendUrl, http.StatusFound)
}

func (ah *authHandler) googleCallback(w http.ResponseWriter, r *http.Request) {
	googleOAuthState, _ := r.Cookie("google_oauth_state")

	if r.FormValue("state") != googleOAuthState.Value {
		http.Error(w, "Invalid state", http.StatusBadRequest)
		return
	}

	data, err := ah.getUserDataFromGoogle(r.FormValue("code"))
	if err != nil {
		http.Error(w, "Failed to get user data: "+err.Error(), http.StatusInternalServerError)
		return
	}

	var googleUserInfo googleUserInfo
	err = json.Unmarshal(data, &googleUserInfo)
	if err != nil {
		http.Error(w, "Failed to unmarshal user data: "+err.Error(), http.StatusInternalServerError)
	}

	stmt := SELECT(FijoyUserKey.AllColumns).FROM(FijoyUserKey).
		WHERE(FijoyUserKey.ID.EQ(String("google:" + googleUserInfo.ID)))

	var userKeyDest struct {
		model.FijoyUserKey
	}

	err = stmt.Query(ah.db, &userKeyDest)

	if err == qrm.ErrNoRows {
		userId := "user_" + cuid2.Generate()
		user := model.FijoyUser{
			ID:        userId,
			Email:     googleUserInfo.Email,
			CreatedAt: time.Now(),
		}
		insertUserStmt := FijoyUser.INSERT(FijoyUser.AllColumns).MODEL(user)

		_, err := insertUserStmt.Exec(ah.db)
		if err != nil {
			http.Error(w, "Failed to insert user: "+err.Error(), http.StatusInternalServerError)
			return
		}

		userKey := model.FijoyUserKey{
			ID:     "google:" + googleUserInfo.ID,
			UserID: userId,
		}

		insert := FijoyUserKey.INSERT(FijoyUserKey.ID, FijoyUserKey.UserID).MODEL(userKey)
		_, err = insert.Exec(ah.db)
		if err != nil {
			http.Error(w, "Failed to insert user key: "+err.Error(), http.StatusInternalServerError)
			return
		}
		userKeyDest.UserID = userKey.UserID
	} else if err != nil {
		http.Error(w, "Failed to query user data: "+err.Error(), http.StatusInternalServerError)
		return
	}

	var workspaceUserDest []struct {
		model.FijoyWorkspaceUser
	}

	stmt = SELECT(FijoyWorkspaceUser.AllColumns).FROM(FijoyWorkspaceUser).
		WHERE(FijoyWorkspaceUser.UserID.EQ(String(userKeyDest.UserID)))

	err = stmt.Query(ah.db, &workspaceUserDest)
	if err != nil {
		http.Error(w, "Failed to query workspace user data: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// ids := make([]string, len(workspaceUserDest))
	// for idx, workspaceUser := range workspaceUserDest {
	// 	fmt.Println(workspaceUser.WorkspaceID)
	// 	ids[idx] = workspaceUser.WorkspaceID
	// }
	// fmt.Println("wtf", ids)

	_, tokenString, _ := ah.tokenAuth.Encode(
		map[string]interface{}{"user_id": userKeyDest.UserID})

	cookie := &http.Cookie{
		Name:     "jwt",
		Value:    tokenString,
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: true,
		Path:     "/",
		Secure:   true,
		SameSite: http.SameSiteStrictMode,
	}

	http.SetCookie(w, cookie)
	http.Redirect(w, r, ah.frontendUrl+"/workspace", http.StatusFound)
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
