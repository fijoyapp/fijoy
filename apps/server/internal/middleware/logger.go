package middleware

import (
	"context"
	"net/http"

	"go.uber.org/zap"
)

var LoggerKey = ContextKey("logger")

// LoggerMiddleware returns a middleware function that injects the logger into the context
func LoggerMiddleware(logger *zap.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Add the logger to the context
			ctx := context.WithValue(r.Context(), LoggerKey, logger)
			// Pass the new context with logger to the next handler
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

// GetLogger retrieves the logger from the context
func GetLogger(ctx context.Context) *zap.Logger {
	if ctxLogger, ok := ctx.Value(LoggerKey).(*zap.Logger); ok {
		return ctxLogger
	}
	return zap.NewNop() // return no-op logger if none found
}
