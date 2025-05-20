package fijoy

import (
	"fijoy/config"
	"fijoy/ent"

	"github.com/99designs/gqlgen/graphql"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	client     *ent.Client
	authConfig *config.AuthConfig
}

func NewSchema(client *ent.Client, authConfig *config.AuthConfig) graphql.ExecutableSchema {
	return NewExecutableSchema(Config{
		Resolvers: &Resolver{
			client,
			authConfig,
		},
	})
}
