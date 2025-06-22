package fijoy

import (
	"fijoy/config"
	"fijoy/ent"
	"fijoy/internal/util/market"

	"github.com/99designs/gqlgen/graphql"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	client           *ent.Client
	authConfig       *config.AuthConfig
	marketDataClient market.MarketDataClient
}

func NewSchema(client *ent.Client, authConfig *config.AuthConfig, marketDataClient market.MarketDataClient) graphql.ExecutableSchema {
	return NewExecutableSchema(Config{
		Resolvers: &Resolver{
			client,
			authConfig,
			marketDataClient,
		},
	})
}
