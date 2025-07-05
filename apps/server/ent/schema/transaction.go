package schema

import (
	"time"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/mixin"
	"github.com/shopspring/decimal"
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
		field.String("id"),

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
			),

		field.Text("note").Optional(),

		field.Time("datetime").Default(time.Now).Annotations(
			entsql.Default("CURRENT_TIMESTAMP"),
		),
	}
}

// Edges of the Transaction.
func (Transaction) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("profile", Profile.Type).Ref("transaction").
			Unique().
			Required().
			Annotations(
				entgql.Skip(entgql.SkipMutationCreateInput),
				entgql.Skip(entgql.SkipMutationUpdateInput),
			),
		edge.To("transaction_entries", TransactionEntry.Type),
	}
}
