package schema

import "entgo.io/ent"

// UserKey holds the schema definition for the UserKey entity.
type UserKey struct {
	ent.Schema
}

// Fields of the UserKey.
func (UserKey) Fields() []ent.Field {
	return nil
}

// Edges of the UserKey.
func (UserKey) Edges() []ent.Edge {
	return nil
}
