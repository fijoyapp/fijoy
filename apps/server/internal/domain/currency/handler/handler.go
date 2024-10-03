package handler

import (
	"context"
	"fijoy/constants"
	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"

	"connectrpc.com/connect"
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
	currencies := []*fijoyv1.Currency{}

	for _, currency := range constants.Currencies {
		currencies = append(currencies, &fijoyv1.Currency{
			Code: currency.Code, Locale: currency.Locale,
		})
	}

	return connect.NewResponse(&fijoyv1.CurrencyList{
		Items: currencies,
	}), nil
}
