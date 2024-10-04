package schema

import "entgo.io/ent"

// Transaction holds the schema definition for the Transaction entity.
type Transaction struct {
	ent.Schema
}

// Fields of the Transaction.
func (Transaction) Fields() []ent.Field {
	return nil
}

// Edges of the Transaction.
func (Transaction) Edges() []ent.Edge {
	return nil
}
