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

// SnapshotFXRate holds the schema definition for the SnapshotFXRate entity.
type SnapshotFXRate struct {
	ent.Schema
}

func (SnapshotFXRate) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.QueryField(),
	}
}

func (SnapshotFXRate) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}

// Fields of the SnapshotFXRate.
func (SnapshotFXRate) Fields() []ent.Field {
	return []ent.Field{
		field.Text("from_currency").Immutable(),
		field.Text("to_currency").Immutable(),

		field.Float("fx_rate").
			GoType(decimal.Decimal{}).
			Immutable().
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(18,10)",
				dialect.Postgres: "numeric(18,10)",
			}).
			Annotations(
				entgql.Type("String"),
				entgql.Skip(entgql.SkipMutationCreateInput),
				entgql.Skip(entgql.SkipMutationUpdateInput),
			).
			Comment("The exchange rate from the native currency to user's default display currency"),
	}
}

// Edges of the SnapshotFXRate.
func (SnapshotFXRate) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("snapshot", Snapshot.Type).Ref("snapshot_fx_rates").
			Unique().
			Required().
			Immutable().
			Annotations(
				entgql.Skip(entgql.SkipMutationCreateInput),
				entgql.Skip(entgql.SkipMutationUpdateInput),
			),
	}
}
