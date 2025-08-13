package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// UserProfile holds the schema definition for the UserProfile entity.
type UserProfile struct {
	ent.Schema
}

func (UserProfile) Annotations() []schema.Annotation {
	return []schema.Annotation{
		field.ID("user_id", "profile_id"),
	}
}

// Fields of the UserProfile.
func (UserProfile) Fields() []ent.Field {
	return []ent.Field{
		field.Enum("permission").
			Values("owner", "admin", "viewer"),
		field.Int("user_id"),
		field.Int("profile_id"),
	}
}

// Edges of the UserProfile.
func (UserProfile) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("user", User.Type).
			Unique().
			Required().
			Field("user_id"),
		edge.To("profile", Profile.Type).
			Unique().
			Required().
			Field("profile_id"),
	}
}
