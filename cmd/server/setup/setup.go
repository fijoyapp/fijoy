package setup

import (
	"context"
	"log/slog"

	"beavermoney.app/ent"
	"beavermoney.app/ent/currency"
	"entgo.io/ent/dialect/sql"
	"github.com/samber/lo"
)

// StandardCurrencies is a list of commonly used currency codes
// that should be available in the database.
var StandardCurrencies = []string{
	// Major currencies
	"USD", // US Dollar
	"EUR", // Euro
	"GBP", // British Pound
	"JPY", // Japanese Yen
	"CNY", // Chinese Yuan
	"CHF", // Swiss Franc
	"CAD", // Canadian Dollar
	"AUD", // Australian Dollar
	"NZD", // New Zealand Dollar
	"SEK", // Swedish Krona
	"NOK", // Norwegian Krone
	"DKK", // Danish Krone
	"SGD", // Singapore Dollar
	"HKD", // Hong Kong Dollar
	"KRW", // South Korean Won
	"INR", // Indian Rupee
	"MXN", // Mexican Peso
	"BRL", // Brazilian Real
	"ZAR", // South African Rand
	"RUB", // Russian Ruble
	"TRY", // Turkish Lira
	"PLN", // Polish Zloty
	"THB", // Thai Baht
	"MYR", // Malaysian Ringgit
	"IDR", // Indonesian Rupiah
	"PHP", // Philippine Peso
	"CZK", // Czech Koruna
	"HUF", // Hungarian Forint
	"ILS", // Israeli Shekel
	"CLP", // Chilean Peso
	"ARS", // Argentine Peso
	"COP", // Colombian Peso
	"PEN", // Peruvian Sol
	"AED", // UAE Dirham
	"SAR", // Saudi Riyal
	"EGP", // Egyptian Pound
	"VND", // Vietnamese Dong
	"PKR", // Pakistani Rupee
	"BDT", // Bangladeshi Taka
	"NGN", // Nigerian Naira
	"KES", // Kenyan Shilling
	"UAH", // Ukrainian Hryvnia
	"TWD", // Taiwan Dollar
}

// Setup initializes the database with required data like currencies.
// It ensures all standard currencies exist in the database.
func Setup(ctx context.Context, client *ent.Client, logger *slog.Logger) error {
	logger.Info("Running database setup")

	if err := setupCurrencies(ctx, client, logger); err != nil {
		return err
	}

	logger.Info("Database setup completed successfully")
	return nil
}

// setupCurrencies ensures all standard currencies exist in the database.
// Uses an upsert pattern to avoid duplicates and be idempotent.
func setupCurrencies(ctx context.Context, client *ent.Client, logger *slog.Logger) error {
	logger.Info("Setting up currencies", "count", len(StandardCurrencies))

	// Deduplicate currency codes to ensure no duplicates
	uniqueCurrencies := lo.Uniq(StandardCurrencies)

	// Batch create/upsert currencies
	bulk := make([]*ent.CurrencyCreate, len(uniqueCurrencies))
	for i, code := range uniqueCurrencies {
		bulk[i] = client.Currency.Create().SetCode(code)
	}

	err := client.Currency.CreateBulk(bulk...).
		OnConflict(
			sql.ConflictColumns(currency.FieldCode),
		).
		Ignore().
		Exec(ctx)
	if err != nil {
		logger.Error("Failed to setup currencies", "error", err)
		return err
	}

	logger.Info("Currencies setup completed", "count", len(uniqueCurrencies))
	return nil
}
