package seed

import (
	"context"
	"log/slog"

	"beavermoney.app/ent"
)

// Setup initializes the database with required data like currencies.
// It ensures all standard currencies exist in the database.
func Setup(
	ctx context.Context,
	client *ent.Client,
	logger *slog.Logger,
) error {
	logger.Info("Running database setup")

	if err := setupCurrencies(ctx, client, logger); err != nil {
		return err
	}

	logger.Info("Database setup completed successfully")
	return nil
}
