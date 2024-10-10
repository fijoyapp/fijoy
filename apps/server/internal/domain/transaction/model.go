package transaction

import (
	"fijoy/internal/gen/postgres/model"

	"github.com/shopspring/decimal"
)

type FijoyTransaction struct {
	model.FijoyTransaction
	Amount       decimal.Decimal
	AmountDelta  decimal.Decimal
	Value        decimal.Decimal
	FxRate       decimal.Decimal
	Balance      decimal.Decimal
	BalanceDelta decimal.Decimal
}
