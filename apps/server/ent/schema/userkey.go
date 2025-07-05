package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/mixin"
)

// UserKey holds the schema definition for the UserKey entity.
type UserKey struct {
	ent.Schema
}

func (UserKey) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.Mutations(entgql.MutationCreate()),
	}
}

func (UserKey) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}

// Fields of the UserKey.
func (UserKey) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.String("hashed_password").Optional(),
	}
}

// Edges of the UserKey.
func (UserKey) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).Ref("user_key").Required().Unique(),
	}
}
