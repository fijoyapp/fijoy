package schema

import "entgo.io/ent"

// Profile holds the schema definition for the Profile entity.
type Profile struct {
	ent.Schema
}

// Fields of the Profile.
func (Profile) Fields() []ent.Field {
	return nil
}

// Edges of the Profile.
func (Profile) Edges() []ent.Edge {
	return nil
}
