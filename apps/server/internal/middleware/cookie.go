package middleware

import (
	"context"
	"net/http"
)

var CookieKey = ContextKey("cookie")

func CookieMiddleWare() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := context.WithValue(r.Context(), CookieKey, w)
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}
