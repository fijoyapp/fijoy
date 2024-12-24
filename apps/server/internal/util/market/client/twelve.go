package client

import (
	"encoding/json"
	"fijoy/internal/util/market"
	"io"
	"net/http"
	"net/url"
	"time"

	"github.com/shopspring/decimal"
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

type AssetInfoResponse struct {
	Symbol       string          `json:"symbol"`
	Name         string          `json:"instrument_name"`
	Exchange     string          `json:"exchange"`
	Currency     string          `json:"currency,omitempty"`
	CurrentPrice decimal.Decimal `json:"close"`
	LastUpdated  time.Time       `json:"timestamp"`
}

func (r *AssetInfoResponse) ToAssetInfo() *market.AssetInfo {
	return &market.AssetInfo{
		Symbol:       r.Symbol,
		Name:         r.Name,
		Exchange:     r.Exchange,
		Currency:     r.Currency,
		CurrentPrice: r.CurrentPrice,
		LastUpdated:  r.LastUpdated,
	}
}

func (c *TwelveMarketDataClient) GetAssetInfo(symbol string) (*market.AssetInfo, error) {
	u, err := url.Parse(c.baseURL)
	if err != nil {
		return nil, err
	}

	q := u.Query()
	q.Add("apikey", c.apiKey)
	q.Add("symbol", symbol)
	u.RawQuery = q.Encode()

	req, err := http.NewRequest("GET", u.String(), nil)
	if err != nil {
		return nil, err
	}
	req.Header.Add("Accept", "application/json")

	// Make the request
	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// Check status code
	if resp.StatusCode != http.StatusOK {
		return nil, err
	}

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	// Parse JSON
	var result AssetInfoResponse
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, err
	}

	return result.ToAssetInfo(), nil
}

func (c *TwelveMarketDataClient) GetFxRate(fromCurrency, toCurrency string) (*market.FXRate, error) {
	// TODO: Implement this
	return &market.FXRate{}, nil
}
