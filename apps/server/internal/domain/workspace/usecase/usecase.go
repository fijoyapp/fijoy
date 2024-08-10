package usecase

import (
	"context"
	"database/sql"
	"fijoy/internal/domain/workspace/repository"
	"fijoy/internal/gen/postgres/model"
	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"
	"strings"

	"google.golang.org/protobuf/types/known/timestamppb"
)

type WorkspaceUseCase interface {
	CreateWorkspace(ctx context.Context, userId string, req *fijoyv1.CreateWorkspaceRequest) (*fijoyv1.Workspace, error)
	GetWorkspaceById(ctx context.Context, userId string, req *fijoyv1.GetWorkspaceByIdRequest) (*fijoyv1.Workspace, error)
	GetWorkspaceByNamespace(ctx context.Context, userId string, req *fijoyv1.GetWorkspaceByNamespaceRequest) (*fijoyv1.Workspace, error)
	DeleteWorkspace(ctx context.Context, userId string, workspaceId string) (*fijoyv1.Workspace, error)

	// CreateWorkspaceUser(ctx context.Context, workspaceId string, userId string, role model.FijoyWorkspaceRole) (*model.FijoyWorkspaceUser, error)
	// GetWorkspaceUser(ctx context.Context, workspaceId string, userId string) (*model.FijoyWorkspaceUser, error)
}

type workspaceUseCase struct {
	workspaceRepo     repository.WorkspaceRepository
	workspaceUserRepo repository.WorkspaceUserRepository

	db *sql.DB
}

func New(db *sql.DB, workspaceRepo repository.WorkspaceRepository, workspaceUserRepo repository.WorkspaceUserRepository) WorkspaceUseCase {
	return &workspaceUseCase{db: db, workspaceRepo: workspaceRepo, workspaceUserRepo: workspaceUserRepo}
}

func workspaceModelToProto(workspace *model.FijoyWorkspace) *fijoyv1.Workspace {
	return &fijoyv1.Workspace{
		Id:                  workspace.ID,
		Namespace:           workspace.Namespace,
		Name:                workspace.Name,
		PrimaryCurrency:     workspace.PrimaryCurrency,
		Locale:              workspace.Locale,
		SupportedCurrencies: strings.Split(workspace.SupportedCurrencies, ","),
		CreatedAt:           timestamppb.New(workspace.CreatedAt),
	}
}

func (u *workspaceUseCase) CreateWorkspace(ctx context.Context, userId string, req *fijoyv1.CreateWorkspaceRequest) (*fijoyv1.Workspace, error) {
	tx, err := u.db.BeginTx(ctx, &sql.TxOptions{Isolation: sql.LevelDefault})
	if err != nil {
		return nil, err
	}

	// Defer a rollback in case anything fails.
	defer func() {
		if p := recover(); p != nil {
			tx.Rollback()
			panic(p) // re-throw panic after rollback
		} else if err != nil {
			tx.Rollback() // rollback on error
		} else {
			err = tx.Commit() // commit on success
		}
	}()

	workspace, err := u.workspaceRepo.CreateWorkspaceTX(ctx, tx, req)
	if err != nil {
		return nil, err
	}

	_, err = u.workspaceUserRepo.CreateWorkspaceUserTX(ctx, tx, workspace.ID, userId, model.FijoyWorkspaceRole_Owner)
	if err != nil {
		return nil, err
	}

	return workspaceModelToProto(workspace), nil
}

func (u *workspaceUseCase) GetWorkspaceById(ctx context.Context, userId string, req *fijoyv1.GetWorkspaceByIdRequest) (*fijoyv1.Workspace, error) {
	workspace, err := u.workspaceRepo.GetWorkspaceById(ctx, req)
	if err != nil {
		return nil, err
	}

	return workspaceModelToProto(workspace), nil
}

func (u *workspaceUseCase) GetWorkspaceByNamespace(ctx context.Context, userId string, req *fijoyv1.GetWorkspaceByNamespaceRequest) (*fijoyv1.Workspace, error) {
	workspace, err := u.workspaceRepo.GetWorkspaceByNamespace(ctx, req)
	if err != nil {
		return nil, err
	}

	return workspaceModelToProto(workspace), nil
}

func (u *workspaceUseCase) DeleteWorkspace(ctx context.Context, userId string, workspaceId string) (*fijoyv1.Workspace, error) {
	tx, err := u.db.BeginTx(ctx, &sql.TxOptions{Isolation: sql.LevelDefault})
	if err != nil {
		return nil, err
	}

	// Defer a rollback in case anything fails.
	defer func() {
		if p := recover(); p != nil {
			tx.Rollback()
			panic(p) // re-throw panic after rollback
		} else if err != nil {
			tx.Rollback() // rollback on error
		} else {
			err = tx.Commit() // commit on success
		}
	}()

	workspace, err := u.workspaceRepo.DeleteWorkspaceTX(ctx, tx, workspaceId)
	if err != nil {
		return nil, err
	}

	return workspaceModelToProto(workspace), nil
}

// func (u *workspaceUseCase) CreateWorkspaceUser(ctx context.Context, workspaceId string, userId string, role model.FijoyWorkspaceRole) (*model.FijoyWorkspaceUser, error) {
// 	workspaceUser, err := u.workspaceUserRepo.CreateWorkspaceUser(ctx, workspaceId, userId, role)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return workspaceUser, nil
// }

// func (u *workspaceUseCase) GetWorkspaceUser(ctx context.Context, workspaceId string, userId string) (*model.FijoyWorkspaceUser, error) {
// 	workspaceUser, err := u.workspaceUserRepo.GetWorkspaceUser(ctx, workspaceId, userId)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return workspaceUser, nil
// }
