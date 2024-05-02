package handler

import (
	"context"
	"database/sql"
	"errors"
	"fijoy/internal/gen/postgres/model"
	"fijoy/internal/gen/proto/fijoy/v1/fijoyv1connect"
	"fijoy/internal/util"
	"fijoy/internal/util/fracdex"

	. "fijoy/internal/gen/postgres/table"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
	. "github.com/go-jet/jet/v2/postgres"
	"github.com/go-playground/validator/v10"
	"github.com/nrednav/cuid2"
	"google.golang.org/protobuf/types/known/emptypb"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"

	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"
)

type CategoryServer struct {
	db        *sql.DB
	validator *validator.Validate
}

func NewCategoryHandler(r *chi.Mux, tokenAuth *jwtauth.JWTAuth, db *sql.DB, validator *validator.Validate) {
	categoryServer := &CategoryServer{db: db, validator: validator}

	path, handler := fijoyv1connect.NewCategoryServiceHandler(categoryServer)

	r.Group(func(r chi.Router) {
		r.Use(jwtauth.Verifier(tokenAuth))
		r.Use(jwtauth.Authenticator(tokenAuth))

		r.Mount(path, handler)
	})
}

func jetCategoryToConnectCategory(c *model.FijoyCategory) *fijoyv1.Category {
	return &fijoyv1.Category{
		Id:           c.ID,
		WorkspaceId:  c.WorkspaceID,
		Name:         c.Name,
		CategoryType: util.JetTransactionTypeToConnectTransactionType[c.CategoryType],
		Position:     c.Position,
	}
}

func (s *CategoryServer) CreateCategories(
	ctx context.Context,
	req *connect.Request[fijoyv1.CreateCategoriesRequest],
) (*connect.Response[emptypb.Empty], error) {
	workspaceId, err := util.ExtractWorkspaceIdFromHeader(req.Header())
	if err != nil {
		return nil, err
	}

	userId, err := util.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	workspaceUser, err := util.GetWorkspaceUserPermission(s.db, userId, workspaceId)
	if err != nil {
		return nil, err
	}

	if !util.HasEditPermission(&workspaceUser) {
		return nil, connect.NewError(connect.CodePermissionDenied, errors.New("user does not have edit permission"))
	}

	v, err := protovalidate.New()
	if err != nil {
		return nil, err
	}

	if err = v.Validate(req.Msg); err != nil {
		return nil, err
	}

	tx, err := s.db.BeginTx(ctx, &sql.TxOptions{})
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	// When creating categories, we will insert all of them before the first postion.
	// Therefore, we need to first retrive the position of the first entry for the given category.
	stmt := FijoyCategory.SELECT(FijoyCategory.Position).
		WHERE(AND(
			FijoyCategory.WorkspaceID.EQ(String(workspaceId)),
			FijoyCategory.CategoryType.EQ(String(req.Msg.CategoryType.String())))).
		ORDER_BY(FijoyCategory.Position).LIMIT(1)

	position := ""
	err = stmt.QueryContext(ctx, s.db, &position)
	if err != nil {
		return nil, err
	}

	positions, err := fracdex.NKeysBetween("", position, uint(len(req.Msg.Categories)))
	if err != nil {
		return nil, err
	}

	for idx, name := range req.Msg.Categories {
		stmt := FijoyCategory.INSERT(FijoyCategory.AllColumns).MODEL(model.FijoyCategory{
			ID:           "Category_" + cuid2.Generate(),
			Name:         name,
			CategoryType: util.ConnectTransactionTypeToJetTransactionType[req.Msg.CategoryType],
			Position:     positions[idx],
			WorkspaceID:  workspaceId,
		}).RETURNING(FijoyCategory.AllColumns)

		_, err = stmt.ExecContext(ctx, tx)
		if err != nil {
			return nil, err
		}
	}

	err = tx.Commit()
	if err != nil {
		return nil, err
	}

	res := connect.NewResponse(&emptypb.Empty{})

	return res, nil
}

func (s *CategoryServer) GetCategories(
	ctx context.Context,
	req *connect.Request[emptypb.Empty],
) (*connect.Response[fijoyv1.Categories], error) {
	workspaceId, err := util.ExtractWorkspaceIdFromHeader(req.Header())
	if err != nil {
		return nil, err
	}

	userId, err := util.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	workspaceUser, err := util.GetWorkspaceUserPermission(s.db, userId, workspaceId)
	if err != nil {
		return nil, err
	}

	if !util.HasViewPermission(&workspaceUser) {
		return nil, connect.NewError(connect.CodePermissionDenied, errors.New("user does not have view permission"))
	}

	v, err := protovalidate.New()
	if err != nil {
		return nil, err
	}

	if err = v.Validate(req.Msg); err != nil {
		return nil, err
	}

	stmt := SELECT(FijoyCategory.AllColumns).FROM(FijoyCategory).
		WHERE(FijoyCategory.WorkspaceID.EQ(String(workspaceId))).ORDER_BY(FijoyCategory.Position)

	dest := []model.FijoyCategory{}

	err = stmt.QueryContext(ctx, s.db, &dest)
	if err != nil {
		return nil, err
	}

	categories := make([]*fijoyv1.Category, len(dest))
	for i, w := range dest {
		categories[i] = jetCategoryToConnectCategory(&w)
	}

	res := connect.NewResponse(&fijoyv1.Categories{
		Categories: categories,
	})

	return res, nil
}

func (s *CategoryServer) DeleteCategoryById(
	ctx context.Context,
	req *connect.Request[fijoyv1.DeleteCategoryByIdRequest],
) (*connect.Response[fijoyv1.Category], error) {
	workspaceId, err := util.ExtractWorkspaceIdFromHeader(req.Header())
	if err != nil {
		return nil, err
	}

	userId, err := util.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	workspaceUser, err := util.GetWorkspaceUserPermission(s.db, userId, workspaceId)
	if err != nil {
		return nil, err
	}

	if !util.HasEditPermission(&workspaceUser) {
		return nil, connect.NewError(connect.CodePermissionDenied, errors.New("user does not have edit permission"))
	}

	v, err := protovalidate.New()
	if err != nil {
		return nil, err
	}

	if err = v.Validate(req.Msg); err != nil {
		return nil, err
	}

	tx, err := s.db.BeginTx(ctx, &sql.TxOptions{})
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	stmt := FijoyTransaction.DELETE().WHERE(FijoyTransaction.CategoryID.EQ(String(req.Msg.Id)))

	_, err = stmt.ExecContext(ctx, tx)
	if err != nil {
		return nil, err
	}

	stmt = FijoyCategory.DELETE().WHERE(FijoyCategory.ID.EQ(String(req.Msg.Id))).RETURNING(FijoyCategory.AllColumns)

	dest := model.FijoyCategory{}

	err = stmt.QueryContext(ctx, tx, &dest)
	if err != nil {
		return nil, err
	}

	tx.Commit()

	res := connect.NewResponse(jetCategoryToConnectCategory(&dest))

	return res, nil
}

func (s *CategoryServer) UpdateCategoryById(
	ctx context.Context,
	req *connect.Request[fijoyv1.UpdateCategoryByIdRequest],
) (*connect.Response[fijoyv1.Category], error) {
	// TODO: support position
	workspaceId, err := util.ExtractWorkspaceIdFromHeader(req.Header())
	if err != nil {
		return nil, err
	}

	userId, err := util.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	workspaceUser, err := util.GetWorkspaceUserPermission(s.db, userId, workspaceId)
	if err != nil {
		return nil, err
	}

	if !util.HasEditPermission(&workspaceUser) {
		return nil, connect.NewError(connect.CodePermissionDenied, errors.New("user does not have edit permission"))
	}

	v, err := protovalidate.New()
	if err != nil {
		return nil, err
	}

	if err = v.Validate(req.Msg); err != nil {
		return nil, err
	}

	tx, err := s.db.BeginTx(ctx, &sql.TxOptions{})
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	category := model.FijoyCategory{
		Name: req.Msg.Name,
	}

	stmt := FijoyTransaction.UPDATE().WHERE(FijoyTransaction.CategoryID.EQ(String(req.Msg.Id))).MODEL(category).RETURNING(FijoyCategory.AllColumns)

	dest := model.FijoyCategory{}

	err = stmt.QueryContext(ctx, tx, &dest)
	if err != nil {
		return nil, err
	}

	tx.Commit()

	res := connect.NewResponse(jetCategoryToConnectCategory(&dest))

	return res, nil
}
