package schema

import (
	"fijoy/constants"

	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/nrednav/cuid2"
	"github.com/shopspring/decimal"
)

// AccountSnapshot holds the schema definition for the AccountSnapshot entity.
type AccountSnapshot struct {
	ent.Schema
}

// Fields of the AccountSnapshot.
func (AccountSnapshot) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").Default(constants.AccountSnapshotPrefix + cuid2.Generate()),

		field.Time("datehour").
			Annotations(
				entsql.DefaultExprs(map[string]string{
					dialect.Postgres: "date_trunc('hour', now())",
				}),
			),
		field.Float("balance").
			GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(38,18)",
				dialect.Postgres: "numeric(38,18)",
			}),
	}
}

// Edges of the AccountSnapshot.
func (AccountSnapshot) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("account", Account.Type).Ref("account_snapshot").Required().Unique(),
	}
}
