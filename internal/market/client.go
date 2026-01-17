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
