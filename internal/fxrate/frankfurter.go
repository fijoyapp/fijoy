package fxrate

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/shopspring/decimal"
)

// FrankfurterProvider implements the ExchangeRateProvider interface for the frankfurter.dev API.
type FrankfurterProvider struct {
	client  *http.Client
	baseURL string
}

// NewFrankfurterProvider creates a new FrankfurterProvider.
func NewFrankfurterProvider(baseURL string) *FrankfurterProvider {
	return &FrankfurterProvider{
		client: &http.Client{
			Timeout: 10 * time.Second,
		},
		baseURL: baseURL,
	}
}

// GetRate fetches the exchange rate from the Frankfurter.dev API.
func (p *FrankfurterProvider) GetRate(
	ctx context.Context,
	fromCurrency, toCurrency string,
	datetime time.Time,
) (decimal.Decimal, error) {
	dateStr := datetime.Format("2006-01-02")
	url := fmt.Sprintf(
		"%s/v1/%s?from=%s&to=%s",
		p.baseURL,
		dateStr,
		fromCurrency,
		toCurrency,
	)

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return decimal.Zero, fmt.Errorf("failed to create request: %w", err)
	}

	resp, err := p.client.Do(req)
	if err != nil {
		return decimal.Zero, fmt.Errorf(
			"failed to fetch exchange rate: %w",
			err,
		)
	}
	defer resp.Body.Close() //nolint:errcheck

	if resp.StatusCode != http.StatusOK {
		return decimal.Zero, fmt.Errorf(
			"unexpected status code: %d",
			resp.StatusCode,
		)
	}

	var data struct {
		Rates map[string]json.Number `json:"rates"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return decimal.Zero, fmt.Errorf("failed to decode response: %w", err)
	}

	rateStr, ok := data.Rates[toCurrency]
	if !ok {
		return decimal.Zero, fmt.Errorf(
			"rate for currency %s not found",
			toCurrency,
		)
	}

	rate, err := decimal.NewFromString(rateStr.String())
	if err != nil {
		return decimal.Zero, fmt.Errorf("failed to parse rate: %w", err)
	}

	return rate, nil
}

// GetRates fetches exchange rates for multiple fromCurrencies to a single toCurrency.
// This is optimized to make a single API call by using inverse rates.
// To get USD->EUR, GBP->EUR, JPY->EUR, we query with base=EUR&symbols=USD,GBP,JPY
// and then invert the results.
func (p *FrankfurterProvider) GetRates(
	ctx context.Context,
	fromCurrencies []string,
	toCurrency string,
	datetime time.Time,
) (map[string]decimal.Decimal, error) {
	if len(fromCurrencies) == 0 {
		return make(map[string]decimal.Decimal), nil
	}

	// If we only have one fromCurrency, use the single GetRate method
	if len(fromCurrencies) == 1 {
		rate, err := p.GetRate(ctx, fromCurrencies[0], toCurrency, datetime)
		if err != nil {
			return nil, err
		}
		return map[string]decimal.Decimal{fromCurrencies[0]: rate}, nil
	}

	// Use base=toCurrency&symbols=fromCurrency1,fromCurrency2,...
	// This gives us toCurrency->fromCurrency rates, which we then invert
	dateStr := datetime.Format("2006-01-02")
	fromCurrenciesStr := joinCurrencies(fromCurrencies)
	url := fmt.Sprintf(
		"%s/v1/%s?base=%s&symbols=%s",
		p.baseURL,
		dateStr,
		toCurrency,
		fromCurrenciesStr,
	)

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	resp, err := p.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch exchange rate: %w", err)
	}
	defer resp.Body.Close() //nolint:errcheck

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var data struct {
		Rates map[string]json.Number `json:"rates"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	results := make(map[string]decimal.Decimal, len(fromCurrencies))

	// Invert rates: we got toCurrency->fromCurrency, need fromCurrency->toCurrency
	for _, fromCurrency := range fromCurrencies {
		rateStr, ok := data.Rates[fromCurrency]
		if !ok {
			return nil, fmt.Errorf(
				"rate for currency %s not found",
				fromCurrency,
			)
		}

		rate, err := decimal.NewFromString(rateStr.String())
		if err != nil {
			return nil, fmt.Errorf("failed to parse rate: %w", err)
		}

		// Invert: if EUR->USD is 1.2, then USD->EUR is 1/1.2
		if rate.IsZero() {
			return nil, fmt.Errorf(
				"invalid rate (zero) for currency %s",
				fromCurrency,
			)
		}
		results[fromCurrency] = decimal.NewFromInt(1).Div(rate)
	}

	return results, nil
}

// joinCurrencies joins currency codes with commas.
func joinCurrencies(currencies []string) string {
	return strings.Join(currencies, ",")
}
