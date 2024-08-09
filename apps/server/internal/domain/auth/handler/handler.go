package handler

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"fijoy/config"
	auth_usecase "fijoy/internal/domain/auth/usecase"
	"fijoy/internal/service"
	"fmt"
	"io"
	"net/http"
	"time"

	"golang.org/x/oauth2"
)

type googleUserInfo struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	Picture       string `json:"picture"`
	VerifiedEmail bool   `json:"verified_email"`
}

type authHandler struct {
	authConfig *config.AuthConfig

	authUseCase auth_usecase.AuthUseCase

	serverConfig *config.ServerConfig

	analyticsService service.AnalyticsService
}

func NewAuthHandler(
	authConfig *config.AuthConfig,
	authUseCase auth_usecase.AuthUseCase,
	serverConfig *config.ServerConfig,
	analyticsService service.AnalyticsService,
) *authHandler {
	return &authHandler{
		authConfig,
		authUseCase,
		serverConfig,
		analyticsService,
	}
}

func (ah authHandler) localLogin(w http.ResponseWriter, r *http.Request) {
	user, err := ah.authUseCase.LocalLogin(r.Context())
	if err != nil {
		http.Error(w, "Failed to login: "+err.Error(), http.StatusInternalServerError)
	}

	_, tokenString, _ := ah.authConfig.JWT_AUTH.Encode(

		map[string]interface{}{"user_id": user.Id})

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

	// Use code to get token and get user info from Google.
	token, err := ah.authConfig.GOOGLE.Exchange(r.Context(), r.FormValue("code"))
	if err != nil {
		http.Error(w, "code exchange wrong: "+err.Error(), http.StatusInternalServerError)
		return
	}

	data, err := getUserDataFromGoogle(token)
	if err != nil {
		http.Error(w, "Failed to get user data: "+err.Error(), http.StatusInternalServerError)
		return
	}

	var googleUserInfo googleUserInfo
	err = json.Unmarshal(data, &googleUserInfo)
	if err != nil {
		http.Error(w, "Failed to unmarshal user data: "+err.Error(), http.StatusInternalServerError)
	}

	user, err := ah.authUseCase.GoogleLogin(r.Context(), googleUserInfo.Email, googleUserInfo.ID)

	_, tokenString, _ := ah.authConfig.JWT_AUTH.Encode(
		map[string]interface{}{"user_id": user.Id})

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

func getUserDataFromGoogle(token *oauth2.Token) ([]byte, error) {
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
