package market

import (
	"context"
	"encoding/json"
	"fijoy/internal/middleware"
	"fmt"
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
	// LastUpdated  time.Time       `json:"timestamp"`
}

type FxRateResponse struct {
	Symbol string          `json:"symbol"`
	Rate   decimal.Decimal `json:"rate"`
}

func (r *FxRateResponse) ToFxRate() *FXRate {
	return &FXRate{
		Rate: r.Rate,
	}
}

func (r *AssetInfoResponse) ToAssetInfo() *AssetInfo {
	return &AssetInfo{
		Symbol:       r.Symbol,
		Name:         r.Name,
		Exchange:     r.Exchange,
		Currency:     r.Currency,
		CurrentPrice: r.CurrentPrice,
		// LastUpdated:  r.LastUpdated,
	}
}

func (c *TwelveMarketDataClient) GetAssetInfo(context context.Context, symbol string) (*AssetInfo, error) {
	logger := middleware.GetLogger(context)

	u, err := url.Parse(c.baseURL + "quote")
	if err != nil {
		return nil, err
	}

	q := u.Query()
	q.Add("apikey", c.apiKey)
	q.Add("symbol", symbol)
	u.RawQuery = q.Encode()

	logger.Info(u.String())

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

	defer func() {
		if cerr := resp.Body.Close(); cerr != nil {
			logger.Error(cerr.Error())
		}
	}()

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

func (c *TwelveMarketDataClient) GetFxRate(context context.Context, fromCurrency, toCurrency string) (*FXRate, error) {
	logger := middleware.GetLogger(context)

	u, err := url.Parse(c.baseURL + "exchange_rate")
	if err != nil {
		return nil, err
	}

	q := u.Query()
	q.Add("apikey", c.apiKey)
	q.Add("symbol", fmt.Sprintf("%s/%s", fromCurrency, toCurrency))
	u.RawQuery = q.Encode()

	logger.Info(u.String())

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

	defer func() {
		if cerr := resp.Body.Close(); cerr != nil {
			logger.Error(cerr.Error())
		}
	}()

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
	var result FxRateResponse
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, err
	}

	return result.ToFxRate(), nil
}
