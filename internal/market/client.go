// Package market provides a client for fetching
// market data such as stock and cryptocurrency quotes.
package market

import (
	"context"

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
	// Deduplicate symbols
	seen := make(map[string]bool)
	deduped := make([]string, 0, len(symbols))
	for _, symbol := range symbols {
		if !seen[symbol] {
			seen[symbol] = true
			deduped = append(deduped, symbol)
		}
	}
	return c.provider.StockQuotes(ctx, deduped)
}

func (c *Client) CryptoQuotes(
	ctx context.Context,
	symbols []string,
) (map[string]*CryptoQuoteResult, error) {
	// Deduplicate symbols
	seen := make(map[string]bool)
	deduped := make([]string, 0, len(symbols))
	for _, symbol := range symbols {
		if !seen[symbol] {
			seen[symbol] = true
			deduped = append(deduped, symbol)
		}
	}
	return c.provider.CryptoQuotes(ctx, deduped)
}
