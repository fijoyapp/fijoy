package profile

import (
	"fijoy/internal/gen/postgres/model"

	"github.com/shopspring/decimal"
)

type FijoyProfile struct {
	model.FijoyProfile
	NetWorthGoal decimal.Decimal
}
