package main

import (
	"context"
	"log"

	"fijoy.app/ent"
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
}
