package handler

import (
	"context"
	"errors"
	"fijoy/constants"
	"fijoy/internal/domain/account/usecase"
	fijoyv1 "fijoy/proto/fijoy/v1"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
	"google.golang.org/protobuf/types/known/emptypb"
)

type accountHandler struct {
	useCase        usecase.AccountUseCase
	protoValidator *protovalidate.Validator
}

func NewAccountHandler(protoValidator *protovalidate.Validator, useCase usecase.AccountUseCase) *accountHandler {
	return &accountHandler{useCase: useCase, protoValidator: protoValidator}
}

func (h *accountHandler) CreateAccount(
	ctx context.Context,
	req *connect.Request[fijoyv1.CreateAccountRequest],
) (*connect.Response[fijoyv1.Account], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	profileId := ctx.Value("profileId").(string)
	if profileId == "" {
		return nil, errors.New(constants.ErrFijoyProfileIdMissing)
	}

	account, err := h.useCase.CreateAccount(ctx, profileId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(account), nil
}

func (h *accountHandler) GetAccountById(
	ctx context.Context,
	req *connect.Request[fijoyv1.GetAccountByIdRequest],
) (*connect.Response[fijoyv1.Account], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	profileId := ctx.Value("profileId").(string)
	if profileId == "" {
		return nil, errors.New(constants.ErrFijoyProfileIdMissing)
	}

	account, err := h.useCase.GetAccountById(ctx, profileId, req.Msg)
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

	profileId := ctx.Value("profileId").(string)
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

	profileId := ctx.Value("profileId").(string)
	if profileId == "" {
		return nil, errors.New(constants.ErrFijoyProfileIdMissing)
	}

	account, err := h.useCase.UpdateAccount(ctx, profileId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(account), nil
}

func (h *accountHandler) DeleteAccountById(
	ctx context.Context,
	req *connect.Request[fijoyv1.DeleteAccountByIdRequest],
) (*connect.Response[fijoyv1.Account], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	profileId := ctx.Value("profileId").(string)
	if profileId == "" {
		return nil, errors.New(constants.ErrFijoyProfileIdMissing)
	}

	account, err := h.useCase.DeleteAccountById(ctx, profileId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(account), nil
}
