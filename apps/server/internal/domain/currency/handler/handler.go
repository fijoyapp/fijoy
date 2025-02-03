package handler

import (
	"context"
	"fijoy/constants"
	fijoyv1 "fijoy/proto/fijoy/v1"

	"connectrpc.com/connect"
	"github.com/samber/lo"
	"google.golang.org/protobuf/types/known/emptypb"
)

type currencyHandler struct{}

func NewCurrencyHandler() *currencyHandler {
	return &currencyHandler{}
}

func (h *currencyHandler) GetCurrencies(
	ctx context.Context,
	req *connect.Request[emptypb.Empty],
) (*connect.Response[fijoyv1.CurrencyList], error) {
	currencies := lo.Map(lo.Values(constants.Currencies),
		func(currency constants.Currency, _ int) *fijoyv1.Currency {
			return &fijoyv1.Currency{
				Code: currency.Code, Locale: currency.Locale,
			}
		})

	return connect.NewResponse(&fijoyv1.CurrencyList{
		Items: currencies,
	}), nil
}
