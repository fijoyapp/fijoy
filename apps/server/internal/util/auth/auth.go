package auth

import (
	"context"
	"errors"

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
