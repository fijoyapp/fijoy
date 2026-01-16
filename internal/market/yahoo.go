package market

import (
	"context"
	"errors"

	"github.com/beavermoney/finance-go/equity"
	"github.com/shopspring/decimal"
)

type YahooProvider struct{}

// NewYahooProvider creates a new YahooProvider.
func NewYahooProvider() *YahooProvider {
	return &YahooProvider{}
}

func (p *YahooProvider) StockQuote(
	ctx context.Context,
	symbol string,
) (*StockQuoteResult, error) {
	e, err := equity.Get(symbol)
	if err != nil {
		return nil, err
	}

	if e == nil || e.CurrencyID == "" {
		return nil, errors.New("asset not found")
	}

	return &StockQuoteResult{
		Symbol:       e.Symbol,
		Name:         e.LongName,
		Exchange:     e.FullExchangeName,
		Currency:     e.CurrencyID,
		CurrentPrice: decimal.NewFromFloat(e.RegularMarketPrice),
	}, nil
}

func (p *YahooProvider) CryptoQuote(
	ctx context.Context,
	symbol string,
) (*CryptoQuoteResult, error) {
	e, err := equity.Get(symbol)
	if err != nil {
		return nil, err
	}

	if e == nil || e.CurrencyID == "" {
		return nil, errors.New("asset not found")
	}

	return &CryptoQuoteResult{
		Symbol:       e.Symbol,
		Name:         e.LongName,
		Exchange:     e.FullExchangeName,
		Currency:     e.CurrencyID,
		CurrentPrice: decimal.NewFromFloat(e.RegularMarketPrice),
	}, nil
}
