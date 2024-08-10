package repository

import (
	"context"
	"database/sql"
	"fijoy/constants"
	"fijoy/internal/gen/postgres/model"
	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"
	"time"

	. "fijoy/internal/gen/postgres/table"

	. "github.com/go-jet/jet/v2/postgres"
	"github.com/nrednav/cuid2"
)

type WorkspaceRepository interface {
	CreateWorkspaceTX(ctx context.Context, tx *sql.Tx, req *fijoyv1.CreateWorkspaceRequest) (*model.FijoyWorkspace, error)
	DeleteWorkspaceTX(ctx context.Context, tx *sql.Tx, id string) (*model.FijoyWorkspace, error)

	GetWorkspaceById(ctx context.Context, req *fijoyv1.GetWorkspaceByIdRequest) (*model.FijoyWorkspace, error)
	GetWorkspaceByNamespace(ctx context.Context, req *fijoyv1.GetWorkspaceByNamespaceRequest) (*model.FijoyWorkspace, error)
}

type workspaceRepository struct {
	db *sql.DB
}

func NewWorkspaceRepository(db *sql.DB) *workspaceRepository {
	return &workspaceRepository{db: db}
}

type WorkspaceUserRepository interface {
	CreateWorkspaceUserTX(ctx context.Context, tx *sql.Tx, workspaceId string, userId string, role model.FijoyWorkspaceRole) (*model.FijoyWorkspaceUser, error)

	GetWorkspaceUser(ctx context.Context, workspaceId string, userId string) (*model.FijoyWorkspaceUser, error)
}

type workspaceUserRepository struct {
	db *sql.DB
}

func NewWorkspaceUserRepository(db *sql.DB) *workspaceUserRepository {
	return &workspaceUserRepository{db: db}
}

func (r *workspaceRepository) CreateWorkspaceTX(ctx context.Context, tx *sql.Tx, req *fijoyv1.CreateWorkspaceRequest) (*model.FijoyWorkspace, error) {
	workspaceId := constants.WorkspacePrefix + cuid2.Generate()

	workspace := model.FijoyWorkspace{
		ID:              workspaceId,
		Namespace:       req.Namespace,
		Name:            req.Name,
		PrimaryCurrency: req.PrimaryCurrency,
		Locale:          req.Locale,
		CreatedAt:       time.Now(),
	}

	stmt := FijoyWorkspace.
		INSERT(FijoyWorkspace.AllColumns).
		MODEL(workspace).RETURNING(FijoyWorkspace.AllColumns)

	dest := model.FijoyWorkspace{}

	err := stmt.QueryContext(ctx, tx, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *workspaceRepository) GetWorkspaceById(ctx context.Context, req *fijoyv1.GetWorkspaceByIdRequest) (*model.FijoyWorkspace, error) {
	stmt := SELECT(FijoyWorkspace.AllColumns).
		FROM(FijoyWorkspace).
		WHERE(FijoyWorkspace.ID.EQ(String(req.Id)))

	dest := model.FijoyWorkspace{}

	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *workspaceRepository) DeleteWorkspaceByNamespace(ctx context.Context, req *fijoyv1.GetWorkspaceByNamespaceRequest) (*model.FijoyWorkspace, error) {
	stmt := FijoyWorkspace.DELETE().
		WHERE(FijoyWorkspace.Namespace.EQ(String(req.Namespace))).
		RETURNING(FijoyWorkspace.AllColumns)

	dest := model.FijoyWorkspace{}

	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *workspaceUserRepository) CreateWorkspaceUserTX(ctx context.Context, tx *sql.Tx, workspaceId string, userId string, role model.FijoyWorkspaceRole) (*model.FijoyWorkspaceUser, error) {
	workspaceUser := model.FijoyWorkspaceUser{
		WorkspaceID: workspaceId,
		UserID:      userId,
		Role:        role,
	}

	stmt := FijoyWorkspaceUser.
		INSERT(FijoyWorkspaceUser.AllColumns).
		MODEL(workspaceUser).RETURNING(FijoyWorkspaceUser.AllColumns)

	dest := model.FijoyWorkspaceUser{}

	err := stmt.QueryContext(ctx, tx, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *workspaceUserRepository) GetWorkspaceUser(ctx context.Context, workspaceId string, userId string) (*model.FijoyWorkspaceUser, error) {
	stmt := SELECT(FijoyWorkspaceUser.AllColumns).
		FROM(FijoyWorkspaceUser).
		WHERE(FijoyWorkspaceUser.WorkspaceID.EQ(String(workspaceId))).
		WHERE(FijoyWorkspaceUser.UserID.EQ(String(userId)))

	dest := model.FijoyWorkspaceUser{}

	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *workspaceRepository) GetWorkspaceByNamespace(ctx context.Context, tx *sql.Tx, id string) (*model.FijoyWorkspace, error) {
	stmt := SELECT(FijoyWorkspace.AllColumns).
		FROM(FijoyWorkspace).
		WHERE(FijoyWorkspace.ID.EQ(String(id)))

	dest := model.FijoyWorkspace{}

	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}
