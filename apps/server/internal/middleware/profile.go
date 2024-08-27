package middleware

import (
	"context"
	"net/http"
)

func ProfileMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		profileId := r.Header.Get("Fijoy-Profile-Id")

		ctx := context.WithValue(r.Context(), "profileId", profileId)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
