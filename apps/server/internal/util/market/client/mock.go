package client

import (
	"fijoy/internal/util/market"
)

type MockMarketDataClient struct{}

func NewMockMarketDataClient(baseURL, apiKey string) *MockMarketDataClient {
	return &MockMarketDataClient{}
}

func (c *MockMarketDataClient) GetAssetInfo(symbol string) (*market.AssetInfo, error) {
	// TODO: Implement this
	return &market.AssetInfo{}, nil
}

func (c *MockMarketDataClient) GetFxRate(fromCurrency, toCurrency string) (*market.FXRate, error) {
	// TODO: Implement this
	return &market.FXRate{}, nil
}
