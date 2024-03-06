package entity

import (
	"fijoy/internal/gen/postgres/model"

	"github.com/shopspring/decimal"
)

type FijoyTransaction struct {
	model.FijoyTransaction
	Amount decimal.Decimal
}
