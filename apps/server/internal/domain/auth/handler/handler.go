package handler

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"fijoy/config"
	analytics_usecase "fijoy/internal/domain/analytics/usecase"
	auth_usecase "fijoy/internal/domain/auth/usecase"
	"fijoy/internal/util/auth"
	"fmt"
	"io"
	"net/http"
	"time"

	"golang.org/x/oauth2"
)

type authHandler struct {
	authConfig *config.AuthConfig

	authUseCase auth_usecase.AuthUseCase

	serverConfig *config.ServerConfig

	analyticsUseCase analytics_usecase.AnalyticsUseCase
}

func NewAuthHandler(
	authConfig *config.AuthConfig,
	authUseCase auth_usecase.AuthUseCase,
	serverConfig *config.ServerConfig,
	analyticsUseCase analytics_usecase.AnalyticsUseCase,
) *authHandler {
	return &authHandler{
		authConfig,
		authUseCase,
		serverConfig,
		analyticsUseCase,
	}
}

func (h *authHandler) logout(w http.ResponseWriter, r *http.Request) {
	// Wipe out the JWT token in Cookie.
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

	// Redirect to the home page.
	http.Redirect(w, r, h.serverConfig.WEB_URL, http.StatusFound)
}

func (h *authHandler) localLogin(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	user, err := h.authUseCase.LocalLogin(ctx)
	if err != nil {
		http.Error(w, "failed to login: "+err.Error(), http.StatusInternalServerError)
		return
	}

	claims := map[string]any{
		"user_id": user.ID,
	}

	profileID, err := h.authUseCase.GetProfileID(ctx, user.ID)
	fmt.Println("profileId", profileID)
	if err != nil {
		http.Error(w, "failed to get profile id: "+err.Error(), http.StatusInternalServerError)
	}
	if profileID != 0 {
		claims["profile_id"] = profileID
	}

	_, tokenString, _ := h.authConfig.JWT_AUTH.Encode(claims)

	auth.SetJwtCookie(ctx, tokenString)

	http.Redirect(w, r, h.serverConfig.WEB_URL+"/setup", http.StatusFound)
}

func (h *authHandler) googleLogin(w http.ResponseWriter, r *http.Request) {
	googleOAuthState := generateStateOAuthCookie(w)
	url := h.authConfig.GOOGLE.AuthCodeURL(googleOAuthState)

	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func (h *authHandler) googleCallback(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	googleOAuthState, _ := r.Cookie("google_oauth_state")

	if r.FormValue("state") != googleOAuthState.Value {
		http.Error(w, "invalid google_oauth_state", http.StatusBadRequest)
		return
	}

	// Use code to get token and get user info from Google.
	token, err := h.authConfig.GOOGLE.Exchange(ctx, r.FormValue("code"))
	if err != nil {
		http.Error(w, "google code exchange wrong: "+err.Error(), http.StatusInternalServerError)
		return
	}

	data, err := getUserDataFromGoogle(token)
	if err != nil {
		http.Error(w, "failed to get user data from google: "+err.Error(), http.StatusInternalServerError)
		return
	}

	var googleUserInfo struct {
		ID            string `json:"id"`
		Email         string `json:"email"`
		Picture       string `json:"picture"`
		VerifiedEmail bool   `json:"verified_email"`
	}

	err = json.Unmarshal(data, &googleUserInfo)
	if err != nil {
		http.Error(w, "Failed to unmarshal user data: "+err.Error(), http.StatusInternalServerError)
		return
	}

	user, err := h.authUseCase.GoogleLogin(
		r.Context(), googleUserInfo.Email, googleUserInfo.ID,
	)
	if err != nil {
		http.Error(w, "failed to login: "+err.Error(), http.StatusInternalServerError)
		return
	}

	claims := map[string]any{
		"user_id": user.ID,
	}

	profileID, err := h.authUseCase.GetProfileID(ctx, user.ID)
	if err != nil {
		http.Error(w, "failed to get profile id: "+err.Error(), http.StatusInternalServerError)
	}
	if profileID != 0 {
		claims["profile_id"] = profileID
	}

	_, tokenString, _ := h.authConfig.JWT_AUTH.Encode(claims)

	auth.SetJwtCookie(ctx, tokenString)

	http.Redirect(w, r, h.serverConfig.WEB_URL+"/setup", http.StatusFound)
}

func generateStateOAuthCookie(w http.ResponseWriter) string {
	expiration := time.Now().Add(20 * time.Minute)

	b := make([]byte, 16)
	rand.Read(b) //nolint:errcheck

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

	defer func() {
		if err := response.Body.Close(); err != nil {
			return
		}
	}()

	contents, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, fmt.Errorf("failed read response: %s", err.Error())
	}
	return contents, nil
}
