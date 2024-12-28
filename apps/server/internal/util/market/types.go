package market

import (
	"github.com/shopspring/decimal"
)

type AssetInfo struct {
	Symbol       string
	Name         string
	Exchange     string
	Currency     string
	CurrentPrice decimal.Decimal
	// LastUpdated  time.Time
}

type FXRate struct {
	Rate decimal.Decimal
	// LastUpdated time.Time
}
