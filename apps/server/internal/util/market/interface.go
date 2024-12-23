package market

import (
	"context"
)

type MarketDataClient interface {
	GetAssetInfo(ctx context.Context, symbol string) (*AssetInfo, error)
	GetFxRate(ctx context.Context, fromCurrency, toCurrency string) (*FXRate, error)
}
