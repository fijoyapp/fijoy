package handler

import (
	"context"
	"errors"
	"fijoy/constants"
	"fijoy/internal/domain/profile/usecase"
	"fijoy/internal/middleware"
	"fijoy/internal/util/auth"
	fijoyv1 "fijoy/proto/fijoy/v1"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
	"google.golang.org/protobuf/types/known/emptypb"
)

type profileHandler struct {
	useCase        usecase.ProfileUseCase
	protoValidator protovalidate.Validator
}

func NewProfileHandler(protoValidator protovalidate.Validator, useCase usecase.ProfileUseCase) *profileHandler {
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

	profile, err := h.useCase.GetProfileByUser(ctx, userId)
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
) (*connect.Response[emptypb.Empty], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	profileId := ctx.Value(middleware.ProfileIdKey).(string)
	if profileId == "" {
		return nil, errors.New(constants.ErrFijoyProfileIdMissing)
	}

	err := h.useCase.DeleteProfile(ctx, profileId)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&emptypb.Empty{}), nil
}

func (h *profileHandler) UpdateProfile(
	ctx context.Context,
	req *connect.Request[fijoyv1.UpdateProfileRequest],
) (*connect.Response[fijoyv1.Profile], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	profileId := ctx.Value(middleware.ProfileIdKey).(string)
	if profileId == "" {
		return nil, errors.New(constants.ErrFijoyProfileIdMissing)
	}

	profile, err := h.useCase.UpdateProfile(ctx, profileId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(profile), nil
}
