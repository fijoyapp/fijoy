package schema

import "entgo.io/ent"

// AccountSnapshot holds the schema definition for the AccountSnapshot entity.
type AccountSnapshot struct {
	ent.Schema
}

// Fields of the AccountSnapshot.
func (AccountSnapshot) Fields() []ent.Field {
	return nil
}

// Edges of the AccountSnapshot.
func (AccountSnapshot) Edges() []ent.Edge {
	return nil
}
