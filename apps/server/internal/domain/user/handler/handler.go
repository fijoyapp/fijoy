package handler

import (
	"context"
	"fijoy/internal/domain/user/usecase"
	"fijoy/internal/util/auth"
	fijoyv1 "fijoy/proto/fijoy/v1"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
	"google.golang.org/protobuf/types/known/emptypb"
)

type userHandler struct {
	useCase        usecase.UserUseCase
	protoValidator protovalidate.Validator
}

func NewUserHandler(protoValidator protovalidate.Validator, useCase usecase.UserUseCase) *userHandler {
	return &userHandler{useCase: useCase, protoValidator: protoValidator}
}

func (h *userHandler) GetUser(
	ctx context.Context,
	req *connect.Request[emptypb.Empty],
) (*connect.Response[fijoyv1.User], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	userId, err := auth.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	user, err := h.useCase.GetUser(ctx, userId)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(user), nil
}
