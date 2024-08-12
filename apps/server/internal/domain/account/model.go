package account

import (
	"fijoy/internal/gen/postgres/model"

	"github.com/shopspring/decimal"
)

type FijoyAccount struct {
	model.FijoyAccount
	Amount decimal.Decimal
	Value  decimal.Decimal
	FxRate decimal.Decimal
}
