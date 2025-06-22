package market

import (
	"context"

	"github.com/shopspring/decimal"
)

type MockMarketDataClient struct{}

func NewMockMarketDataClient() *MockMarketDataClient {
	return &MockMarketDataClient{}
}

func (c *MockMarketDataClient) GetAssetInfo(context context.Context, symbol string) (*AssetInfo, error) {
	return &AssetInfo{
		Symbol:       "AAPL",
		Name:         "Apple Inc.",
		Exchange:     "NASDAQ",
		Currency:     "USD",
		CurrentPrice: decimal.NewFromFloat(150.0),
	}, nil
}

func (c *MockMarketDataClient) GetFxRate(context context.Context, fromCurrency, toCurrency string) (*FXRate, error) {
	return &FXRate{
		Rate: decimal.NewFromFloat(2.0),
	}, nil
}
