package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/mixin"
	"beavermoney.app/ent/privacy"
	"beavermoney.app/ent/rules"
)

// Household holds the schema definition for the Household entity.
type Household struct {
	ent.Schema
}

// Fields of the Household.
func (Household) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty(),
		field.String("locale").NotEmpty(),
	}
}

// Edges of the Household.
func (Household) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("currency", Currency.Type).
			Ref("households").
			Unique().Required(),
		edge.From("users", User.Type).
			Ref("households").
			Through("user_households", UserHousehold.Type),

		edge.To("accounts", Account.Type),
		edge.To("transactions", Transaction.Type),
		edge.To("investments", Investment.Type),
		edge.To("lots", Lot.Type),
		edge.To("transaction_categories", TransactionCategory.Type),
		edge.To("transaction_entries", TransactionEntry.Type),
	}
}

func (Household) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.QueryField(),
	}
}

func (Household) Policy() ent.Policy {
	return privacy.Policy{
		Query: privacy.QueryPolicy{
			rules.AllowPrivacyBypass(),
			rules.FilterMemberHousehold(),
		},
		Mutation: privacy.MutationPolicy{
			privacy.OnMutationOperation(
				privacy.AlwaysAllowRule(),
				ent.OpCreate,
			),
			rules.FilterMemberHousehold(),
		},
	}
}

func (Household) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}
