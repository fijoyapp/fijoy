package handler

import (
	"context"
	"fijoy/constants"
	"testing"

	fijoyv1 "fijoy/proto/fijoy/v1"

	"connectrpc.com/connect"
	"github.com/stretchr/testify/assert"
	"google.golang.org/protobuf/types/known/emptypb"
)

func TestGetCurrencies(t *testing.T) {
	// Setup
	h := NewCurrencyHandler()
	ctx := context.Background()
	req := connect.NewRequest(&emptypb.Empty{})

	// Mock data
	constants.Currencies = map[string]constants.Currency{
		"USD": {Code: "USD", Locale: "en-US"},
		"EUR": {Code: "EUR", Locale: "de-DE"},
	}

	// Execute
	resp, err := h.GetCurrencies(ctx, req)

	// Verify
	assert.NoError(t, err)
	assert.NotNil(t, resp)
	assert.Len(t, resp.Msg.Items, 2)

	expectedCurrencies := []*fijoyv1.Currency{
		{Code: "USD", Locale: "en-US"},
		{Code: "EUR", Locale: "de-DE"},
	}

	assert.ElementsMatch(t, expectedCurrencies, resp.Msg.Items)
}
