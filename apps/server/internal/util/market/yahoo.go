package market

import (
	"context"
	"errors"
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/fijoyapp/finance-go/equity"
	"github.com/fijoyapp/finance-go/forex"
	"github.com/redis/go-redis/v9"
	"github.com/shopspring/decimal"
)

type YahooDataClient struct {
	redisClient *redis.Client
}

func NewYahooDataClient(redisClient *redis.Client) MarketDataService {
	return &YahooDataClient{redisClient: redisClient}
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

	symbol := fmt.Sprintf("%s%s=X", fromCurrency, toCurrency)

	rate, err := c.redisClient.Get(context, symbol).Result()
	if err != nil {
		if !errors.Is(err, redis.Nil) {
			log.Println("Failed to get cached price:", err)
		}
	} else {
		log.Println("Cache hit for", symbol)
		floatVal, _ := strconv.ParseFloat(rate, 64)
		return &FXRate{
			Rate: decimal.NewFromFloat(floatVal),
		}, nil
	}

	fx, err := forex.Get(fmt.Sprintf("%s%s=X", fromCurrency, toCurrency))
	if err != nil {
		return nil, err
	}

	err = c.redisClient.Set(context, symbol, fx.RegularMarketPrice, time.Minute*15).Err()
	if err != nil {
		log.Println("Failed to cache price:", err)
	}

	return &FXRate{
		Rate: decimal.NewFromFloat(fx.RegularMarketPrice),
	}, nil
}
