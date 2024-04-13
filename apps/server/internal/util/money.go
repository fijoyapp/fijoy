package util

import (
	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"

	"github.com/shopspring/decimal"
)

func DecimalToMoney(d decimal.Decimal, currency string) *fijoyv1.Money {
	return &fijoyv1.Money{
		Units:        d.IntPart(),
		Nanos:        int32(d.Coefficient().Int64() - (d.IntPart() * 1e8)),
		CurrencyCode: currency,
	}
}

func MoneyToDecimal(m *fijoyv1.Money) decimal.Decimal {
	return decimal.NewFromInt(m.Units).
		Add(decimal.New(int64(m.Nanos), -9))
}
