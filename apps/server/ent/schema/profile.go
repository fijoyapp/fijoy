package schema

import (
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

// Profile holds the schema definition for the Profile entity.
type Profile struct {
	ent.Schema
}

func (Profile) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
	}
}

func (Profile) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}

// Fields of the Profile.
func (Profile) Fields() []ent.Field {
	return []ent.Field{
		field.String("name"),
		field.String("locale").
			Annotations(
				entgql.Skip(entgql.SkipMutationCreateInput),
				entgql.Skip(entgql.SkipMutationUpdateInput),
			),
		field.JSON("currencies", []string{}),

		field.Float("net_worth_goal").
			GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(36,18)",
				dialect.Postgres: "numeric(36,18)",
			}).
			Annotations(entgql.Type("String")),
	}
}

// Edges of the Profile.
func (Profile) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("users", User.Type).Ref("profiles").
			Through("user_profiles", UserProfile.Type).
			Annotations(
				entgql.Skip(entgql.SkipMutationCreateInput),
				entgql.Skip(entgql.SkipMutationUpdateInput),
			),

		edge.To("accounts", Account.Type).
			Annotations(
				entsql.OnDelete(entsql.Cascade),
			),
		edge.To("transactions", Transaction.Type).
			Annotations(
				entsql.OnDelete(entsql.Cascade),
			),
		edge.To("snapshots", Snapshot.Type).
			Annotations(
				entsql.OnDelete(entsql.Cascade),
			),
		// edge.To("categories", Category.Type).
		// 	Annotations(
		// 		entsql.OnDelete(entsql.Cascade),
		// 	),
	}
}
