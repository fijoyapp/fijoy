package market

import (
	"time"

	"github.com/shopspring/decimal"
)

type AssetInfo struct {
	Symbol       string
	Name         string
	Exchange     string
	Currency     string
	CurrentPrice decimal.Decimal
	LastUpdated  time.Time
}

type FXRate struct {
	FromCurrency string
	ToCurrency   string
	Rate         decimal.Decimal
	LastUpdated  time.Time
}
