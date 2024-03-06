package handler

import (
	"context"
	"database/sql"
	"errors"
	"fijoy/internal/entity"
	"fijoy/internal/gen/postgres/model"
	"fijoy/internal/gen/proto/fijoy/v1/fijoyv1connect"
	"fijoy/internal/util"
	"time"

	. "fijoy/internal/gen/postgres/table"

	"connectrpc.com/connect"
	. "github.com/go-jet/jet/v2/postgres"
	"github.com/nrednav/cuid2"
	"github.com/shopspring/decimal"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"

	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"
)

type AccountServer struct {
	db *sql.DB
}

func NewAccountHandler(r *chi.Mux, tokenAuth *jwtauth.JWTAuth, db *sql.DB) {
	accountServer := &AccountServer{db: db}

	path, handler := fijoyv1connect.NewAccountServiceHandler(accountServer)

	r.Group(func(r chi.Router) {
		r.Use(jwtauth.Verifier(tokenAuth))
		r.Use(jwtauth.Authenticator(tokenAuth))

		r.Mount(path, handler)
	})
}

func (s *AccountServer) CreateAccount(
	ctx context.Context,
	req *connect.Request[fijoyv1.CreateAccountRequest],
) (*connect.Response[fijoyv1.Account], error) {
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

	account := entity.FijoyAccount{
		FijoyAccount: model.FijoyAccount{
			ID:          "account_" + cuid2.Generate(),
			Name:        req.Msg.Name,
			AccountType: util.ConnectAccountTypeToJetAccountType[req.Msg.AccountType],
			Institution: req.Msg.Institution,
			WorkspaceID: workspaceId,
			Currency:    req.Msg.Currency,
			UpdatedAt:   time.Now().UTC(),
		},
		Balance: decimal.NewFromInt(0),
	}

	stmt := FijoyAccount.INSERT(FijoyAccount.AllColumns).MODEL(account).
		RETURNING(FijoyAccount.AllColumns)

	dest := entity.FijoyAccount{}

	err = stmt.QueryContext(ctx, s.db, &dest)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&fijoyv1.Account{
		Id:          dest.ID,
		Name:        dest.Name,
		AccountType: util.JetAccountTypeToConnectAccountType[dest.AccountType],
		Institution: dest.Institution,
		Balance:     util.DecimalToMoney(dest.Balance),
		Currency:    dest.Currency,
		UpdatedAt:   timestamppb.New(dest.UpdatedAt),
	}), nil
}

func (s *AccountServer) GetAccounts(
	ctx context.Context,
	req *connect.Request[emptypb.Empty],
) (*connect.Response[fijoyv1.Accounts], error) {
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

	stmt := SELECT(FijoyAccount.AllColumns).FROM(FijoyAccount).
		WHERE(FijoyAccount.WorkspaceID.EQ(String(workspaceId)))

	dest := []entity.FijoyAccount{}

	err = stmt.QueryContext(ctx, s.db, &dest)
	if err != nil {
		return nil, err
	}

	accounts := make([]*fijoyv1.Account, len(dest))
	for i, w := range dest {
		accounts[i] = &fijoyv1.Account{
			Id:          w.ID,
			WorkspaceId: w.WorkspaceID,
			Name:        w.Name,
			AccountType: util.JetAccountTypeToConnectAccountType[w.AccountType],
			Balance:     util.DecimalToMoney(w.Balance),
			Currency:    w.Currency,
			Institution: w.Institution,
			CreatedAt:   timestamppb.New(w.CreatedAt),
			UpdatedAt:   timestamppb.New(w.UpdatedAt),
		}
	}

	res := connect.NewResponse(&fijoyv1.Accounts{
		Accounts: accounts,
	})

	return res, nil
}

func (s *AccountServer) GetAccountById(
	ctx context.Context,
	req *connect.Request[fijoyv1.GetAccountByIdRequest],
) (*connect.Response[fijoyv1.Account], error) {
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

	stmt := SELECT(FijoyAccount.AllColumns).FROM(FijoyAccount).
		WHERE(AND(
			FijoyAccount.ID.EQ(String(req.Msg.Id)),
			FijoyAccount.WorkspaceID.EQ(String(workspaceId)),
		))

	dest := entity.FijoyAccount{}

	err = stmt.QueryContext(ctx, s.db, &dest)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&fijoyv1.Account{
		Id:          dest.ID,
		WorkspaceId: dest.WorkspaceID,
		Name:        dest.Name,
		AccountType: util.JetAccountTypeToConnectAccountType[dest.AccountType],
		Balance:     util.DecimalToMoney(dest.Balance),
		Currency:    dest.Currency,
		Institution: dest.Currency,
		CreatedAt:   timestamppb.New(dest.CreatedAt),
		UpdatedAt:   timestamppb.New(dest.UpdatedAt),
	}), nil
}

func (s *AccountServer) DeleteAccountById(
	ctx context.Context,
	req *connect.Request[fijoyv1.DeleteAccountByIdRequest],
) (*connect.Response[fijoyv1.Account], error) {
	// FIXME: An account cannot be deleted if there is any transaction associated with it.
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

	stmt := FijoyAccount.DELETE().WHERE(FijoyAccount.ID.EQ(String(req.Msg.Id))).RETURNING(FijoyAccount.AllColumns)

	dest := entity.FijoyAccount{}

	err = stmt.QueryContext(ctx, s.db, &dest)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&fijoyv1.Account{
		Id:          dest.ID,
		WorkspaceId: dest.WorkspaceID,
		Name:        dest.Name,
		AccountType: util.JetAccountTypeToConnectAccountType[dest.AccountType],
		Balance:     util.DecimalToMoney(dest.Balance),
		Currency:    dest.Currency,
		Institution: dest.Institution,
		CreatedAt:   timestamppb.New(dest.CreatedAt),
		UpdatedAt:   timestamppb.New(dest.UpdatedAt),
	}), nil
}
