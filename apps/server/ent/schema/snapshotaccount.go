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

// SnapshotAccount holds the schema definition for the SnapshotAccount entity.
type SnapshotAccount struct {
	ent.Schema
}

func (SnapshotAccount) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.QueryField(),
	}
}

func (SnapshotAccount) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}

// Fields of the SnapshotAccount.
func (SnapshotAccount) Fields() []ent.Field {
	return []ent.Field{
		field.Float("amount").
			GoType(decimal.Decimal{}).
			Immutable().
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(36,18)",
				dialect.Postgres: "numeric(36,18)",
			}).
			Annotations(entgql.Type("String")).
			Comment("The unit amount of share or money in this account"),

		field.Float("value").
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
			Comment("The value of 1 share in the native currency. If this is just a currency account, then this field will be 1"),

		field.Float("balance").
			GoType(decimal.Decimal{}).
			Immutable().
			SchemaType(map[string]string{
				dialect.MySQL:    "decimal(36,18)",
				dialect.Postgres: "numeric(36,18)",
			}).
			Annotations(
				entgql.Type("String"),
				entgql.Skip(entgql.SkipMutationCreateInput),
				entgql.Skip(entgql.SkipMutationUpdateInput),
			).
			Comment("The total balance of this account its currency"),
	}
}

// Edges of the SnapshotAccount.
func (SnapshotAccount) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("account", Account.Type).Ref("snapshot_accounts").
			Unique().
			Required().
			Immutable().
			Annotations(
				entgql.Skip(entgql.SkipMutationCreateInput),
				entgql.Skip(entgql.SkipMutationUpdateInput),
			),

		edge.From("snapshot", Snapshot.Type).Ref("snapshot_accounts").
			Unique().
			Required().
			Immutable().
			Annotations(
				entgql.Skip(entgql.SkipMutationCreateInput),
				entgql.Skip(entgql.SkipMutationUpdateInput),
			),
	}
}
