package handler

import (
	"context"
	"database/sql"
	"fijoy/internal/gen/postgres/railway/public/model"
	"fijoy/internal/gen/proto/fijoy/v1/fijoyv1connect"
	"time"

	. "fijoy/internal/gen/postgres/railway/public/table"

	. "github.com/go-jet/jet/v2/postgres"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"

	"github.com/nrednav/cuid2"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"

	"connectrpc.com/connect"

	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"
)

type WorkspaceServer struct {
	db *sql.DB
}

func NewWorkspaceHandler(r *chi.Mux, tokenAuth *jwtauth.JWTAuth, db *sql.DB) {
	workspaceServer := &WorkspaceServer{db: db}

	path, handler := fijoyv1connect.NewWorkspaceServiceHandler(workspaceServer)

	r.Group(func(r chi.Router) {
		r.Use(jwtauth.Verifier(tokenAuth))
		r.Use(jwtauth.Authenticator(tokenAuth))

		r.Mount(path, handler)
	})
}

func (s *WorkspaceServer) CreateWorkspace(
	ctx context.Context,
	req *connect.Request[fijoyv1.CreateWorkspaceRequest],
) (*connect.Response[fijoyv1.Workspace], error) {
	_, claims, _ := jwtauth.FromContext(ctx)
	userId := claims["user_id"].(string)

	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	workspace := model.FijoyWorkspace{
		Name:      req.Msg.Name,
		Namespace: req.Msg.Namespace,
		ID:        "workspace_" + cuid2.Generate(),
		CreatedAt: time.Now(),
	}

	insertWorkspaceStmt := FijoyWorkspace.INSERT(FijoyWorkspace.AllColumns).MODEL(workspace)

	_, err = insertWorkspaceStmt.ExecContext(ctx, tx)
	if err != nil {
		return nil, err
	}

	workspaceUser := model.FijoyWorkspaceUser{
		WorkspaceID: workspace.ID,
		UserID:      userId,
		Role:        "owner",
	}

	insertWorkspaceUserStmt := FijoyWorkspaceUser.INSERT(FijoyWorkspaceUser.AllColumns).MODEL(workspaceUser)

	_, err = insertWorkspaceUserStmt.ExecContext(ctx, tx)
	if err != nil {
		return nil, err
	}

	if err = tx.Commit(); err != nil {
		return nil, err
	}

	res := connect.NewResponse(&fijoyv1.Workspace{
		Id:        workspace.ID,
		Namespace: workspace.Namespace,
		Name:      workspace.Name,
		CreatedAt: timestamppb.New(workspace.CreatedAt),
	})

	return res, nil
}

func (s *WorkspaceServer) GetWorkspaces(
	ctx context.Context,
	req *connect.Request[emptypb.Empty],
) (*connect.Response[fijoyv1.Workspaces], error) {
	_, claims, _ := jwtauth.FromContext(ctx)
	userId := claims["user_id"].(string)

	stmt := SELECT(FijoyWorkspace.AllColumns).
		FROM(FijoyWorkspaceUser.
			INNER_JOIN(FijoyUser, FijoyWorkspaceUser.UserID.EQ(FijoyUser.ID)).
			INNER_JOIN(FijoyWorkspace, FijoyWorkspaceUser.WorkspaceID.EQ(FijoyWorkspace.ID))).WHERE(FijoyUser.ID.EQ(String(userId)))

	dest := []*model.FijoyWorkspace{}

	err := stmt.QueryContext(ctx, s.db, &dest)
	if err != nil {
		return nil, err
	}

	workspaces := make([]*fijoyv1.Workspace, len(dest))
	for i, w := range dest {
		workspaces[i] = &fijoyv1.Workspace{
			Id:        w.ID,
			Namespace: w.Namespace,
			Name:      w.Name,
			CreatedAt: timestamppb.New(w.CreatedAt),
		}
	}

	res := connect.NewResponse(&fijoyv1.Workspaces{
		Workspaces: workspaces,
	})

	return res, nil
}

func (s *WorkspaceServer) GetWorkspaceById(
	ctx context.Context,
	req *connect.Request[fijoyv1.GetWorkspaceByIdRequest],
) (*connect.Response[fijoyv1.Workspace], error) {
	_, claims, _ := jwtauth.FromContext(ctx)
	userId := claims["user_id"].(string)

	stmt := SELECT(FijoyWorkspace.AllColumns).
		FROM(FijoyWorkspaceUser.
			INNER_JOIN(FijoyUser, FijoyWorkspaceUser.UserID.EQ(FijoyUser.ID)).
			INNER_JOIN(FijoyWorkspace, FijoyWorkspaceUser.WorkspaceID.EQ(FijoyWorkspace.ID))).
		WHERE(AND(FijoyUser.ID.EQ(String(userId)), FijoyWorkspace.ID.EQ(String(req.Msg.Id))))

	var dest struct {
		model.FijoyWorkspace
	}

	err := stmt.QueryContext(ctx, s.db, &dest)
	if err != nil {
		return nil, err
	}

	res := connect.NewResponse(&fijoyv1.Workspace{
		Id:        dest.ID,
		Namespace: dest.Namespace,
		Name:      dest.Name,
		CreatedAt: timestamppb.New(dest.CreatedAt),
	})

	return res, nil
}

func (s *WorkspaceServer) GetWorkspaceByNamespace(
	ctx context.Context,
	req *connect.Request[fijoyv1.GetWorkspaceByNamespaceRequest],
) (*connect.Response[fijoyv1.Workspace], error) {
	_, claims, _ := jwtauth.FromContext(ctx)
	userId := claims["user_id"].(string)

	stmt := SELECT(FijoyWorkspace.AllColumns).
		FROM(FijoyWorkspaceUser.
			INNER_JOIN(FijoyUser, FijoyWorkspaceUser.UserID.EQ(FijoyUser.ID)).
			INNER_JOIN(FijoyWorkspace, FijoyWorkspaceUser.WorkspaceID.EQ(FijoyWorkspace.ID))).
		WHERE(AND(FijoyUser.ID.EQ(String(userId)), FijoyWorkspace.Namespace.EQ(String(req.Msg.Namespace))))

	var dest struct {
		model.FijoyWorkspace
	}

	err := stmt.QueryContext(ctx, s.db, &dest)
	if err != nil {
		return nil, err
	}

	res := connect.NewResponse(&fijoyv1.Workspace{
		Id:        dest.ID,
		Namespace: dest.Namespace,
		Name:      dest.Name,
		CreatedAt: timestamppb.New(dest.CreatedAt),
	})

	return res, nil
}
