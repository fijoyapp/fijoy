package handler

import (
	"context"
	"database/sql"
	"errors"
	"fijoy/internal/entity"
	"fijoy/internal/gen/postgres/railway/public/model"
	"fijoy/internal/gen/proto/fijoy/v1/fijoyv1connect"
	"time"

	. "fijoy/internal/gen/postgres/railway/public/table"

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
	workspaceId := req.Header().Get("Fijoy-Workspace-Id")
	if workspaceId == "" {
		err := connect.NewError(
			connect.CodeInvalidArgument,
			errors.New("missing Fijoy-Workspace-Id in request header"),
		)
		return nil, err
	}

	// TODO: check if this user has access to this workspace

	balance := decimal.NewFromInt(req.Msg.Balance.Units).
		Add(decimal.New(int64(req.Msg.Balance.Nanos), -9))

	account := entity.FijoyAccount{
		FijoyAccount: model.FijoyAccount{
			ID:          "account_" + cuid2.Generate(),
			Name:        req.Msg.Name,
			AccountType: connectAccountTypeToJetAccountType[req.Msg.AccountType],
			Institution: req.Msg.Institution,
			WorkspaceID: workspaceId,
			Currency:    req.Msg.Currency,
			UpdatedAt:   time.Now().UTC(),
		},
		Balance: balance,
	}

	stmt := FijoyAccount.INSERT(FijoyAccount.AllColumns).MODEL(account).
		RETURNING(FijoyAccount.AllColumns)

	dest := entity.FijoyAccount{}

	err := stmt.Query(s.db, &dest)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&fijoyv1.Account{
		Id:          dest.ID,
		Name:        dest.Name,
		AccountType: jetAccountTypeToConnectAccountType[dest.AccountType],
		Institution: dest.Institution,
		Balance: &fijoyv1.Money{
			Units: dest.Balance.IntPart(),
			Nanos: int32(dest.Balance.CoefficientInt64()),
		},
		Currency:  dest.Currency,
		UpdatedAt: timestamppb.New(dest.UpdatedAt),
	}), nil
}

var jetAccountTypeToConnectAccountType = map[model.FijoyAccountType]fijoyv1.AccountType{
	model.FijoyAccountType_Cash:       fijoyv1.AccountType_ACCOUNT_TYPE_CASH,
	model.FijoyAccountType_Debt:       fijoyv1.AccountType_ACCOUNT_TYPE_DEBT,
	model.FijoyAccountType_Investment: fijoyv1.AccountType_ACCOUNT_TYPE_INVESTMENT,
	model.FijoyAccountType_OtherAsset: fijoyv1.AccountType_ACCOUNT_TYPE_OTHER_ASSET,
}

var connectAccountTypeToJetAccountType = map[fijoyv1.AccountType]model.FijoyAccountType{
	fijoyv1.AccountType_ACCOUNT_TYPE_CASH:        model.FijoyAccountType_Cash,
	fijoyv1.AccountType_ACCOUNT_TYPE_DEBT:        model.FijoyAccountType_Debt,
	fijoyv1.AccountType_ACCOUNT_TYPE_INVESTMENT:  model.FijoyAccountType_Investment,
	fijoyv1.AccountType_ACCOUNT_TYPE_OTHER_ASSET: model.FijoyAccountType_OtherAsset,
}

func (s *AccountServer) GetAccounts(
	ctx context.Context,
	req *connect.Request[emptypb.Empty],
) (*connect.Response[fijoyv1.Accounts], error) {
	workspaceId := req.Header().Get("Fijoy-Workspace-Id")

	stmt := SELECT(FijoyAccount.AllColumns).FROM(FijoyAccount).
		WHERE(FijoyAccount.WorkspaceID.EQ(String(workspaceId)))

	dest := []entity.FijoyAccount{}

	err := stmt.Query(s.db, &dest)
	if err != nil {
		return nil, err
	}

	accounts := make([]*fijoyv1.Account, len(dest))
	for i, w := range dest {
		accounts[i] = &fijoyv1.Account{
			Id:          w.ID,
			WorkspaceId: w.WorkspaceID,
			Name:        w.Name,
			AccountType: jetAccountTypeToConnectAccountType[w.AccountType],
			Balance: &fijoyv1.Money{
				Units: w.Balance.IntPart(),
				Nanos: int32(w.Balance.Coefficient().Int64() - (w.Balance.IntPart() * 1e8)),
			},
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
	workspaceId := req.Header().Get("Fijoy-Workspace-Id")

	stmt := SELECT(FijoyAccount.AllColumns).FROM(FijoyAccount).
		WHERE(AND(
			FijoyAccount.ID.EQ(String(req.Msg.Id)),
			FijoyAccount.WorkspaceID.EQ(String(workspaceId)),
		))

	dest := entity.FijoyAccount{}

	err := stmt.Query(s.db, &dest)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&fijoyv1.Account{
		Id:          dest.ID,
		WorkspaceId: dest.WorkspaceID,
		Name:        dest.Name,
		AccountType: jetAccountTypeToConnectAccountType[dest.AccountType],
		Balance: &fijoyv1.Money{
			Units: dest.Balance.IntPart(),
			Nanos: int32(dest.Balance.CoefficientInt64()),
		},
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
	workspaceId := req.Header().Get("Fijoy-Workspace-Id")
	if workspaceId == "" {
		err := connect.NewError(
			connect.CodeInvalidArgument,
			errors.New("missing Fijoy-Workspace-Id in request header"),
		)
		return nil, err
	}

	stmt := FijoyAccount.DELETE().WHERE(FijoyAccount.ID.EQ(String(req.Msg.Id))).RETURNING(FijoyAccount.AllColumns)

	dest := entity.FijoyAccount{}

	err := stmt.Query(s.db, &dest)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&fijoyv1.Account{
		Id:          dest.ID,
		WorkspaceId: dest.WorkspaceID,
		Name:        dest.Name,
		AccountType: jetAccountTypeToConnectAccountType[dest.AccountType],
		Balance: &fijoyv1.Money{
			Units: dest.Balance.IntPart(),
			Nanos: int32(dest.Balance.CoefficientInt64()),
		},
		Currency:    dest.Currency,
		Institution: dest.Institution,
		CreatedAt:   timestamppb.New(dest.CreatedAt),
		UpdatedAt:   timestamppb.New(dest.UpdatedAt),
	}), nil
}
