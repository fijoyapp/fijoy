package handler

import (
	"context"
	"fijoy/internal/domain/transaction/usecase"
	"fijoy/internal/util/auth"
	fijoyv1 "fijoy/proto/fijoy/v1"

	"connectrpc.com/connect"
	"buf.build/go/protovalidate"
	"google.golang.org/protobuf/types/known/emptypb"
)

type transactionHandler struct {
	useCase        usecase.TransactionUseCase
	protoValidator protovalidate.Validator
}

func NewTransactionHandler(protoValidator protovalidate.Validator, useCase usecase.TransactionUseCase) *transactionHandler {
	return &transactionHandler{useCase: useCase, protoValidator: protoValidator}
}

func (h *transactionHandler) CreateTransaction(
	ctx context.Context,
	req *connect.Request[fijoyv1.CreateTransactionRequest],
) (*connect.Response[fijoyv1.Transaction], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	authData, err := auth.GetAuthDataFromContext(ctx)
	if err != nil {
		return nil, err
	}

	transaction, err := h.useCase.CreateTransaction(ctx, authData.ProfileId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(transaction), nil
}

func (h *transactionHandler) GetTransaction(
	ctx context.Context,
	req *connect.Request[fijoyv1.GetTransactionRequest],
) (*connect.Response[fijoyv1.Transaction], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	authData, err := auth.GetAuthDataFromContext(ctx)
	if err != nil {
		return nil, err
	}

	transaction, err := h.useCase.GetTransaction(ctx, authData.ProfileId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(transaction), nil
}

func (h *transactionHandler) GetTransactions(
	ctx context.Context,
	req *connect.Request[emptypb.Empty],
) (*connect.Response[fijoyv1.TransactionList], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	authData, err := auth.GetAuthDataFromContext(ctx)
	if err != nil {
		return nil, err
	}

	transactions, err := h.useCase.GetTransactions(ctx, authData.ProfileId)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(transactions), nil
}

func (h *transactionHandler) GetTransactionsByAccount(
	ctx context.Context,
	req *connect.Request[fijoyv1.GetTransactionsByAccountRequest],
) (*connect.Response[fijoyv1.TransactionList], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	authData, err := auth.GetAuthDataFromContext(ctx)
	if err != nil {
		return nil, err
	}

	transactions, err := h.useCase.GetTransactions(ctx, authData.ProfileId)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(transactions), nil
}

func (h *transactionHandler) UpdateTransaction(
	ctx context.Context,
	req *connect.Request[fijoyv1.UpdateTransactionRequest],
) (*connect.Response[fijoyv1.Transaction], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	authData, err := auth.GetAuthDataFromContext(ctx)
	if err != nil {
		return nil, err
	}

	transaction, err := h.useCase.UpdateTransaction(ctx, authData.ProfileId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(transaction), nil
}

func (h *transactionHandler) DeleteTransaction(
	ctx context.Context,
	req *connect.Request[fijoyv1.DeleteTransactionRequest],
) (*connect.Response[emptypb.Empty], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	authData, err := auth.GetAuthDataFromContext(ctx)
	if err != nil {
		return nil, err
	}

	err = h.useCase.DeleteTransaction(ctx, authData.ProfileId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&emptypb.Empty{}), nil
}
