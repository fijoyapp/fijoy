package schema

import (
	"fijoy/constants"
	"time"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/nrednav/cuid2"
	"github.com/shopspring/decimal"
)

// Profile holds the schema definition for the Profile entity.
type Profile struct {
	ent.Schema
}

func (Profile) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate()),
	}
}

// Fields of the Profile.
func (Profile) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").DefaultFunc(func() string { return constants.ProfilePrefix + cuid2.Generate() }),

		field.String("locale").Optional(),
		field.String("currencies"),

		field.Float("net_worth_goal").
			GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(36,18)",
				dialect.Postgres: "numeric(36,18)",
			}).
			Annotations(entgql.Type("String")),

		field.Time("created_at").Default(time.Now).Annotations(
			entsql.Default("CURRENT_TIMESTAMP"),
		),
		field.Time("updated_at").Default(time.Now).Annotations(
			entsql.Default("CURRENT_TIMESTAMP"),
		),
	}
}

// Edges of the Profile.
func (Profile) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).Ref("profile").Unique().Required(),
		edge.To("account", Account.Type),
		edge.To("transaction", Transaction.Type),
	}
}
