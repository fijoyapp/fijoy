package handler

import (
	"context"
	"fijoy/internal/domain/profile/usecase"
	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"
	"fijoy/internal/util/auth"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
	"google.golang.org/protobuf/types/known/emptypb"
)

type profileHandler struct {
	useCase        usecase.ProfileUseCase
	protoValidator *protovalidate.Validator
}

func NewProfileHandler(protoValidator *protovalidate.Validator, useCase usecase.ProfileUseCase) *profileHandler {
	return &profileHandler{useCase: useCase, protoValidator: protoValidator}
}

func (h *profileHandler) GetProfile(
	ctx context.Context,
	req *connect.Request[emptypb.Empty],
) (*connect.Response[fijoyv1.Profile], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	userId, err := auth.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	profile, err := h.useCase.GetProfileByUserId(ctx, userId)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(profile), nil
}

func (h *profileHandler) CreateProfile(
	ctx context.Context,
	req *connect.Request[fijoyv1.CreateProfileRequest],
) (*connect.Response[fijoyv1.Profile], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	userId, err := auth.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	profile, err := h.useCase.CreateProfile(ctx, userId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(profile), nil
}

func (h *profileHandler) DeleteProfile(
	ctx context.Context,
	req *connect.Request[emptypb.Empty],
) (*connect.Response[fijoyv1.Profile], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	profileId, err := auth.ExtractProfileIdFromHeader(req.Header())
	if err != nil {
		return nil, err
	}

	profile, err := h.useCase.DeleteProfile(ctx, profileId)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(profile), nil
}

func (h *profileHandler) UpdateCurrency(
	ctx context.Context,
	req *connect.Request[fijoyv1.UpdateCurrencyRequest],
) (*connect.Response[fijoyv1.Profile], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	profileId, err := auth.ExtractProfileIdFromHeader(req.Header())
	if err != nil {
		return nil, err
	}

	profile, err := h.useCase.UpdateCurrency(ctx, profileId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(profile), nil
}
