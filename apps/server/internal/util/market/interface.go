package market

import (
	"context"
)

type MarketDataService interface {
	GetAssetInfo(ctx context.Context, symbol string) (*AssetInfo, error)
	GetFxRate(ctx context.Context, fromCurrency, toCurrency string) (*FXRate, error)
}
