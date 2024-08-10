package handler

import (
	"context"
	"fijoy/internal/domain/workspace/usecase"
	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"
	"fijoy/internal/util"

	"connectrpc.com/connect"
	"google.golang.org/protobuf/types/known/emptypb"
)

type workspaceHandler struct {
	useCase usecase.WorkspaceUseCase
}

func NewWorkspaceHandler(useCase usecase.WorkspaceUseCase) *workspaceHandler {
	return &workspaceHandler{useCase: useCase}
}

func (h *workspaceHandler) GetWorkspaceById(
	ctx context.Context,
	req *connect.Request[fijoyv1.GetWorkspaceByIdRequest],
) (*connect.Response[fijoyv1.Workspace], error) {
	userId, err := util.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	user, err := h.useCase.GetWorkspaceById(ctx, userId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(user), nil
}

func (h *workspaceHandler) GetWorkspaceByNamespace(
	ctx context.Context,
	req *connect.Request[fijoyv1.GetWorkspaceByNamespaceRequest],
) (*connect.Response[fijoyv1.Workspace], error) {
	userId, err := util.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	user, err := h.useCase.GetWorkspaceByNamespace(ctx, userId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(user), nil
}

func (h *workspaceHandler) CreateWorkspace(
	ctx context.Context,
	req *connect.Request[fijoyv1.CreateWorkspaceRequest],
) (*connect.Response[fijoyv1.Workspace], error) {
	userId, err := util.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	user, err := h.useCase.CreateWorkspace(ctx, userId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(user), nil
}

func (h *workspaceHandler) DeleteWorkspace(
	ctx context.Context,
	req *connect.Request[emptypb.Empty],
) (*connect.Response[fijoyv1.Workspace], error) {
	userId, err := util.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	workspaceId, err := util.ExtractWorkspaceIdFromHeader(req.Header())
	if err != nil {
		return nil, err
	}

	user, err := h.useCase.DeleteWorkspace(ctx, userId, workspaceId)
	if err != nil {
		return nil, err
	}
	return connect.NewResponse(user), nil
}
