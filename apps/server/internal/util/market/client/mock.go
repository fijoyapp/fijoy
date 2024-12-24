package client

import (
	"context"
	"fijoy/internal/util/market"
)

type MockMarketDataClient struct{}

func NewMockMarketDataClient() *MockMarketDataClient {
	return &MockMarketDataClient{}
}

func (c *MockMarketDataClient) GetAssetInfo(context context.Context, symbol string) (*market.AssetInfo, error) {
	// TODO: Implement this
	return &market.AssetInfo{}, nil
}

func (c *MockMarketDataClient) GetFxRate(context context.Context, fromCurrency, toCurrency string) (*market.FXRate, error) {
	// TODO: Implement this
	return &market.FXRate{}, nil
}
