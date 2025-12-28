package rules

import (
	"context"

	"entgo.io/ent/entql"
	"fijoy.app/ent/privacy"
	"fijoy.app/internal/contextkeys"
)

type HouseholdScoped interface {
	WhereHouseholdID(entql.IntP)
}

// FilterByHousehold enforces strict isolation per household.
func FilterByHousehold() privacy.QueryMutationRule {
	return privacy.FilterFunc(
		func(ctx context.Context, f privacy.Filter) error {
			hid, ok := ctx.Value(contextkeys.HouseholdIDKey()).(int)
			if !ok || hid == 0 {
				return privacy.Denyf("security: missing household context")
			}

			if tf, ok := f.(HouseholdScoped); ok {
				tf.WhereHouseholdID(entql.IntEQ(hid))
			}

			return privacy.Skip
		},
	)
}
