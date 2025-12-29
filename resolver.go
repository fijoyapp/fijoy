package fijoy

import (
	"fijoy.app/ent"
	"fijoy.app/internal/fxrate"
	"fijoy.app/internal/market"
	"github.com/99designs/gqlgen/graphql"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require
// here.

type Resolver struct {
	entClient    *ent.Client
	fxrateClient *fxrate.Client
	marketClient *market.Client
}

// NewSchema creates a graphql executable schema.
func NewSchema(
	entClient *ent.Client,
	fxrateClient *fxrate.Client,
	marketClient *market.Client,
) graphql.ExecutableSchema {
	return NewExecutableSchema(Config{
		Resolvers: &Resolver{entClient, fxrateClient, marketClient},
	})
}
