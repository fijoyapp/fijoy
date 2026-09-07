package auth

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"beavermoney.app/internal/contextkeys"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"
)

func TestJWTMiddleware(t *testing.T) {
	tokenAuth := NewJWTAuth("test-signing-secret")
	for _, tt := range []struct {
		name   string
		userID any
		expiry time.Time
		secret string
		status int
	}{
		{"valid", "42", time.Now().Add(time.Hour), "test-signing-secret", http.StatusNoContent},
		{"expired", "42", time.Now().Add(-time.Hour), "test-signing-secret", http.StatusUnauthorized},
		{"wrong signature", "42", time.Now().Add(time.Hour), "other-secret", http.StatusUnauthorized},
		{"missing user", nil, time.Now().Add(time.Hour), "test-signing-secret", http.StatusUnauthorized},
		{"numeric user", 42, time.Now().Add(time.Hour), "test-signing-secret", http.StatusUnauthorized},
		{"malformed user", "invalid", time.Now().Add(time.Hour), "test-signing-secret", http.StatusBadRequest},
	} {
		t.Run(tt.name, func(t *testing.T) {
			_, signed, err := NewJWTAuth(tt.secret).Encode(map[string]any{
				"user_id": tt.userID,
				"exp":     tt.expiry.Unix(),
			})
			if err != nil {
				t.Fatal(err)
			}

			router := chi.NewRouter()
			router.Use(jwtauth.Verifier(tokenAuth), jwtauth.Authenticator(tokenAuth), Middleware(nil))
			router.Get("/", func(w http.ResponseWriter, r *http.Request) {
				if id, _ := r.Context().Value(contextkeys.UserIDKey()).(int); id != 42 {
					t.Errorf("user ID = %d, want 42", id)
				}
				w.WriteHeader(http.StatusNoContent)
			})

			req := httptest.NewRequest(http.MethodGet, "/", nil)
			req.Header.Set("Authorization", "Bearer "+signed)
			response := httptest.NewRecorder()
			router.ServeHTTP(response, req)
			if response.Code != tt.status {
				t.Errorf("status = %d, want %d: %s", response.Code, tt.status, response.Body.String())
			}
		})
	}
}
