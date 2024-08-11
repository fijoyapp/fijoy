package handler

import (
	"context"
	"fijoy/internal/domain/profile/usecase"
	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"
	"fijoy/internal/util"

	"connectrpc.com/connect"
	"google.golang.org/protobuf/types/known/emptypb"
)

type profileHandler struct {
	useCase usecase.ProfileUseCase
}

func NewProfileHandler(useCase usecase.ProfileUseCase) *profileHandler {
	return &profileHandler{useCase: useCase}
}

func (h *profileHandler) GetProfile(
	ctx context.Context,
	req *connect.Request[emptypb.Empty],
) (*connect.Response[fijoyv1.Profile], error) {
	userId, err := util.GetUserIdFromContext(ctx)
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
	userId, err := util.GetUserIdFromContext(ctx)
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
	profileId, err := util.ExtractProfileIdFromHeader(req.Header())
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
	profileId, err := util.ExtractProfileIdFromHeader(req.Header())
	if err != nil {
		return nil, err
	}
	profile, err := h.useCase.UpdateCurrency(ctx, profileId, req.Msg)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(profile), nil
}

func (h *profileHandler) UpdateLocale(
	ctx context.Context,
	req *connect.Request[fijoyv1.UpdateLocaleRequest],
) (*connect.Response[fijoyv1.Profile], error) {
	profileId, err := util.ExtractProfileIdFromHeader(req.Header())
	if err != nil {
		return nil, err
	}

	profile, err := h.useCase.UpdateLocale(ctx, profileId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(profile), nil
}
