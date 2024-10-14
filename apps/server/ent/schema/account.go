package schema

import (
	"fijoy/constants"
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/nrednav/cuid2"
	"github.com/shopspring/decimal"
)

// Account holds the schema definition for the Account entity.
type Account struct {
	ent.Schema
}

// Fields of the Account.
func (Account) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").DefaultFunc(func() string { return constants.AccountPrefix + cuid2.Generate() }),

		field.String("name").NotEmpty(),
		field.Enum("account_type").
			Values("liquidity", "investment", "property", "receivable", "liability"),

		field.Bool("archived").Default(false),
		field.Bool("include_in_stats").Default(true),
		field.Bool("include_in_charts").Default(true),

		field.String("symbol").NotEmpty(),
		field.Enum("symbol_type").Values("currency", "stock", "crypto"),

		field.Float("amount").
			GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(38,18)",
				dialect.Postgres: "numeric(38,18)",
			}),
		field.Float("value").
			GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,10)",
				dialect.Postgres: "numeric(18,10)",
			}),
		field.Float("fx_rate").
			GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,10)",
				dialect.Postgres: "numeric(18,10)",
			}).Optional(),
		field.Float("balance").
			GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(38,18)",
				dialect.Postgres: "numeric(38,18)",
			}),

		field.Time("created_at").Default(time.Now),
		field.Time("updated_at").Default(time.Now),
	}
}

// Edges of the Account.
func (Account) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("profile", Profile.Type).Ref("account").Required().Unique(),

		edge.To("account_snapshot", AccountSnapshot.Type),
		edge.To("transaction", Transaction.Type),
	}
}
