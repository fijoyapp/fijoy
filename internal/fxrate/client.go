package fxrate

import (
	"context"
	"time"

	"github.com/shopspring/decimal"
)

// ExchangeRateProvider defines the interface for any exchange rate data source.
// Implementations of this interface will fetch exchange rate data from specific APIs.
type ExchangeRateProvider interface {
	GetRate(
		ctx context.Context,
		fromCurrency, toCurrency string,
		datetime time.Time,
	) (decimal.Decimal, error)

	GetRates(
		ctx context.Context,
		fromCurrencies []string,
		toCurrency string,
		datetime time.Time,
	) (map[string]decimal.Decimal, error)
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
func (c *Client) GetRate(
	ctx context.Context,
	fromCurrency, toCurrency string,
	datetime time.Time,
) (decimal.Decimal, error) {
	if fromCurrency == toCurrency {
		return decimal.NewFromInt(1), nil
	}

	return c.provider.GetRate(ctx, fromCurrency, toCurrency, datetime.UTC())
}

// GetRates retrieves exchange rates for multiple fromCurrencies to a single toCurrency.
// Returns a map keyed by fromCurrency. If any fromCurrency == toCurrency, the rate will be 1.0.
func (c *Client) GetRates(
	ctx context.Context,
	fromCurrencies []string,
	toCurrency string,
	datetime time.Time,
) (map[string]decimal.Decimal, error) {
	if len(fromCurrencies) == 0 {
		return make(map[string]decimal.Decimal), nil
	}

	// Filter out same-currency requests
	filteredCurrencies := make([]string, 0, len(fromCurrencies))
	results := make(map[string]decimal.Decimal, len(fromCurrencies))

	for _, fromCurrency := range fromCurrencies {
		if fromCurrency == toCurrency {
			results[fromCurrency] = decimal.NewFromInt(1)
		} else {
			filteredCurrencies = append(filteredCurrencies, fromCurrency)
		}
	}

	if len(filteredCurrencies) == 0 {
		return results, nil
	}

	rates, err := c.provider.GetRates(ctx, filteredCurrencies, toCurrency, datetime.UTC())
	if err != nil {
		return nil, err
	}

	// Merge results
	for currency, rate := range rates {
		results[currency] = rate
	}

	return results, nil
}
