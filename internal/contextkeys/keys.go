package contextkeys

type householdIDKey struct{}
type userIDKey struct{}

func HouseholdIDKey() interface{} {
	return householdIDKey{}
}

func UserIDKey() interface{} {
	return userIDKey{}
}
