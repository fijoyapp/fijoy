package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/mixin"
	fijoy_mixin "fijoy.app/ent/schema/mixin"
	"github.com/shopspring/decimal"
)

// Account holds the schema definition for the Account entity.
type Account struct {
	ent.Schema
}

// Fields of the Account.
func (Account) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").NotEmpty(),
		field.Enum("type").
			Values("liquidity", "investment", "property", "receivable", "liability").
			Immutable(),

		field.Float("balance").GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.Postgres: "numeric(36,18)",
			}).
			Annotations(entgql.Type("String")).
			DefaultFunc(func() decimal.Decimal {
				return decimal.NewFromInt(0)
			}),

		field.String("icon_path").Optional(),

		field.Float("value").GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.Postgres: "numeric(36,18)",
			}).
			Annotations(entgql.Type("String")).
			DefaultFunc(func() decimal.Decimal {
				return decimal.NewFromInt(0)
			}),

		field.Float("fx_rate").GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.Postgres: "numeric(36,18)",
			}).
			Annotations(entgql.Type("String")),
	}
}

// Edges of the Account.
func (Account) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("household", Household.Type).
			Field("household_id").
			Ref("accounts").
			Unique().Immutable().Required(),
		edge.From("currency", Currency.Type).
			Ref("accounts").
			Unique().Immutable().Required(),
		edge.From("user", User.Type).
			Ref("accounts").
			Unique().Required(),

		edge.To("transaction_entries", TransactionEntry.Type),
		edge.To("investments", Investment.Type),
	}
}

func (Account) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.QueryField(),
	}
}

func (Account) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
		fijoy_mixin.HouseholdMixin{},
	}
}
