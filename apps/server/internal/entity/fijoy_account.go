package entity

import (
	"fijoy/internal/gen/postgres/railway/public/model"

	"github.com/shopspring/decimal"
)

type FijoyAccount struct {
	model.FijoyAccount
	Balance decimal.Decimal
}
