package market

import (
	"context"
	"errors"
	"time"

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

func (p *YahooProvider) StockQuotes(
	ctx context.Context,
	symbols []string,
) (map[string]*StockQuoteResult, error) {
	if len(symbols) == 0 {
		return make(map[string]*StockQuoteResult), nil
	}

	iter := equity.List(symbols)
	results := make(map[string]*StockQuoteResult, len(symbols))

	for iter.Next() {
		e := iter.Equity()
		if e != nil && e.CurrencyID != "" {
			results[e.Symbol] = &StockQuoteResult{
				Symbol:       e.Symbol,
				Name:         e.LongName,
				Exchange:     e.FullExchangeName,
				Currency:     e.CurrencyID,
				CurrentPrice: decimal.NewFromFloat(e.RegularMarketPrice),
			}
		}
	}

	if err := iter.Err(); err != nil {
		return nil, err
	}

	return results, nil
}

func (p *YahooProvider) CryptoQuotes(
	ctx context.Context,
	symbols []string,
) (map[string]*CryptoQuoteResult, error) {
	if len(symbols) == 0 {
		return make(map[string]*CryptoQuoteResult), nil
	}

	iter := equity.List(symbols)
	results := make(map[string]*CryptoQuoteResult, len(symbols))

	for iter.Next() {
		e := iter.Equity()
		if e != nil && e.CurrencyID != "" {
			results[e.Symbol] = &CryptoQuoteResult{
				Symbol:       e.Symbol,
				Name:         e.LongName,
				Exchange:     e.FullExchangeName,
				Currency:     e.CurrencyID,
				CurrentPrice: decimal.NewFromFloat(e.RegularMarketPrice),
			}
		}
	}

	if err := iter.Err(); err != nil {
		return nil, err
	}

	return results, nil
}

// StockHistoricalQuote is not supported by Yahoo provider.
func (p *YahooProvider) StockHistoricalQuote(
	ctx context.Context,
	symbol string,
	period string,
	from time.Time,
	to time.Time,
) (*HistoricalQuoteResult, error) {
	return nil, errors.New("historical quotes not supported by Yahoo provider")
}

// CryptoHistoricalQuote is not supported by Yahoo provider.
func (p *YahooProvider) CryptoHistoricalQuote(
	ctx context.Context,
	symbol string,
	period string,
	from time.Time,
	to time.Time,
) (*HistoricalQuoteResult, error) {
	return nil, errors.New("historical quotes not supported by Yahoo provider")
}
