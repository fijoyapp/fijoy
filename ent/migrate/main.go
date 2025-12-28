//go:build ignore

package main

import (
	"context"
	"log"
	"os"

	"fijoy.app/ent/migrate"

	"ariga.io/atlas/sql/sqltool"
	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql/schema"

	_ "github.com/lib/pq"
)

func main() {
	ctx := context.Background()
	// Create a local migration directory able to understand golang-migrate migration file format for replay.
	dir, err := sqltool.NewGolangMigrateDir("ent/migrate/migrations")
	if err != nil {
		log.Fatalf("failed creating atlas migration directory: %v", err)
	}
	// Migrate diff options.
	opts := []schema.MigrateOption{
		schema.WithDropColumn(true), // allow dropping columns
		schema.WithDropIndex(true),  // allow dropping indexes
		schema.WithDir(
			dir,
		), // provide migration directory
		schema.WithMigrationMode(schema.ModeReplay), // provide migration mode
		schema.WithDialect(dialect.Postgres),        // Ent dialect to use
	}
	if len(os.Args) != 2 {
		log.Fatalln(
			"migration name is required. Use: 'go run -mod=mod ent/migrate/main.go <name>'",
		)
	}
	// Generate migrations using Atlas support for MySQL (note the Ent dialect option passed above).
	err = migrate.NamedDiff(
		ctx,
		// TODO: DO NOT HARDCODE
		"postgresql://user:password@localhost:2345/fijoy-migration?sslmode=disable",
		os.Args[1],
		opts...)
	if err != nil {
		log.Fatalf("failed generating migration file: %v", err)
	}
}
