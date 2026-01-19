package database

import (
	"database/sql"
	"log/slog"

	"beavermoney.app/ent"
	"entgo.io/ent/dialect"
	entsql "entgo.io/ent/dialect/sql"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/jackc/pgx/v5/stdlib"
)

// Connect opens a database connection and returns an ent client along with the underlying sql.DB.
func Connect(postgresURL string) (*ent.Client, *sql.DB, error) {
	db, err := sql.Open("pgx", postgresURL)
	if err != nil {
		return nil, nil, err
	}

	drv := entsql.OpenDB(dialect.Postgres, db)
	entClient := ent.NewClient(ent.Driver(drv))

	return entClient, db, nil
}

// Migrate runs database migrations from the migrations directory.
func Migrate(db *sql.DB, logger *slog.Logger) error {
	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		return err
	}

	m, err := migrate.NewWithDatabaseInstance(
		"file://ent/migrate/migrations",
		"postgres", driver)
	if err != nil {
		return err
	}

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		logger.Error("migration failed", slog.String("error", err.Error()))
		return err
	}

	logger.Info("database migrated successfully")
	return nil
}
