package handler

import (
	"context"
	"fijoy/config"
	"fijoy/internal/domain/profile/usecase"
	"fijoy/internal/util/auth"
	fijoyv1 "fijoy/proto/fijoy/v1"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
	"google.golang.org/protobuf/types/known/emptypb"
)

type profileHandler struct {
	useCase        usecase.ProfileUseCase
	protoValidator protovalidate.Validator
	authConfig     *config.AuthConfig
}

func NewProfileHandler(
	protoValidator protovalidate.Validator,
	useCase usecase.ProfileUseCase,
	authConfig *config.AuthConfig,
) *profileHandler {
	return &profileHandler{
		useCase:        useCase,
		protoValidator: protoValidator,
		authConfig:     authConfig,
	}
}

func (h *profileHandler) GetProfile(
	ctx context.Context,
	req *connect.Request[emptypb.Empty],
) (*connect.Response[fijoyv1.Profile], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	authData, err := auth.GetAuthDataFromContext(ctx)
	if err != nil {
		return nil, err
	}

	profile, err := h.useCase.GetProfileByUser(ctx, authData.UserId)
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

	authData, err := auth.GetAuthDataFromContext(ctx)
	if err != nil {
		return nil, err
	}

	profile, err := h.useCase.CreateProfile(ctx, authData.UserId, req.Msg)
	if err != nil {
		return nil, err
	}

	_, tokenString, _ := h.authConfig.JWT_AUTH.Encode(
		map[string]any{
			"user_id":    authData.UserId,
			"profile_id": profile.Id,
		},
	)

	auth.SetJwtCookie(ctx, tokenString)

	return connect.NewResponse(profile), nil
}

func (h *profileHandler) DeleteProfile(
	ctx context.Context,
	req *connect.Request[emptypb.Empty],
) (*connect.Response[emptypb.Empty], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	authData, err := auth.GetAuthDataFromContext(ctx)
	if err != nil {
		return nil, err
	}

	err = h.useCase.DeleteProfile(ctx, authData.ProfileId)
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

	authData, err := auth.GetAuthDataFromContext(ctx)
	if err != nil {
		return nil, err
	}

	profile, err := h.useCase.UpdateProfile(ctx, authData.ProfileId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(profile), nil
}
