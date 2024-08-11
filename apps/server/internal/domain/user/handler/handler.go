package handler

import (
	"context"
	"fijoy/internal/domain/user/usecase"
	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"
	"fijoy/internal/util"

	"connectrpc.com/connect"
	"google.golang.org/protobuf/types/known/emptypb"
)

type userHandler struct {
	useCase usecase.UserUseCase
}

func NewUserHandler(useCase usecase.UserUseCase) *userHandler {
	return &userHandler{useCase: useCase}
}

func (s *userHandler) GetUser(
	ctx context.Context,
	req *connect.Request[emptypb.Empty],
) (*connect.Response[fijoyv1.User], error) {
	userId, err := util.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	user, err := s.useCase.GetUser(ctx, userId)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(user), nil
}