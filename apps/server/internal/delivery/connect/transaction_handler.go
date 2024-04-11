package handler

import (
	"context"
	"database/sql"
	"errors"
	"fijoy/internal/entity"
	"fijoy/internal/gen/postgres/model"
	"fijoy/internal/gen/proto/fijoy/v1/fijoyv1connect"
	"fijoy/internal/util"

	. "fijoy/internal/gen/postgres/table"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
	. "github.com/go-jet/jet/v2/postgres"
	"github.com/nrednav/cuid2"
	"github.com/shopspring/decimal"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"

	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"
)

type TransactionServer struct {
	db *sql.DB
}

func NewTransactionHandler(r *chi.Mux, tokenAuth *jwtauth.JWTAuth, db *sql.DB) {
	transactionServer := &TransactionServer{db: db}

	path, handler := fijoyv1connect.NewTransactionServiceHandler(transactionServer)

	r.Group(func(r chi.Router) {
		r.Use(jwtauth.Verifier(tokenAuth))
		r.Use(jwtauth.Authenticator(tokenAuth))

		r.Mount(path, handler)
	})
}

func (s *TransactionServer) CreateIncomeTransaction(
	ctx context.Context,
	req *connect.Request[fijoyv1.CreateIncomeTransactionRequest],
) (*connect.Response[fijoyv1.Transaction], error) {
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

	tx, err := s.db.BeginTx(ctx, &sql.TxOptions{
		Isolation: sql.LevelSerializable,
		ReadOnly:  false,
	})
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	stmt := FijoyAccount.SELECT(FijoyAccount.AllColumns).WHERE(AND(FijoyAccount.ID.EQ(String(req.Msg.AccountId))))

	account := entity.FijoyAccount{}

	err = stmt.QueryContext(ctx, s.db, &account)
	if err != nil {
		return nil, err
	}

	if account.WorkspaceID != workspaceId {
		return nil, connect.NewError(connect.CodePermissionDenied, errors.New("user does not have edit permission"))
	}

	amount := decimal.NewFromInt(req.Msg.Amount.Units).
		Add(decimal.New(int64(req.Msg.Amount.Nanos), -9))

	after := account.Balance.Add(amount)

	account.Balance = after

	transaction := entity.FijoyTransaction{
		FijoyTransaction: model.FijoyTransaction{
			ID:              "transaction_" + cuid2.Generate(),
			TransactionType: model.FijoyTransactionType_Income,
			Currency:        "CAD", // TODO: do not hard code
			AccountID:       account.ID,
			UserID:          userId,
			WorkspaceID:     workspaceId,
			Datetime:        req.Msg.Datetime.AsTime(),
			Note:            req.Msg.Note,
			CategoryID:      req.Msg.CategoryId,
			Entity:          req.Msg.Entity,
		},
		Amount: amount,
	}

	insertTransactionStmt := FijoyTransaction.INSERT(FijoyTransaction.AllColumns).MODEL(transaction).
		RETURNING(FijoyTransaction.AllColumns)

	dest := entity.FijoyTransaction{}

	err = insertTransactionStmt.QueryContext(ctx, s.db, &dest)
	if err != nil {
		return nil, err
	}

	updateAccountStmt := FijoyAccount.UPDATE(FijoyAccount.Balance).MODEL(account).WHERE(FijoyAccount.ID.EQ(String(account.ID)))

	_, err = updateAccountStmt.ExecContext(ctx, s.db)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&fijoyv1.Transaction{
		Id:              dest.ID,
		AccountId:       dest.AccountID,
		UserId:          userId,
		WorkspaceId:     workspaceId,
		TransactionType: fijoyv1.TransactionType_TRANSACTION_TYPE_INCOME,
		Amount:          util.DecimalToMoney(dest.Amount, account.Currency),
		Datetime:        timestamppb.New(dest.Datetime),
		CategoryId:      dest.CategoryID,
		Entity:          dest.Entity,
		Note:            dest.Note,
	}), nil
}

func (s *TransactionServer) CreateAdjustmentTransaction(
	ctx context.Context,
	req *connect.Request[fijoyv1.CreateAdjustmentTransactionRequest],
) (*connect.Response[fijoyv1.Transaction], error) {
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

	tx, err := s.db.BeginTx(ctx, &sql.TxOptions{
		Isolation: sql.LevelSerializable,
		ReadOnly:  false,
	})
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	stmt := FijoyAccount.SELECT(FijoyAccount.AllColumns).WHERE(FijoyAccount.ID.EQ(String(req.Msg.AccountId)))

	account := entity.FijoyAccount{}

	err = stmt.QueryContext(ctx, s.db, &account)
	if err != nil {
		return nil, err
	}

	if account.WorkspaceID != workspaceId {
		return nil, connect.NewError(connect.CodePermissionDenied, errors.New("user does not have edit permission"))
	}

	amount := decimal.NewFromInt(req.Msg.Amount.Units).
		Add(decimal.New(int64(req.Msg.Amount.Nanos), -9))

	delta := amount.Sub(account.Balance)

	account.Balance = amount

	transaction := entity.FijoyTransaction{
		FijoyTransaction: model.FijoyTransaction{
			ID:              "transaction_" + cuid2.Generate(),
			TransactionType: model.FijoyTransactionType_Adjustment,
			Currency:        "CAD", // TODO: do not hard code
			AccountID:       account.ID,
			UserID:          userId,
			WorkspaceID:     workspaceId,
			Datetime:        req.Msg.Datetime.AsTime(),
			Note:            req.Msg.Note,
			CategoryID:      req.Msg.CategoryId,
			Entity:          req.Msg.Entity,
		},
		Amount: delta,
	}

	insertTransactionStmt := FijoyTransaction.INSERT(FijoyTransaction.AllColumns).MODEL(transaction).
		RETURNING(FijoyTransaction.AllColumns)

	dest := entity.FijoyTransaction{}

	err = insertTransactionStmt.QueryContext(ctx, s.db, &dest)
	if err != nil {
		return nil, err
	}

	updateAccountStmt := FijoyAccount.UPDATE(FijoyAccount.Balance).WHERE(FijoyAccount.ID.EQ(String(account.ID))).MODEL(account)

	_, err = updateAccountStmt.ExecContext(ctx, s.db)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&fijoyv1.Transaction{
		Id:              dest.ID,
		AccountId:       dest.AccountID,
		UserId:          userId,
		WorkspaceId:     workspaceId,
		TransactionType: fijoyv1.TransactionType_TRANSACTION_TYPE_INCOME,
		Amount:          util.DecimalToMoney(dest.Amount, account.Currency),
		Datetime:        timestamppb.New(dest.Datetime),
		CategoryId:      dest.CategoryID,
		Entity:          dest.Entity,
		Note:            dest.Note,
	}), nil
}

func (s *TransactionServer) GetTransactions(
	ctx context.Context,
	req *connect.Request[emptypb.Empty],
) (*connect.Response[fijoyv1.Transactions], error) {
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

	stmt := SELECT(FijoyTransaction.AllColumns).FROM(FijoyTransaction).
		WHERE(FijoyTransaction.WorkspaceID.EQ(String(workspaceId)))

	dest := []entity.FijoyTransaction{}

	err = stmt.Query(s.db, &dest)
	if err != nil {
		return nil, err
	}

	transactions := make([]*fijoyv1.Transaction, len(dest))
	for i, w := range dest {
		transactions[i] = &fijoyv1.Transaction{
			Id:              w.ID,
			AccountId:       w.AccountID,
			UserId:          userId,
			WorkspaceId:     workspaceId,
			TransactionType: util.JetTransactionTypeToConnectTransactionType[w.TransactionType],
			Amount:          util.DecimalToMoney(w.Amount, w.Currency),
			Datetime:        timestamppb.New(w.Datetime),
			CategoryId:      w.CategoryID,
			Entity:          w.Entity,
			Note:            w.Note,
		}
	}

	res := connect.NewResponse(&fijoyv1.Transactions{
		Transactions: transactions,
	})

	return res, nil
}
