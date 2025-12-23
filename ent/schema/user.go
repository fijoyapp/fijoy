package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/mixin"
)

// User holds the schema definition for the User entity.
type User struct {
	ent.Schema
}

// Fields of the User.
func (User) Fields() []ent.Field {
	return []ent.Field{
		field.String("email").NotEmpty(),
	}
}

// Edges of the User.
func (User) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("households", Household.Type).
			Through("user_households", UserHousehold.Type),
	}
}

func (User) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}

// UserHousehold holds the schema definition for the UserHousehold entity.
type UserHousehold struct {
	ent.Schema
}

// Fields of the UserHousehold.
func (UserHousehold) Fields() []ent.Field {
	return []ent.Field{
		field.Int("user_id").Immutable(),
		field.Int("household_id").Immutable(),
		field.Enum("role").
			Values("admin", "member"),
	}
}

// Edges of the UserHousehold.
func (UserHousehold) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("user", User.Type).
			Unique().
			Required().
			Field("user_id").
			Immutable(),
		edge.To("household", Household.Type).
			Unique().
			Required().
			Field("household_id").Immutable(),
	}
}

func (UserHousehold) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}
