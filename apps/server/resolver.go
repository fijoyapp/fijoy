// Package fijoy contains the GraphQL resolvers and schema for the Fijoy application.
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
	client            *ent.Client
	authConfig        *config.AuthConfig
	marketDataService market.MarketDataService
}

func NewSchema(client *ent.Client, authConfig *config.AuthConfig, marketDataService market.MarketDataService) graphql.ExecutableSchema {
	return NewExecutableSchema(Config{
		Resolvers: &Resolver{
			client,
			authConfig,
			marketDataService,
		},
	})
}
