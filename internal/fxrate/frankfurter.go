package fxrate

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
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
		"%s/%s?from=%s&to=%s",
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
