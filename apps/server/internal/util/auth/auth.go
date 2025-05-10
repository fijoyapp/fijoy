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
	UserId    string
	ProfileId string
}

func GetAuthDataFromContext(ctx context.Context) (*AuthData, error) {
	_, claims, _ := jwtauth.FromContext(ctx)
	if claims == nil {
		return &AuthData{}, errors.New("no claims found")
	}

	if _, ok := claims["user_id"]; !ok {
		return &AuthData{}, errors.New("no user_id found in claims")
	}

	if _, ok := claims["profile_id"]; !ok {
		return &AuthData{}, errors.New("no profile_id found in claims")
	}

	userId := claims["user_id"].(string)
	profileId := claims["profile_id"].(string)

	return &AuthData{
		UserId:    userId,
		ProfileId: profileId,
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
