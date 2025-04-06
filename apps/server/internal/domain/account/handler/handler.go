package handler

import (
	"context"
	"errors"
	"fijoy/constants"
	"fijoy/internal/domain/account/usecase"
	"fijoy/internal/middleware"
	fijoyv1 "fijoy/proto/fijoy/v1"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
	"google.golang.org/protobuf/types/known/emptypb"
)

type accountHandler struct {
	useCase        usecase.AccountUseCase
	protoValidator protovalidate.Validator
}

func NewAccountHandler(protoValidator protovalidate.Validator, useCase usecase.AccountUseCase) *accountHandler {
	return &accountHandler{useCase: useCase, protoValidator: protoValidator}
}

func (h *accountHandler) CreateAccount(
	ctx context.Context,
	req *connect.Request[fijoyv1.CreateAccountRequest],
) (*connect.Response[fijoyv1.Account], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	profileId := ctx.Value(middleware.ProfileIdKey).(string)
	if profileId == "" {
		return nil, errors.New(constants.ErrFijoyProfileIdMissing)
	}

	account, err := h.useCase.CreateAccount(ctx, profileId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(account), nil
}

func (h *accountHandler) GetAccount(
	ctx context.Context,
	req *connect.Request[fijoyv1.GetAccountRequest],
) (*connect.Response[fijoyv1.Account], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	profileId := ctx.Value(middleware.ProfileIdKey).(string)
	if profileId == "" {
		return nil, errors.New(constants.ErrFijoyProfileIdMissing)
	}

	account, err := h.useCase.GetAccount(ctx, profileId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(account), nil
}

func (h *accountHandler) GetAccounts(
	ctx context.Context,
	req *connect.Request[emptypb.Empty],
) (*connect.Response[fijoyv1.AccountList], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	profileId := ctx.Value(middleware.ProfileIdKey).(string)
	if profileId == "" {
		return nil, errors.New(constants.ErrFijoyProfileIdMissing)
	}

	accounts, err := h.useCase.GetAccounts(ctx, profileId)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(accounts), nil
}

func (h *accountHandler) UpdateAccount(
	ctx context.Context,
	req *connect.Request[fijoyv1.UpdateAccountRequest],
) (*connect.Response[fijoyv1.Account], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	profileId := ctx.Value(middleware.ProfileIdKey).(string)
	if profileId == "" {
		return nil, errors.New(constants.ErrFijoyProfileIdMissing)
	}

	account, err := h.useCase.UpdateAccount(ctx, profileId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(account), nil
}

// func (h *accountHandler) DeleteAccount(
// 	ctx context.Context,
// 	req *connect.Request[fijoyv1.DeleteAccountRequest],
// ) (*connect.Response[emptypb.Empty], error) {
// 	if err := h.protoValidator.Validate(req.Msg); err != nil {
// 		return nil, err
// 	}
//
// 	profileId := ctx.Value("profileId").(string)
// 	if profileId == "" {
// 		return nil, errors.New(constants.ErrFijoyProfileIdMissing)
// 	}
//
// 	err := h.useCase.DeleteAccount(ctx, profileId, req.Msg)
// 	if err != nil {
// 		return nil, err
// 	}
//
// 	return connect.NewResponse(&emptypb.Empty{}), nil
// }
