package fxrate

import (
	"context"
	"time"

	"github.com/shopspring/decimal"
)

// ExchangeRateProvider defines the interface for any exchange rate data source.
// Implementations of this interface will fetch exchange rate data from specific APIs.
type ExchangeRateProvider interface {
	GetRate(ctx context.Context, fromCurrency, toCurrency string, date time.Time) (decimal.Decimal, error)
}

// Client provides an API-agnostic way to retrieve exchange rates.
type Client struct {
	provider ExchangeRateProvider
}

// NewClient creates a new exchange rate client with the given provider.
func NewClient(provider ExchangeRateProvider) *Client {
	return &Client{
		provider: provider,
	}
}

// GetRate retrieves the exchange rate for a given currency pair and date using the configured provider.
func (c *Client) GetRate(ctx context.Context, fromCurrency, toCurrency string, date time.Time) (decimal.Decimal, error) {
	return c.provider.GetRate(ctx, fromCurrency, toCurrency, date)
}
