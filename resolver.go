package beavermoney

import (
	"log/slog"

	"beavermoney.app/ent"
	"beavermoney.app/internal/fxrate"
	"beavermoney.app/internal/market"
	"github.com/99designs/gqlgen/graphql"
	"github.com/getsentry/sentry-go"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require
// here.

type Resolver struct {
	logger       *slog.Logger
	entClient    *ent.Client
	fxrateClient *fxrate.Client
	marketClient *market.Client
	meter        sentry.Meter
}

// NewSchema creates a graphql executable schema.
func NewSchema(
	logger *slog.Logger,
	entClient *ent.Client,
	fxrateClient *fxrate.Client,
	marketClient *market.Client,
	meter sentry.Meter,
) graphql.ExecutableSchema {
	return NewExecutableSchema(Config{
		Resolvers: &Resolver{
			logger,
			entClient,
			fxrateClient,
			marketClient,
			meter,
		},
	})
}
