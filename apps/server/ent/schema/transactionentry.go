package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/mixin"
	"github.com/shopspring/decimal"
)

// TransactionEntry holds the schema definition for the TransactionEntry entity.
type TransactionEntry struct {
	ent.Schema
}

func (TransactionEntry) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
	}
}

func (TransactionEntry) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}

// Fields of the TransactionEntry.
func (TransactionEntry) Fields() []ent.Field {
	return []ent.Field{
		field.Text("note").Optional(),

		field.Float("amount").
			GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(36,18)",
				dialect.Postgres: "numeric(36,18)",
			}).
			Annotations(entgql.Type("String")).
			Comment("The unit amount of share or money in this transaction entry"),

		field.Float("value").
			GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,10)",
				dialect.Postgres: "numeric(18,10)",
			}).
			Annotations(
				entgql.Type("String"),
				entgql.Skip(entgql.SkipMutationCreateInput),
				entgql.Skip(entgql.SkipMutationUpdateInput),
			).
			Comment("The value of 1 share in the native currency. If this is just a currency account, then this field will be 1"),

		field.Float("balance").
			GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(36,18)",
				dialect.Postgres: "numeric(36,18)",
			}).
			Annotations(
				entgql.Type("String"),
				entgql.Skip(entgql.SkipMutationCreateInput),
				entgql.Skip(entgql.SkipMutationUpdateInput),
			).
			Comment("The total balance of this transaction entry in this account's currency"),
	}
}

// Edges of the TransactionEntry.
func (TransactionEntry) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("account", Account.Type).
			Ref("transaction_entries").
			Unique().
			Required(),
		edge.From("transaction", Transaction.Type).
			Ref("transaction_entries").
			Unique().
			Required(),
	}
}
