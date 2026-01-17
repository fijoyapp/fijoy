package auth

import (
	"context"
	"net/http"
	"strconv"

	"beavermoney.app/ent"
	"beavermoney.app/ent/userhousehold"
	"beavermoney.app/internal/contextkeys"
	"github.com/go-chi/jwtauth/v5"
)

// Middleware validates JWT tokens and sets user/household context.
func Middleware(client *ent.Client) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()

			_, claims, err := jwtauth.FromContext(ctx)
			if err != nil {
				http.Error(
					w,
					"Unauthorized: Invalid token",
					http.StatusUnauthorized,
				)
				return
			}

			userIDStr, ok := claims["user_id"].(string)
			if !ok {
				http.Error(
					w,
					"Unauthorized: Invalid user ID",
					http.StatusUnauthorized,
				)
				return
			}
			userID, err := strconv.Atoi(userIDStr)
			if err != nil {
				http.Error(
					w,
					"Bad Request: Invalid user ID format",
					http.StatusBadRequest,
				)
				return
			}

			ctx = context.WithValue(ctx, contextkeys.UserIDKey(), userID)

			householdIDStr := r.Header.Get("X-Household-ID")
			if householdIDStr != "" {
				hid, err := strconv.Atoi(householdIDStr)
				if err != nil {
					http.Error(
						w,
						"Bad Request: Invalid Household ID",
						http.StatusBadRequest,
					)
					return
				}

				isMember, err := client.UserHousehold.Query().
					Where(
						userhousehold.UserID(userID),
						userhousehold.HouseholdID(hid),
					).
					Exist(contextkeys.NewPrivacyBypassContext(ctx))
				if err != nil {
					http.Error(
						w,
						"Internal Server Error",
						http.StatusInternalServerError,
					)
					return
				}

				if isMember {
					ctx = context.WithValue(
						ctx,
						contextkeys.HouseholdIDKey(),
						hid,
					)
				}
			}

			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
