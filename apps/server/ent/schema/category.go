package schema

//
// import (
// 	"entgo.io/contrib/entgql"
// 	"entgo.io/ent"
// 	"entgo.io/ent/schema"
// 	"entgo.io/ent/schema/edge"
// 	"entgo.io/ent/schema/field"
// 	"entgo.io/ent/schema/mixin"
// )
//
// // Category holds the schema definition for the Category entity.
// type Category struct {
// 	ent.Schema
// }
//
// func (Category) Annotations() []schema.Annotation {
// 	return []schema.Annotation{
// 		entgql.QueryField(),
// 		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
// 	}
// }
//
// func (Category) Mixin() []ent.Mixin {
// 	return []ent.Mixin{
// 		mixin.Time{},
// 	}
// }
//
// // Fields of the Category.
// func (Category) Fields() []ent.Field {
// 	return []ent.Field{
// 		field.String("name").NotEmpty(),
//
// 		field.Enum("category_type").
// 			Values("expense", "income", "transfer", "sync", "init").
// 			Immutable(),
// 	}
// }
//
// // Edges of the Category.
// func (Category) Edges() []ent.Edge {
// 	return []ent.Edge{
// 		edge.From("profile", Profile.Type).Ref("categories").
// 			Unique().
// 			Required().
// 			Annotations(
// 				entgql.Skip(entgql.SkipMutationCreateInput),
// 				entgql.Skip(entgql.SkipMutationUpdateInput),
// 			),
//
// 		edge.To("transactions", Transaction.Type),
// 	}
// }
