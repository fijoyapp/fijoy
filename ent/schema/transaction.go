package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"entgo.io/ent/schema/mixin"
	"github.com/shopspring/decimal"
)

// Transaction holds the schema definition for the Transaction entity.
type Transaction struct {
	ent.Schema
}

// Fields of the Transaction.
func (Transaction) Fields() []ent.Field {
	return []ent.Field{
		field.String("description").Optional(),
		field.Time("datetime").
			Annotations(
				entgql.OrderField("DATETIME"),
			),
	}
}

// Edges of the Transaction.
func (Transaction) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("transactions").Unique().Required(),
		edge.From("household", Household.Type).
			Ref("transactions").
			Unique().
			Immutable().
			Required(),

		edge.To("transaction_entries", TransactionEntry.Type),
	}
}

func (Transaction) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("datetime"),
	}
}

func (Transaction) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
	}
}

func (Transaction) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}

// TransactionEntry holds the schema definition for the TransactionEntry entity.
type TransactionEntry struct {
	ent.Schema
}

// Fields of the TransactionEntry.
func (TransactionEntry) Fields() []ent.Field {
	return []ent.Field{
		field.Float("amount").GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.Postgres: "numeric(36,18)",
			}).
			Annotations(entgql.Type("String")),
	}
}

// Edges of the TransactionEntry.
func (TransactionEntry) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("account", Account.Type).
			Ref("transaction_entries").Unique().Required(),
		edge.From("currency", Currency.Type).
			Ref("transaction_entries").Unique().Required(),
		edge.From("transaction", Transaction.Type).
			Ref("transaction_entries").Unique().Required(),
	}
}

func (TransactionEntry) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.QueryField(),
	}
}

func (TransactionEntry) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}
