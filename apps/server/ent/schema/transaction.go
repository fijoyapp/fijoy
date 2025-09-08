package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/mixin"
)

// Transaction holds the schema definition for the Transaction entity.
type Transaction struct {
	ent.Schema
}

func (Transaction) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
	}
}

func (Transaction) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}

// Fields of the Transaction.
func (Transaction) Fields() []ent.Field {
	return []ent.Field{
		field.Text("note").Optional(),
	}
}

// Edges of the Transaction.
func (Transaction) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("profile", Profile.Type).Ref("transactions").
			Unique().
			Required().
			Annotations(
				entgql.Skip(entgql.SkipMutationCreateInput),
				entgql.Skip(entgql.SkipMutationUpdateInput),
			),

		// edge.From("category", Category.Type).Ref("transactions").
		// 	Unique().
		// 	Required().
		// 	Annotations(
		// 		entgql.Skip(entgql.SkipMutationCreateInput),
		// 		entgql.Skip(entgql.SkipMutationUpdateInput),
		// 	),

		edge.To("transaction_entries", TransactionEntry.Type),
	}
}
