package main

import (
	"context"
	"log"
	"net/http"

	"fijoy.app"
	"fijoy.app/ent"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	// TODO: Switch to Postgres later
	client, err := ent.Open(
		"sqlite3",
		"file:ent?mode=memory&cache=shared&_fk=1",
	)
	if err != nil {
		log.Fatalf("failed opening connection to sqlite: %v", err)
	}
	defer client.Close()

	// Run the auto migration tool.
	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	log.Println("migration completed successfully")

	srv := handler.NewDefaultServer(
		fijoy.NewExecutableSchema(
			fijoy.Config{Resolvers: &fijoy.Resolver{}},
		),
	)

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Handle("/", playground.Handler("GraphQL playground", "/query"))
	r.Handle("/query", srv)
	http.ListenAndServe(":3000", r)
}
