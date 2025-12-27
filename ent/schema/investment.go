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

// Investment holds the schema definition for the Investment entity.
type Investment struct {
	ent.Schema
}

// Fields of the Investment.
func (Investment) Fields() []ent.Field {
	return []ent.Field{
		field.String("name"),
		field.Enum("type").Values("stock", "crypto"),
		field.String("symbol").NotEmpty(),

		field.Float("amount").GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.Postgres: "numeric(36,18)",
			}).
			Annotations(entgql.Type("String")),
	}
}

// Edges of the Investment.
func (Investment) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("account", Account.Type).
			Ref("investments").
			Unique().Immutable().Required(),
		edge.From("household", Household.Type).
			Ref("investments").
			Unique().
			Immutable().
			Required(),
		edge.From("currency", Currency.Type).
			Ref("investments").
			Unique().Immutable().Required(),

		edge.To("lots", Lot.Type),
	}
}

func (Investment) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
	}
}

func (Investment) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}

// Lot holds the schema definition for the Lot entity.
type Lot struct {
	ent.Schema
}

// Fields of the Lot.
func (Lot) Fields() []ent.Field {
	return []ent.Field{
		field.Time("datetime"),

		field.Float("amount").GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.Postgres: "numeric(36,18)",
			}).
			Annotations(entgql.Type("String")),

		field.Float("price").GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.Postgres: "numeric(36,18)",
			}).
			Annotations(entgql.Type("String")),
	}
}

// Edges of the Lot.
func (Lot) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("investment", Investment.Type).
			Ref("lots").
			Unique().Immutable().Required(),
	}
}

func (Lot) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
	}
}

func (Lot) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}
