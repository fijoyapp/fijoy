package client

import (
	"fijoy/internal/util/market"
	"net/http"
	"time"
)

type TwelveMarketDataClient struct {
	baseURL    string
	apiKey     string
	httpClient *http.Client
}

func NewTwelveMarketDataClient(baseURL, apiKey string) *TwelveMarketDataClient {
	return &TwelveMarketDataClient{
		baseURL: baseURL,
		apiKey:  apiKey,
		httpClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

func (c *TwelveMarketDataClient) GetAssetInfo(symbol string) (*market.AssetInfo, error) {
	// TODO: Implement this
	return &market.AssetInfo{}, nil
}

func (c *TwelveMarketDataClient) GetFxRate(fromCurrency, toCurrency string) (*market.FXRate, error) {
	// TODO: Implement this
	return &market.FXRate{}, nil
}
