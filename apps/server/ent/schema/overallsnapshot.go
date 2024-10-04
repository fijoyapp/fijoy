package schema

import "entgo.io/ent"

// OverallSnapshot holds the schema definition for the OverallSnapshot entity.
type OverallSnapshot struct {
	ent.Schema
}

// Fields of the OverallSnapshot.
func (OverallSnapshot) Fields() []ent.Field {
	return nil
}

// Edges of the OverallSnapshot.
func (OverallSnapshot) Edges() []ent.Edge {
	return nil
}
