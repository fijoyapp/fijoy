package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/mixin"
)

// Household holds the schema definition for the Household entity.
type Household struct {
	ent.Schema
}

// Fields of the Household.
func (Household) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty(),
	}
}

// Edges of the Household.
func (Household) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("currency", Currency.Type).
			Ref("households").
			Unique(),
		edge.From("users", User.Type).
			Ref("households").
			Through("user_households", UserHousehold.Type),

		edge.To("accounts", Account.Type),
		edge.To("transactions", Transaction.Type),
	}
}

func (Household) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}
