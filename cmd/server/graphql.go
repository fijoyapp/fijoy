package main

import (
	"context"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	gqlgen_opentelemetry "github.com/zhevron/gqlgen-opentelemetry"
)

func newGraphQLHandler(schema graphql.ExecutableSchema) *handler.Server {
	server := handler.NewDefaultServer(schema)
	server.Use(operationTracer{})
	return server
}

type operationTracer struct {
	gqlgen_opentelemetry.Tracer
}

func (t operationTracer) InterceptResponse(ctx context.Context, next graphql.ResponseHandler) *graphql.Response {
	// APQ misses and validation errors have a context but no parsed operation.
	// The upstream tracer dereferences Operation without checking it.
	if !graphql.HasOperationContext(ctx) || graphql.GetOperationContext(ctx).Operation == nil {
		return next(ctx)
	}
	return t.Tracer.InterceptResponse(ctx, next)
}
