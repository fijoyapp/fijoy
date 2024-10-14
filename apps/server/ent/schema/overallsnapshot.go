package schema

import (
	"fijoy/constants"

	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"github.com/nrednav/cuid2"
	"github.com/shopspring/decimal"
)

// OverallSnapshot holds the schema definition for the OverallSnapshot entity.
type OverallSnapshot struct {
	ent.Schema
}

// Fields of the OverallSnapshot.
func (OverallSnapshot) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").DefaultFunc(func() string { return constants.OverallSnapshotPrefix + cuid2.Generate() }),

		field.Time("datehour").
			Annotations(
				entsql.DefaultExprs(map[string]string{
					dialect.Postgres: "date_trunc('hour', now())",
				}),
			),

		field.Float("liquidity").
			GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(38,18)",
				dialect.Postgres: "numeric(38,18)",
			}),
		field.Float("investment").
			GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(38,18)",
				dialect.Postgres: "numeric(38,18)",
			}),
		field.Float("property").
			GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(38,18)",
				dialect.Postgres: "numeric(38,18)",
			}),
		field.Float("receivable").
			GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(38,18)",
				dialect.Postgres: "numeric(38,18)",
			}),
		field.Float("liability").
			GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(38,18)",
				dialect.Postgres: "numeric(38,18)",
			}),
	}
}

// Edges of the OverallSnapshot.
func (OverallSnapshot) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("profile", Profile.Type).Ref("overall_snapshot").Required().Unique(),
	}
}

func (OverallSnapshot) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("datehour").Edges("profile").Unique(),
	}
}
