package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"entgo.io/ent/schema/mixin"
	"github.com/shopspring/decimal"
)

// FXRateCache holds the schema definition for the FXRateCache entity.
type FXRateCache struct {
	ent.Schema
}

// Fields of the FXRateCache.
func (FXRateCache) Fields() []ent.Field {
	return []ent.Field{
		field.Int("from_currency_id"),
		field.Int("to_currency_id"),
		field.Float("value").GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.Postgres: "numeric(36,18)",
			}),
		field.Time("date").SchemaType(map[string]string{
			dialect.Postgres: "date",
		}),
	}
}

// Edges of the FXRateCache.
func (FXRateCache) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("from_currency", Currency.Type).
			Ref("fx_rate_caches_from").
			Field("from_currency_id").
			Required().Unique(),
		edge.From("to_currency", Currency.Type).
			Ref("fx_rate_caches_to").
			Field("to_currency_id").Required().Unique(),
	}
}

// Edges of the FXRateCache.
func (FXRateCache) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("from_currency_id", "to_currency_id", "date").Unique(),
	}
}

func (FXRateCache) Annotations() []schema.Annotation {
	return []schema.Annotation{}
}

func (FXRateCache) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}

// StockQuoteCache holds the schema definition for the StockQuoteCache entity.
type StockQuoteCache struct {
	ent.Schema
}

// Fields of the StockQuoteCache.
func (StockQuoteCache) Fields() []ent.Field {
	return []ent.Field{
		field.String("symbol").NotEmpty(),
		field.Float("value").GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.Postgres: "numeric(36,18)",
			}),
		field.Time("date").SchemaType(map[string]string{
			dialect.Postgres: "date",
		}),
	}
}

// Edges of the StockQuoteCache.
func (StockQuoteCache) Edges() []ent.Edge {
	return []ent.Edge{}
}

// Edges of the StockQuoteCache.
func (StockQuoteCache) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("symbol", "date").Unique(),
	}
}

func (StockQuoteCache) Annotations() []schema.Annotation {
	return []schema.Annotation{}
}

func (StockQuoteCache) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}

// CryptoQuoteCache holds the schema definition for the CryptoQuoteCache entity.
type CryptoQuoteCache struct {
	ent.Schema
}

// Fields of the CryptoQuoteCache.
func (CryptoQuoteCache) Fields() []ent.Field {
	return []ent.Field{
		field.String("symbol").NotEmpty(),
		field.Float("value").GoType(decimal.Decimal{}).
			SchemaType(map[string]string{
				dialect.Postgres: "numeric(36,18)",
			}),
		field.Time("date").SchemaType(map[string]string{
			dialect.Postgres: "date",
		}),
	}
}

// Edges of the CryptoQuoteCache.
func (CryptoQuoteCache) Edges() []ent.Edge {
	return []ent.Edge{}
}

// Edges of the CryptoQuoteCache.
func (CryptoQuoteCache) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("symbol", "date").Unique(),
	}
}

func (CryptoQuoteCache) Annotations() []schema.Annotation {
	return []schema.Annotation{}
}

func (CryptoQuoteCache) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}
