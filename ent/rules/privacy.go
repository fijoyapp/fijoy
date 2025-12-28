package rules

import (
	"context"

	"entgo.io/ent/entql"
	"fijoy.app/ent"
	"fijoy.app/ent/privacy"
	"fijoy.app/internal/contextkeys"
)

func AllowPrivacyBypass() privacy.QueryMutationRule {
	return privacy.ContextQueryMutationRule(func(ctx context.Context) error {
		if contextkeys.IsPrivacyBypass(ctx) {
			return privacy.Allow
		}
		return privacy.Skip
	})
}

// FilterByHousehold enforces strict isolation per household.
func FilterByHousehold() privacy.QueryMutationRule {
	type HouseholdScoped interface {
		WhereHouseholdID(entql.IntP)
	}

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

func FilterMe() privacy.QueryMutationRule {
	type MeFilter interface {
		WhereID(entql.IntP)
	}

	return privacy.FilterFunc(
		func(ctx context.Context, f privacy.Filter) error {
			uid, ok := ctx.Value(contextkeys.UserIDKey()).(int)
			if !ok {
				return privacy.Denyf("unauthenticated filter me")
			}

			if tf, ok := f.(MeFilter); ok {
				tf.WhereID(entql.IntEQ(uid))
			}
			return privacy.Skip
		},
	)
}

func FilterOwner() privacy.QueryMutationRule {
	type OwnerFilter interface {
		WhereHasUserWith(func(*ent.UserFilter))
	}

	return privacy.FilterFunc(
		func(ctx context.Context, f privacy.Filter) error {
			uid, ok := ctx.Value(contextkeys.UserIDKey()).(int)
			if !ok {
				return privacy.Denyf("unauthenticated filter owner")
			}

			if tf, ok := f.(OwnerFilter); ok {
				tf.WhereHasUserWith(func(uf *ent.UserFilter) {
					uf.WhereID(entql.IntEQ(uid))
				})
			}
			return privacy.Skip
		},
	)
}

func FilterMemberHousehold() privacy.QueryMutationRule {
	type MemberHouseholdFilter interface {
		WhereHasUsersWith(func(*ent.UserFilter))
	}

	return privacy.FilterFunc(
		func(ctx context.Context, f privacy.Filter) error {
			uid, ok := ctx.Value(contextkeys.UserIDKey()).(int)
			if !ok {
				return privacy.Denyf("unauthenticated member household")
			}

			// Filter: Show Households where 'users' edge contains ME
			if tf, ok := f.(MemberHouseholdFilter); ok {
				tf.WhereHasUsersWith(func(uf *ent.UserFilter) {
					uf.WhereID(entql.IntEQ(uid))
				})
			}
			return privacy.Skip
		},
	)
}

func FilterCoMembers() privacy.QueryMutationRule {
	type CoMemberFilter interface {
		WhereHouseholdID(entql.IntP)
	}

	return privacy.FilterFunc(
		func(ctx context.Context, f privacy.Filter) error {
			hid, ok := ctx.Value(contextkeys.HouseholdIDKey()).(int)
			if !ok || hid == 0 {
				return privacy.Denyf("security: missing household context")
			}

			if tf, ok := f.(CoMemberFilter); ok {
				tf.WhereHouseholdID(entql.IntEQ(hid))
			}
			return privacy.Skip
		},
	)
}
