package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/mixin"
)

// Snapshot holds the schema definition for the Snapshot entity.
type Snapshot struct {
	ent.Schema
}

func (Snapshot) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.QueryField(),
	}
}

func (Snapshot) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}

// Fields of the Snapshot.
func (Snapshot) Fields() []ent.Field {
	return []ent.Field{
		field.Text("note").Optional(),
	}
}

// Edges of the Snapshot.
func (Snapshot) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("profile", Profile.Type).Ref("snapshots").
			Unique().
			Required().
			Annotations(
				entgql.Skip(entgql.SkipMutationCreateInput),
				entgql.Skip(entgql.SkipMutationUpdateInput),
			),

		edge.To("snapshot_accounts", SnapshotAccount.Type).
			Annotations(
				entsql.OnDelete(entsql.Cascade),
			),

		edge.To("snapshot_fx_rates", SnapshotFXRate.Type).
			Annotations(
				entsql.OnDelete(entsql.Cascade),
			),
	}
}
