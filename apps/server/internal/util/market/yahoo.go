package market

import (
	"context"
	"errors"
	"fmt"

	"github.com/fijoyapp/finance-go/equity"
	"github.com/fijoyapp/finance-go/forex"
	"github.com/shopspring/decimal"
)

type YahooDataClient struct{}

func NewYahooDataClient() *YahooDataClient {
	return &YahooDataClient{}
}

func (c *YahooDataClient) GetAssetInfo(context context.Context, symbol string) (*AssetInfo, error) {
	if symbol == "" {
		return nil, errors.New("symbol is empty")
	}

	e, err := equity.Get(symbol)
	if err != nil {
		return nil, err
	}

	if e == nil || e.CurrencyID == "" {
		return nil, errors.New("asset not found")
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
		return nil, errors.New("fromCurrency or toCurrency is empty")
	}

	fx, err := forex.Get(fmt.Sprintf("%s%s=X", fromCurrency, toCurrency))
	if err != nil {
		return nil, err
	}

	return &FXRate{
		Rate: decimal.NewFromFloat(fx.RegularMarketPrice),
	}, nil
}
