package util

import (
	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"

	"github.com/shopspring/decimal"
)

func DecimalToMoney(d decimal.Decimal) *fijoyv1.Money {
	return &fijoyv1.Money{
		Units: d.IntPart(),
		Nanos: int32(d.Coefficient().Int64() - (d.IntPart() * 1e8)),
	}
}
