// Package market provides a client for fetching
// market data such as stock and cryptocurrency quotes.
package market

import (
	"context"
	"time"

	"github.com/samber/lo"
	"github.com/shopspring/decimal"
)

type MarketProvider interface {
	StockQuote(
		ctx context.Context,
		symbol string,
	) (*StockQuoteResult, error)

	CryptoQuote(
		ctx context.Context,
		symbol string,
	) (*CryptoQuoteResult, error)

	StockQuotes(
		ctx context.Context,
		symbols []string,
	) (map[string]*StockQuoteResult, error)

	CryptoQuotes(
		ctx context.Context,
		symbols []string,
	) (map[string]*CryptoQuoteResult, error)

	// StockHistoricalQuote fetches historical price data for a stock symbol.
	// Period: 'd' for daily, 'w' for weekly, 'm' for monthly.
	// Returns an error if the provider doesn't support historical quotes.
	StockHistoricalQuote(
		ctx context.Context,
		symbol string,
		period string,
		from time.Time,
		to time.Time,
	) (*HistoricalQuoteResult, error)

	// CryptoHistoricalQuote fetches historical price data for a crypto symbol.
	// Period: 'd' for daily, 'w' for weekly, 'm' for monthly.
	// Returns an error if the provider doesn't support historical quotes.
	CryptoHistoricalQuote(
		ctx context.Context,
		symbol string,
		period string,
		from time.Time,
		to time.Time,
	) (*HistoricalQuoteResult, error)
}

type StockQuoteResult struct {
	Symbol       string
	Name         string
	Exchange     string
	Currency     string
	CurrentPrice decimal.Decimal
	// LastUpdated  time.Time
}

type CryptoQuoteResult struct {
	Symbol       string
	Name         string
	Exchange     string
	Currency     string
	CurrentPrice decimal.Decimal
	// LastUpdated  time.Time
}

// HistoricalDataPoint represents a single historical price data point.
type HistoricalDataPoint struct {
	Date  time.Time
	Close decimal.Decimal // Adjusted close price (adjusted for splits and dividends)
}

// HistoricalQuoteResult represents historical price data for a symbol.
type HistoricalQuoteResult struct {
	Symbol   string
	Period   string // 'd' for daily, 'w' for weekly, 'm' for monthly
	Data     []HistoricalDataPoint
	Metadata struct {
		Name     string
		Exchange string
		Currency string
	}
}

type Client struct {
	provider MarketProvider
}

func NewClient(provider MarketProvider) *Client {
	return &Client{
		provider: provider,
	}
}

func (c *Client) StockQuote(
	ctx context.Context,
	symbol string,
) (*StockQuoteResult, error) {
	return c.provider.StockQuote(ctx, symbol)
}

func (c *Client) CryptoQuote(
	ctx context.Context,
	symbol string,
) (*CryptoQuoteResult, error) {
	return c.provider.CryptoQuote(ctx, symbol)
}

func (c *Client) StockQuotes(
	ctx context.Context,
	symbols []string,
) (map[string]*StockQuoteResult, error) {
	return c.provider.StockQuotes(ctx, lo.Uniq(symbols))
}

func (c *Client) CryptoQuotes(
	ctx context.Context,
	symbols []string,
) (map[string]*CryptoQuoteResult, error) {
	return c.provider.CryptoQuotes(ctx, lo.Uniq(symbols))
}

// StockHistoricalQuote fetches historical price data for a stock symbol.
// Returns an error if the provider doesn't support historical quotes.
func (c *Client) StockHistoricalQuote(
	ctx context.Context,
	symbol string,
	period string,
	from time.Time,
	to time.Time,
) (*HistoricalQuoteResult, error) {
	return c.provider.StockHistoricalQuote(ctx, symbol, period, from, to)
}

// CryptoHistoricalQuote fetches historical price data for a crypto symbol.
// Returns an error if the provider doesn't support historical quotes.
func (c *Client) CryptoHistoricalQuote(
	ctx context.Context,
	symbol string,
	period string,
	from time.Time,
	to time.Time,
) (*HistoricalQuoteResult, error) {
	return c.provider.CryptoHistoricalQuote(ctx, symbol, period, from, to)
}
