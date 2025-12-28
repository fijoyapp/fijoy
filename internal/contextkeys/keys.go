package contextkeys

import "context"

type (
	householdIDKey   struct{}
	userIDKey        struct{}
	privacyBypassKey struct{}
)

func HouseholdIDKey() interface{} {
	return householdIDKey{}
}

func UserIDKey() interface{} {
	return userIDKey{}
}

func PrivacyBypassKey() interface{} {
	return privacyBypassKey{}
}

func NewPrivacyBypassContext(parent context.Context) context.Context {
	return context.WithValue(parent, privacyBypassKey{}, true)
}

func IsPrivacyBypass(ctx context.Context) bool {
	isPrivacyBypass, ok := ctx.Value(privacyBypassKey{}).(bool)
	return ok && isPrivacyBypass
}
