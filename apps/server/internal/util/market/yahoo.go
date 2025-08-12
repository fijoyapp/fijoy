package market

import (
	"context"

	"github.com/piquette/finance-go/equity"
	"github.com/shopspring/decimal"
)

type YahooDataClient struct{}

func NewYahooDataClient() *YahooDataClient {
	return &YahooDataClient{}
}

func (c *YahooDataClient) GetAssetInfo(context context.Context, symbol string) (*AssetInfo, error) {
	if symbol == "" {
		return nil, nil
	}

	e, err := equity.Get(symbol)
	if err != nil {
		return nil, err
	}

	if e == nil || e.CurrencyID == "" {
		return nil, nil
	}

	return &AssetInfo{
		Symbol:       e.Symbol,
		Name:         e.LongName,
		Exchange:     e.FullExchangeName,
		Currency:     e.CurrencyID,
		CurrentPrice: decimal.NewFromFloat(e.RegularMarketPrice),
	}, nil
}

func (c *YahooDataClient) GetFxRate(context context.Context, fromCurrency, toCurrency string) (*FXRate, error) {
	if fromCurrency == "" || toCurrency == "" {
		return nil, nil
	}

	return nil, nil
}
