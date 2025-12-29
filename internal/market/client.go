package market

import (
	"context"

	"github.com/shopspring/decimal"
)

type MarketProvider interface {
	EquityQuote(
		ctx context.Context,
		symbol string,
	) (*EquityQuoteResult, error)
}

type EquityQuoteResult struct {
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

func (c *Client) EquityQuote(
	ctx context.Context,
	symbol string,
) (*EquityQuoteResult, error) {
	return c.provider.EquityQuote(ctx, symbol)
}
