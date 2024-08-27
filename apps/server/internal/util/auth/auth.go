package auth

import (
	"context"
	"errors"

	"github.com/go-chi/jwtauth/v5"
)

func GetUserIdFromContext(ctx context.Context) (string, error) {
	_, claims, _ := jwtauth.FromContext(ctx)
	if claims == nil {
		return "", errors.New("no claims found")
	}

	if _, ok := claims["user_id"]; !ok {
		return "", errors.New("no user_id found in claims")
	}

	return claims["user_id"].(string), nil
}

// func ExtractProfileIdFromHeader(header http.Header) (string, error) {
// 	profileId := header.Get("Fijoy-Profile-Id")
// 	if profileId == "" {
// 		return "", errors.New("missing Fijoy-Profile-Id in request header")
// 	}
// 	return profileId, nil
// }
