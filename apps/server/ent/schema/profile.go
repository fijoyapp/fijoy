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

// Profile holds the schema definition for the Profile entity.
type Profile struct {
	ent.Schema
}

// Fields of the Profile.
func (Profile) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").Default(constants.ProfilePrefix + cuid2.Generate()),

		field.String("locale").Optional(),
		field.String("currencies"),

		field.Float("net_worth_goal").
			GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(38,18)",
				dialect.Postgres: "numeric(38,18)",
			}),

		field.Time("created_at").Default(time.Now),
	}
}

// Edges of the Profile.
func (Profile) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).Ref("profile").Unique().Required(),
		edge.To("account", Account.Type),
		edge.To("transaction", Transaction.Type),
		edge.To("overall_snapshot", OverallSnapshot.Type),
	}
}