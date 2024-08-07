package auth

import (
	"context"
	"crypto/rand"
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fijoy/config"
	"fijoy/internal/gen/postgres/model"
	"fijoy/internal/service"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	. "fijoy/internal/gen/postgres/table"

	. "github.com/go-jet/jet/v2/postgres"
	"github.com/go-jet/jet/v2/qrm"
	"github.com/nrednav/cuid2"
)

type googleUserInfo struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	Picture       string `json:"picture"`
	VerifiedEmail bool   `json:"verified_email"`
}

type authHandler struct {
	authConfig       *config.AuthConfig
	db               *sql.DB
	serverConfig     *config.ServerConfig
	analyticsService service.AnalyticsService
}

func NewAuthHandler(authConfig *config.AuthConfig, db *sql.DB, serverConfig *config.ServerConfig, analyticsService service.AnalyticsService) *authHandler {
	return &authHandler{
		authConfig,
		db,
		serverConfig,
		analyticsService,
	}
}

func (ah authHandler) localLogin(w http.ResponseWriter, r *http.Request) {
	stmt := SELECT(FijoyUserKey.AllColumns).FROM(FijoyUserKey).
		WHERE(FijoyUserKey.ID.EQ(String("local:"))) // share the same local account

	var userKeyDest struct {
		model.FijoyUserKey
	}

	err := stmt.Query(ah.db, &userKeyDest)

	if err == qrm.ErrNoRows {
		userId := "user_" + cuid2.Generate()
		user := model.FijoyUser{
			ID:        userId,
			Email:     "local@fijoy.app",
			CreatedAt: time.Now(),
		}
		insertUserStmt := FijoyUser.INSERT(FijoyUser.AllColumns).MODEL(user)

		_, err := insertUserStmt.Exec(ah.db)
		if err != nil {
			http.Error(w, "Failed to insert user: "+err.Error(), http.StatusInternalServerError)
			return
		}

		userKey := model.FijoyUserKey{
			ID:     "local:",
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

	_, tokenString, _ := ah.authConfig.JWT_AUTH.Encode(
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
	http.Redirect(w, r, ah.serverConfig.WEB_URL+"/workspace", http.StatusFound)
}

func (ah authHandler) googleLogin(w http.ResponseWriter, r *http.Request) {
	googleOAuthState := generateStateOAuthCookie(w)
	url := ah.authConfig.GOOGLE.AuthCodeURL(googleOAuthState)
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
	http.Redirect(w, r, ah.serverConfig.WEB_URL, http.StatusFound)
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

		err = ah.analyticsService.SendToDiscord(fmt.Sprintf("New user: %s", googleUserInfo.Email))
		if err != nil {
			// TODO: improve logging
			log.Printf("Failed to send message to Discord: %s", err.Error())
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

	_, tokenString, _ := ah.authConfig.JWT_AUTH.Encode(
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
	http.Redirect(w, r, ah.serverConfig.WEB_URL+"/workspace", http.StatusFound)
}

func generateStateOAuthCookie(w http.ResponseWriter) string {
	expiration := time.Now().Add(20 * time.Minute)

	b := make([]byte, 16)
	rand.Read(b)
	state := base64.URLEncoding.EncodeToString(b)
	cookie := http.Cookie{Name: "google_oauth_state", Value: state, Expires: expiration, Secure: true, HttpOnly: true}

	http.SetCookie(w, &cookie)
	return state
}

func (ah *authHandler) getUserDataFromGoogle(code string) ([]byte, error) {
	// Use code to get token and get user info from Google.
	token, err := ah.authConfig.GOOGLE.Exchange(context.Background(), code)
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
