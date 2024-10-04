package schema

import "entgo.io/ent"

// Account holds the schema definition for the Account entity.
type Account struct {
	ent.Schema
}

// Fields of the Account.
func (Account) Fields() []ent.Field {
	return nil
}

// Edges of the Account.
func (Account) Edges() []ent.Edge {
	return nil
}
