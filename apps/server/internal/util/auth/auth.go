package auth

import (
	"context"
	"errors"
	"fijoy/internal/middleware"
	"net/http"
	"time"

	"github.com/go-chi/jwtauth/v5"
)

type AuthData struct {
	UserID    int
	ProfileID int
}

func GetAuthDataFromContext(ctx context.Context) (*AuthData, error) {
	_, claims, _ := jwtauth.FromContext(ctx)
	if claims == nil {
		return &AuthData{}, errors.New("no claims found")
	}

	if _, ok := claims["user_id"]; !ok {
		return &AuthData{}, errors.New("no user_id found in claims")
	}

	userID := claims["user_id"].(float64)

	if _, ok := claims["profile_id"]; !ok {
		return &AuthData{
			UserID: int(userID),
		}, errors.New("no profile_id found in claims")
	}

	profileID := claims["profile_id"].(float64)

	return &AuthData{
		UserID:    int(userID),
		ProfileID: int(profileID),
	}, nil
}

type UserData struct {
	UserID int
}

func GetUserDataFromContext(ctx context.Context) (*UserData, error) {
	_, claims, _ := jwtauth.FromContext(ctx)
	if claims == nil {
		return &UserData{}, errors.New("no claims found")
	}

	if _, ok := claims["user_id"]; !ok {
		return &UserData{}, errors.New("no user_id found in claims")
	}

	userID := claims["user_id"].(float64)

	return &UserData{
		UserID: int(userID),
	}, nil
}

func RemoveJwtCookie(ctx context.Context) {
	writer, _ := ctx.Value(middleware.CookieKey).(http.ResponseWriter)
	http.SetCookie(writer, &http.Cookie{
		HttpOnly: true,
		MaxAge:   0,
		Secure:   true,
		Name:     "jwt",
	})
}

func SetJwtCookie(ctx context.Context, tokenString string) {
	writer, _ := ctx.Value(middleware.CookieKey).(http.ResponseWriter)

	cookie := &http.Cookie{
		Name:     "jwt",
		Value:    tokenString,
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: true,
		Path:     "/",
		Secure:   true,
		SameSite: http.SameSiteStrictMode,
	}
	http.SetCookie(writer, cookie)
}
