package market

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/shopspring/decimal"
)

// EODHDProvider implements the MarketProvider interface using EODHD API.
// EODHD (End of Day Historical Data) provides real-time and historical
// financial data for stocks, ETFs, mutual funds, bonds, and cryptocurrencies.
type EODHDProvider struct {
	apiKey  string
	client  *http.Client
	baseURL string
}

// NewEODHDProvider creates a new EODHD provider with the given API key.
func NewEODHDProvider(apiKey string) *EODHDProvider {
	return &EODHDProvider{
		apiKey: apiKey,
		client: &http.Client{
			Timeout: 10 * time.Second,
		},
		baseURL: "https://eodhd.com/api",
	}
}

// eodhdRealTimeResponse represents the JSON response from EODHD real-time API.
type eodhdRealTimeResponse struct {
	Code      string  `json:"code"`
	Timestamp int64   `json:"timestamp"`
	Gmtoffset int     `json:"gmtoffset"`
	Open      float64 `json:"open"`
	High      float64 `json:"high"`
	Low       float64 `json:"low"`
	Close     float64 `json:"close"`
	Volume    int64   `json:"volume"`
	// PreviousClose is the adjusted close price from the previous trading day
	PreviousClose float64 `json:"previousClose"`
	// Change is the price change in absolute terms
	Change float64 `json:"change"`
	// ChangeP is the price change in percentage
	ChangeP float64 `json:"change_p"`
}

// eodhdSearchResponse represents the JSON response from EODHD search API.
type eodhdSearchResponse []struct {
	Code     string `json:"Code"`
	Name     string `json:"Name"`
	Country  string `json:"Country"`
	Exchange string `json:"Exchange"`
	Currency string `json:"Currency"`
	Type     string `json:"Type"`
}

// eodhdHistoricalDataPoint represents a single historical data point from EODHD API.
type eodhdHistoricalDataPoint struct {
	Date          string  `json:"date"`
	Open          float64 `json:"open"`
	High          float64 `json:"high"`
	Low           float64 `json:"low"`
	Close         float64 `json:"close"`
	AdjustedClose float64 `json:"adjusted_close"`
	Volume        int64   `json:"volume"`
}

func (p *EODHDProvider) StockQuote(
	ctx context.Context,
	symbol string,
) (*StockQuoteResult, error) {
	// EODHD requires the exchange code appended to the symbol (e.g., AAPL.US)
	// If the symbol doesn't contain a dot, assume it's a US stock
	if !strings.Contains(symbol, ".") {
		symbol = symbol + ".US"
	}

	// First, get the real-time quote
	url := fmt.Sprintf(
		"%s/real-time/%s?api_token=%s&fmt=json",
		p.baseURL,
		symbol,
		p.apiKey,
	)

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	resp, err := p.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch stock quote: %w", err)
	}
	defer resp.Body.Close() //nolint:errcheck

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("EODHD API returned status %d", resp.StatusCode)
	}

	var rtData eodhdRealTimeResponse
	if err := json.NewDecoder(resp.Body).Decode(&rtData); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	// Get additional metadata from search API
	searchURL := fmt.Sprintf(
		"%s/search/%s?api_token=%s&limit=1",
		p.baseURL,
		strings.Split(symbol, ".")[0],
		p.apiKey,
	)

	searchReq, err := http.NewRequestWithContext(
		ctx,
		http.MethodGet,
		searchURL,
		nil,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create search request: %w", err)
	}

	searchResp, err := p.client.Do(searchReq)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch stock metadata: %w", err)
	}
	defer searchResp.Body.Close() //nolint:errcheck

	var searchData eodhdSearchResponse
	var name, exchange, currency string

	if searchResp.StatusCode == http.StatusOK {
		if err := json.NewDecoder(searchResp.Body).Decode(&searchData); err == nil &&
			len(searchData) > 0 {
			name = searchData[0].Name
			exchange = searchData[0].Exchange
			currency = searchData[0].Currency
		}
	}

	// Fallback if search didn't return data
	if name == "" {
		name = rtData.Code
	}
	if exchange == "" {
		parts := strings.Split(symbol, ".")
		if len(parts) > 1 {
			exchange = parts[1]
		}
	}
	if currency == "" {
		currency = "USD" // Default to USD
	}

	return &StockQuoteResult{
		Symbol:       rtData.Code,
		Name:         name,
		Exchange:     exchange,
		Currency:     currency,
		CurrentPrice: decimal.NewFromFloat(rtData.Close),
	}, nil
}

func (p *EODHDProvider) CryptoQuote(
	ctx context.Context,
	symbol string,
) (*CryptoQuoteResult, error) {
	// EODHD crypto symbols are formatted as BTC-USD.CC
	// If the symbol doesn't end with .CC, format it appropriately
	if !strings.HasSuffix(symbol, ".CC") {
		// Assume the symbol is like "BTC-USD" or just "BTC"
		if !strings.Contains(symbol, "-") {
			symbol = symbol + "-USD"
		}
		symbol = symbol + ".CC"
	}

	url := fmt.Sprintf(
		"%s/real-time/%s?api_token=%s&fmt=json",
		p.baseURL,
		symbol,
		p.apiKey,
	)

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	resp, err := p.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch crypto quote: %w", err)
	}
	defer resp.Body.Close() //nolint:errcheck

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("EODHD API returned status %d", resp.StatusCode)
	}

	var rtData eodhdRealTimeResponse
	if err := json.NewDecoder(resp.Body).Decode(&rtData); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	// Extract base symbol and quote currency from the code (e.g., "BTC-USD")
	parts := strings.Split(strings.TrimSuffix(rtData.Code, ".CC"), "-")
	baseCurrency := parts[0]
	quoteCurrency := "USD"
	if len(parts) > 1 {
		quoteCurrency = parts[1]
	}

	return &CryptoQuoteResult{
		Symbol:       baseCurrency,
		Name:         baseCurrency,
		Exchange:     "Crypto",
		Currency:     quoteCurrency,
		CurrentPrice: decimal.NewFromFloat(rtData.Close),
	}, nil
}

func (p *EODHDProvider) StockQuotes(
	ctx context.Context,
	symbols []string,
) (map[string]*StockQuoteResult, error) {
	if len(symbols) == 0 {
		return make(map[string]*StockQuoteResult), nil
	}

	// EODHD doesn't have a batch API for real-time quotes,
	// so we need to fetch them individually
	results := make(map[string]*StockQuoteResult, len(symbols))

	for _, symbol := range symbols {
		quote, err := p.StockQuote(ctx, symbol)
		if err != nil {
			// Skip symbols that fail, but continue processing others
			continue
		}
		results[symbol] = quote
	}

	return results, nil
}

func (p *EODHDProvider) CryptoQuotes(
	ctx context.Context,
	symbols []string,
) (map[string]*CryptoQuoteResult, error) {
	if len(symbols) == 0 {
		return make(map[string]*CryptoQuoteResult), nil
	}

	// EODHD doesn't have a batch API for real-time quotes,
	// so we need to fetch them individually
	results := make(map[string]*CryptoQuoteResult, len(symbols))

	for _, symbol := range symbols {
		quote, err := p.CryptoQuote(ctx, symbol)
		if err != nil {
			// Skip symbols that fail, but continue processing others
			continue
		}
		results[symbol] = quote
	}

	return results, nil
}

// HistoricalQuote fetches historical price data for a symbol.
// Period: 'd' for daily, 'w' for weekly, 'm' for monthly.
// Date format: YYYY-MM-DD for from and to parameters.
func (p *EODHDProvider) HistoricalQuote(
	ctx context.Context,
	symbol string,
	period string,
	from time.Time,
	to time.Time,
	isStock bool,
) (*HistoricalQuoteResult, error) {
	// Validate period
	if period != "d" && period != "w" && period != "m" {
		return nil, fmt.Errorf(
			"invalid period: %s (must be 'd', 'w', or 'm')",
			period,
		)
	}

	// EODHD requires the exchange code appended to the symbol
	// For stocks: AAPL.US
	// For crypto: BTC-USD.CC
	originalSymbol := symbol
	if isStock {
		// Stock symbol
		if !strings.Contains(symbol, ".") {
			symbol = symbol + ".US"
		}
	} else {
		// Crypto symbol
		if !strings.HasSuffix(symbol, ".CC") {
			// Assume the symbol is like "BTC-USD" or just "BTC"
			if !strings.Contains(symbol, "-") {
				symbol = symbol + "-USD"
			}
			symbol = symbol + ".CC"
		}
	}

	// Format dates as YYYY-MM-DD
	fromStr := from.Format("2006-01-02")
	toStr := to.Format("2006-01-02")

	// Build the URL for historical data
	url := fmt.Sprintf(
		"%s/eod/%s?api_token=%s&fmt=json&period=%s&from=%s&to=%s",
		p.baseURL,
		symbol,
		p.apiKey,
		period,
		fromStr,
		toStr,
	)

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	resp, err := p.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch historical data: %w", err)
	}
	defer resp.Body.Close() //nolint:errcheck

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("EODHD API returned status %d", resp.StatusCode)
	}

	var histData []eodhdHistoricalDataPoint
	if err := json.NewDecoder(resp.Body).Decode(&histData); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	// Convert to our format
	dataPoints := make([]HistoricalDataPoint, 0, len(histData))
	for _, point := range histData {
		// Parse the date string (format: "YYYY-MM-DD")
		date, err := time.Parse("2006-01-02", point.Date)
		if err != nil {
			return nil, fmt.Errorf(
				"failed to parse date %s: %w",
				point.Date,
				err,
			)
		}

		// Use adjusted_close as the close price (adjusted for splits and dividends)
		dataPoints = append(dataPoints, HistoricalDataPoint{
			Date:  date,
			Close: decimal.NewFromFloat(point.AdjustedClose),
		})
	}

	// Get metadata from search API
	searchSymbol := strings.Split(symbol, ".")[0]
	if !isStock {
		// For crypto, remove the .CC and use the base symbol
		searchSymbol = strings.Split(strings.TrimSuffix(symbol, ".CC"), "-")[0]
	}

	searchURL := fmt.Sprintf(
		"%s/search/%s?api_token=%s&limit=1",
		p.baseURL,
		searchSymbol,
		p.apiKey,
	)

	searchReq, err := http.NewRequestWithContext(
		ctx,
		http.MethodGet,
		searchURL,
		nil,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create search request: %w", err)
	}

	searchResp, err := p.client.Do(searchReq)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch metadata: %w", err)
	}
	defer searchResp.Body.Close() //nolint:errcheck

	var searchData eodhdSearchResponse
	var name, exchange, currency string

	if searchResp.StatusCode == http.StatusOK {
		if err := json.NewDecoder(searchResp.Body).Decode(&searchData); err == nil &&
			len(searchData) > 0 {
			name = searchData[0].Name
			exchange = searchData[0].Exchange
			currency = searchData[0].Currency
		}
	}

	// Fallback if search didn't return data
	if name == "" {
		name = originalSymbol
	}
	if exchange == "" {
		if isStock {
			parts := strings.Split(symbol, ".")
			if len(parts) > 1 {
				exchange = parts[1]
			}
		} else {
			exchange = "Crypto"
		}
	}
	if currency == "" {
		currency = "USD" // Default to USD
	}

	result := &HistoricalQuoteResult{
		Symbol: originalSymbol,
		Period: period,
		Data:   dataPoints,
	}
	result.Metadata.Name = name
	result.Metadata.Exchange = exchange
	result.Metadata.Currency = currency

	return result, nil
}

// StockHistoricalQuote fetches historical price data for a stock symbol.
func (p *EODHDProvider) StockHistoricalQuote(
	ctx context.Context,
	symbol string,
	period string,
	from time.Time,
	to time.Time,
) (*HistoricalQuoteResult, error) {
	return p.HistoricalQuote(ctx, symbol, period, from, to, true)
}

// CryptoHistoricalQuote fetches historical price data for a crypto symbol.
func (p *EODHDProvider) CryptoHistoricalQuote(
	ctx context.Context,
	symbol string,
	period string,
	from time.Time,
	to time.Time,
) (*HistoricalQuoteResult, error) {
	return p.HistoricalQuote(ctx, symbol, period, from, to, false)
}
