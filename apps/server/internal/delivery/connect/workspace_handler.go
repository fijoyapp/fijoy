package handler

import (
	"context"
	"database/sql"
	"errors"
	"fijoy/constants"
	"fijoy/internal/gen/postgres/model"
	"fijoy/internal/gen/proto/fijoy/v1/fijoyv1connect"
	"fijoy/internal/util"
	"strings"
	"time"

	. "fijoy/internal/gen/postgres/table"

	"github.com/bufbuild/protovalidate-go"
	. "github.com/go-jet/jet/v2/postgres"
	"github.com/go-playground/validator/v10"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"

	"github.com/nrednav/cuid2"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"

	"connectrpc.com/connect"

	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"
)

type WorkspaceServer struct {
	db        *sql.DB
	validator *validator.Validate
}

func NewWorkspaceHandler(r *chi.Mux, tokenAuth *jwtauth.JWTAuth, db *sql.DB, validator *validator.Validate) {
	workspaceServer := &WorkspaceServer{db: db, validator: validator}

	path, handler := fijoyv1connect.NewWorkspaceServiceHandler(workspaceServer)

	r.Group(func(r chi.Router) {
		r.Use(jwtauth.Verifier(tokenAuth))
		r.Use(jwtauth.Authenticator(tokenAuth))

		r.Mount(path, handler)
	})
}

func jetWorkspaceToConnectWorkspace(w *model.FijoyWorkspace) *fijoyv1.Workspace {
	return &fijoyv1.Workspace{
		Id:                  w.ID,
		Namespace:           w.Namespace,
		Name:                w.Name,
		CreatedAt:           timestamppb.New(w.CreatedAt),
		PrimaryCurrency:     w.PrimaryCurrency,
		SupportedCurrencies: strings.Split(w.SupportedCurrencies, ","),
		Locale:              w.Locale,
	}
}

func (s *WorkspaceServer) CreateWorkspace(
	ctx context.Context,
	req *connect.Request[fijoyv1.CreateWorkspaceRequest],
) (*connect.Response[fijoyv1.Workspace], error) {
	userId, err := util.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	v, err := protovalidate.New()
	if err != nil {
		return nil, err
	}

	if err = v.Validate(req.Msg); err != nil {
		return nil, err
	}

	if err := s.validator.Var(req.Msg.PrimaryCurrency, "iso4217"); err != nil {
		return nil, errors.New(constants.ErrInvalidCurrencyCode)
	}

	if err := s.validator.Var(req.Msg.Locale, "bcp47_language_tag"); err != nil {
		return nil, errors.New(constants.ErrInvalidLocaleCode)
	}

	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	workspace := model.FijoyWorkspace{
		Name:            req.Msg.Name,
		Namespace:       req.Msg.Namespace,
		ID:              "workspace_" + cuid2.Generate(),
		CreatedAt:       time.Now(),
		PrimaryCurrency: req.Msg.PrimaryCurrency,
		Locale:          req.Msg.Locale,
	}

	insertWorkspaceStmt := FijoyWorkspace.
		INSERT(FijoyWorkspace.AllColumns).MODEL(workspace).
		RETURNING(FijoyWorkspace.AllColumns)

	err = insertWorkspaceStmt.QueryContext(ctx, tx, &workspace)
	if err != nil {
		return nil, err
	}

	workspaceUser := model.FijoyWorkspaceUser{
		WorkspaceID: workspace.ID,
		UserID:      userId,
		Role:        "owner",
	}

	insertWorkspaceUserStmt := FijoyWorkspaceUser.
		INSERT(FijoyWorkspaceUser.AllColumns).MODEL(workspaceUser).
		RETURNING(FijoyWorkspaceUser.AllColumns)

	err = insertWorkspaceUserStmt.QueryContext(ctx, tx, &workspaceUser)
	if err != nil {
		return nil, err
	}

	if err = tx.Commit(); err != nil {
		return nil, err
	}

	res := connect.NewResponse(jetWorkspaceToConnectWorkspace(&workspace))

	return res, nil
}

func (s *WorkspaceServer) GetWorkspaces(
	ctx context.Context,
	req *connect.Request[emptypb.Empty],
) (*connect.Response[fijoyv1.Workspaces], error) {
	userId, err := util.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	v, err := protovalidate.New()
	if err != nil {
		return nil, err
	}

	if err = v.Validate(req.Msg); err != nil {
		return nil, err
	}

	stmt := SELECT(FijoyWorkspace.AllColumns).
		FROM(FijoyWorkspaceUser.
			INNER_JOIN(FijoyUser, FijoyWorkspaceUser.UserID.EQ(FijoyUser.ID)).
			INNER_JOIN(FijoyWorkspace, FijoyWorkspaceUser.WorkspaceID.EQ(FijoyWorkspace.ID))).
		WHERE(FijoyUser.ID.EQ(String(userId)))

	dest := []*model.FijoyWorkspace{}

	err = stmt.QueryContext(ctx, s.db, &dest)
	if err != nil {
		return nil, err
	}

	workspaces := make([]*fijoyv1.Workspace, len(dest))
	for i, w := range dest {
		workspaces[i] = jetWorkspaceToConnectWorkspace(w)
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
	userId, err := util.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	v, err := protovalidate.New()
	if err != nil {
		return nil, err
	}

	if err = v.Validate(req.Msg); err != nil {
		return nil, err
	}

	stmt := SELECT(FijoyWorkspace.AllColumns).
		FROM(FijoyWorkspaceUser.
			INNER_JOIN(FijoyUser, FijoyWorkspaceUser.UserID.EQ(FijoyUser.ID)).
			INNER_JOIN(FijoyWorkspace, FijoyWorkspaceUser.WorkspaceID.EQ(FijoyWorkspace.ID))).
		WHERE(
			AND(
				FijoyUser.ID.EQ(String(userId)),
				FijoyWorkspace.ID.EQ(String(req.Msg.Id)),
			),
		)

	var dest model.FijoyWorkspace

	err = stmt.QueryContext(ctx, s.db, &dest)
	if err != nil {
		return nil, err
	}

	res := connect.NewResponse(jetWorkspaceToConnectWorkspace(&dest))

	return res, nil
}

func (s *WorkspaceServer) GetWorkspaceByNamespace(
	ctx context.Context,
	req *connect.Request[fijoyv1.GetWorkspaceByNamespaceRequest],
) (*connect.Response[fijoyv1.Workspace], error) {
	userId, err := util.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	v, err := protovalidate.New()
	if err != nil {
		return nil, err
	}

	if err = v.Validate(req.Msg); err != nil {
		return nil, err
	}

	stmt := SELECT(FijoyWorkspace.AllColumns).
		FROM(FijoyWorkspaceUser.
			INNER_JOIN(FijoyUser, FijoyWorkspaceUser.UserID.EQ(FijoyUser.ID)).
			INNER_JOIN(FijoyWorkspace, FijoyWorkspaceUser.WorkspaceID.EQ(FijoyWorkspace.ID))).
		WHERE(
			AND(
				FijoyUser.ID.EQ(String(userId)),
				FijoyWorkspace.Namespace.EQ(String(req.Msg.Namespace)),
			),
		)

	var dest model.FijoyWorkspace

	err = stmt.QueryContext(ctx, s.db, &dest)
	if err != nil {
		return nil, err
	}

	res := connect.NewResponse(jetWorkspaceToConnectWorkspace(&dest))

	return res, nil
}

func (s *WorkspaceServer) UpdateWorkspaceName(
	ctx context.Context,
	req *connect.Request[fijoyv1.UpdateWorkspaceNameRequest],
) (*connect.Response[fijoyv1.Workspace], error) {
	userId, err := util.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	workspaceId, err := util.ExtractWorkspaceIdFromHeader(req.Header())
	if err != nil {
		return nil, err
	}

	workspaceUser, err := util.GetWorkspaceUserPermission(s.db, userId, workspaceId)
	if err != nil {
		return nil, err
	}

	if !util.HasEditPermission(&workspaceUser) {
		return nil, connect.NewError(
			connect.CodePermissionDenied, errors.New("user does not have edit permission"),
		)
	}

	v, err := protovalidate.New()
	if err != nil {
		return nil, err
	}

	if err = v.Validate(req.Msg); err != nil {
		return nil, err
	}

	workspace := model.FijoyWorkspace{
		Name: req.Msg.Name,
	}

	stmt := FijoyWorkspace.UPDATE(FijoyWorkspace.Name).MODEL(workspace).WHERE(
		FijoyWorkspace.ID.EQ(String(workspaceId)),
	).RETURNING(FijoyWorkspace.AllColumns)

	var dest model.FijoyWorkspace

	err = stmt.QueryContext(ctx, s.db, &dest)
	if err != nil {
		return nil, err
	}

	res := connect.NewResponse(jetWorkspaceToConnectWorkspace(&dest))

	return res, nil
}

func (s *WorkspaceServer) UpdateWorkspaceNamespace(
	ctx context.Context,
	req *connect.Request[fijoyv1.UpdateWorkspaceNamespaceRequest],
) (*connect.Response[fijoyv1.Workspace], error) {
	userId, err := util.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	workspaceId, err := util.ExtractWorkspaceIdFromHeader(req.Header())
	if err != nil {
		return nil, err
	}

	workspaceUser, err := util.GetWorkspaceUserPermission(s.db, userId, workspaceId)
	if err != nil {
		return nil, err
	}

	if !util.HasEditPermission(&workspaceUser) {
		return nil, connect.NewError(
			connect.CodePermissionDenied, errors.New("user does not have edit permission"),
		)
	}

	v, err := protovalidate.New()
	if err != nil {
		return nil, err
	}

	if err = v.Validate(req.Msg); err != nil {
		return nil, err
	}

	workspace := model.FijoyWorkspace{
		Namespace: req.Msg.Namespace,
	}

	stmt := FijoyWorkspace.UPDATE(FijoyWorkspace.Namespace).MODEL(workspace).WHERE(
		FijoyWorkspace.ID.EQ(String(workspaceId)),
	).RETURNING(FijoyWorkspace.AllColumns)

	var dest model.FijoyWorkspace

	err = stmt.QueryContext(ctx, s.db, &dest)
	if err != nil {
		return nil, err
	}
	res := connect.NewResponse(jetWorkspaceToConnectWorkspace(&dest))

	return res, nil
}

func (s *WorkspaceServer) DeleteWorkspace(
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

	workspaceUser, err := util.GetWorkspaceUserPermission(s.db, userId, workspaceId)
	if err != nil {
		return nil, err
	}

	if !util.HasAdminPermission(&workspaceUser) {
		return nil, connect.NewError(
			connect.CodePermissionDenied, errors.New("user does not have admin permission"),
		)
	}

	stmt := FijoyWorkspace.DELETE().WHERE(
		FijoyWorkspace.ID.EQ(String(workspaceId)),
	).RETURNING(FijoyWorkspace.AllColumns)

	var dest model.FijoyWorkspace

	err = stmt.QueryContext(ctx, s.db, &dest)
	if err != nil {
		return nil, err
	}
	res := connect.NewResponse(jetWorkspaceToConnectWorkspace(&dest))

	return res, nil
}

func (s *WorkspaceServer) UpdateCurrency(
	ctx context.Context,
	req *connect.Request[fijoyv1.UpdateCurrencyRequest],
) (*connect.Response[fijoyv1.Workspace], error) {
	userId, err := util.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	workspaceId, err := util.ExtractWorkspaceIdFromHeader(req.Header())
	if err != nil {
		return nil, err
	}

	workspaceUser, err := util.GetWorkspaceUserPermission(s.db, userId, workspaceId)
	if err != nil {
		return nil, err
	}

	if !util.HasAdminPermission(&workspaceUser) {
		return nil, connect.NewError(
			connect.CodePermissionDenied, errors.New("user does not have admin permission"),
		)
	}

	if err := s.validator.Var(req.Msg.PrimaryCurrency, "iso4217"); err != nil {
		return nil, errors.New(constants.ErrInvalidCurrencyCode)
	}

	workspace := model.FijoyWorkspace{
		PrimaryCurrency:     req.Msg.PrimaryCurrency,
		SupportedCurrencies: strings.Join(req.Msg.SupportedCurrencies, ","),
	}

	stmt := FijoyWorkspace.
		UPDATE(FijoyWorkspace.PrimaryCurrency, FijoyWorkspace.SupportedCurrencies).
		MODEL(workspace).WHERE(FijoyWorkspace.ID.EQ(String(workspaceId))).
		RETURNING(FijoyWorkspace.AllColumns)

	var dest model.FijoyWorkspace

	err = stmt.QueryContext(ctx, s.db, &dest)
	if err != nil {
		return nil, err
	}
	res := connect.NewResponse(jetWorkspaceToConnectWorkspace(&dest))

	return res, nil
}

func (s *WorkspaceServer) UpdateLocale(
	ctx context.Context,
	req *connect.Request[fijoyv1.UpdateLocaleRequest],
) (*connect.Response[fijoyv1.Workspace], error) {
	userId, err := util.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	workspaceId, err := util.ExtractWorkspaceIdFromHeader(req.Header())
	if err != nil {
		return nil, err
	}

	workspaceUser, err := util.GetWorkspaceUserPermission(s.db, userId, workspaceId)
	if err != nil {
		return nil, err
	}

	if !util.HasAdminPermission(&workspaceUser) {
		return nil, connect.NewError(
			connect.CodePermissionDenied, errors.New("user does not have admin permission"),
		)
	}

	if err := s.validator.Var(req.Msg.Locale, "bcp47_language_tag"); err != nil {
		return nil, errors.New(constants.ErrInvalidLocaleCode)
	}

	workspace := model.FijoyWorkspace{
		Locale: req.Msg.Locale,
	}

	stmt := FijoyWorkspace.UPDATE(FijoyWorkspace.Locale).MODEL(workspace).WHERE(
		FijoyWorkspace.ID.EQ(String(workspaceId)),
	).RETURNING(FijoyWorkspace.AllColumns)

	var dest model.FijoyWorkspace

	err = stmt.QueryContext(ctx, s.db, &dest)
	if err != nil {
		return nil, err
	}
	res := connect.NewResponse(jetWorkspaceToConnectWorkspace(&dest))

	return res, nil
}

// TODO: dedup all the update functions, dry
