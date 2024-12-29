package client

import (
	"context"
	"fijoy/internal/util/market"

	"github.com/shopspring/decimal"
)

type MockMarketDataClient struct{}

func NewMockMarketDataClient() *MockMarketDataClient {
	return &MockMarketDataClient{}
}

func (c *MockMarketDataClient) GetAssetInfo(context context.Context, symbol string) (*market.AssetInfo, error) {
	return &market.AssetInfo{
		Symbol:       "AAPL",
		Name:         "Apple Inc.",
		Exchange:     "NASDAQ",
		Currency:     "USD",
		CurrentPrice: decimal.NewFromFloat(150.0),
	}, nil
}

func (c *MockMarketDataClient) GetFxRate(context context.Context, fromCurrency, toCurrency string) (*market.FXRate, error) {
	return &market.FXRate{
		Rate: decimal.NewFromFloat(2.0),
	}, nil
}
