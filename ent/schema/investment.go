package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/mixin"
	beavermoney_mixin "beavermoney.app/ent/schema/mixin"
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
			Annotations(entgql.Type("String")).
			DefaultFunc(func() decimal.Decimal {
				return decimal.NewFromInt(0)
			}),

		field.Float("quote").GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.Postgres: "numeric(36,18)",
			}).
			Annotations(
				entgql.Type("String"),
				entgql.Skip(
					entgql.SkipMutationCreateInput,
					entgql.SkipMutationUpdateInput,
				),
			),
		field.Float("value").GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.Postgres: "numeric(36,18)",
			}).
			Annotations(
				entgql.Type("String"),
				entgql.Skip(
					entgql.SkipMutationCreateInput,
					entgql.SkipMutationUpdateInput,
				),
			).
			DefaultFunc(func() decimal.Decimal {
				return decimal.NewFromInt(0)
			}),
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
			Field("household_id").
			Unique().
			Immutable().
			Annotations(
				entgql.Skip(
					entgql.SkipMutationCreateInput,
					entgql.SkipMutationUpdateInput,
				),
			).
			Required(),
		edge.From("currency", Currency.Type).
			Ref("investments").
			Annotations(
				entgql.Skip(
					entgql.SkipMutationCreateInput,
					entgql.SkipMutationUpdateInput,
				),
			).
			Unique().
			Immutable().
			Required(),

		edge.To("lots", Lot.Type).
			Annotations(
				entgql.Skip(
					entgql.SkipMutationCreateInput,
					entgql.SkipMutationUpdateInput,
				),
			),
	}
}

func (Investment) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.QueryField(),
		entgql.RelayConnection(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
	}
}

func (Investment) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.AnnotateFields(mixin.Time{},
			entgql.Skip(
				entgql.SkipMutationCreateInput,
				entgql.SkipMutationUpdateInput,
			),
		),
		beavermoney_mixin.HouseholdMixin{},
	}
}

// Lot holds the schema definition for the Lot entity.
type Lot struct {
	ent.Schema
}

// Fields of the Lot.
func (Lot) Fields() []ent.Field {
	return []ent.Field{
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
		edge.From("household", Household.Type).
			Ref("lots").
			Field("household_id").
			Unique().
			Immutable().
			Annotations(
				entgql.Skip(
					entgql.SkipMutationCreateInput,
					entgql.SkipMutationUpdateInput,
				),
			).
			Required(),
		edge.From("investment", Investment.Type).
			Ref("lots").
			Unique().Immutable().Required(),
		edge.From("transaction", Transaction.Type).Ref("lots").
			Unique().Immutable().Required(),
	}
}

func (Lot) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
	}
}

func (Lot) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.AnnotateFields(mixin.Time{},
			entgql.Skip(
				entgql.SkipMutationCreateInput,
				entgql.SkipMutationUpdateInput,
			),
		),
		beavermoney_mixin.HouseholdMixin{},
	}
}
