package repository

import (
	"context"
	"database/sql"
	"fijoy/constants"
	"fijoy/internal/domain/transaction"
	"fijoy/internal/gen/postgres/model"
	"time"

	. "fijoy/internal/gen/postgres/table"
	fijoyv1 "fijoy/proto/fijoy/v1"

	. "github.com/go-jet/jet/v2/postgres"
	"github.com/nrednav/cuid2"
	"github.com/shopspring/decimal"
)

type TransactionRepository interface {
	CreateTransactionTX(ctx context.Context, tx *sql.Tx, profileId string, req *fijoyv1.CreateTransactionRequest, previousAmount decimal.Decimal, previousBalance decimal.Decimal) (*transaction.FijoyTransaction, error)

	GetTransactionById(ctx context.Context, profileId string, id string) (*transaction.FijoyTransaction, error)
	GetTransactions(ctx context.Context, profileId string) ([]*transaction.FijoyTransaction, error)
	GetTransactionsByAccountId(ctx context.Context, profileId string, accountId string) ([]*transaction.FijoyTransaction, error)
	GetLatestTransactionByAccountIdTX(ctx context.Context, tx *sql.Tx, profileId string, accountId string) (*transaction.FijoyTransaction, error)

	DeleteTransactionByIdTX(ctx context.Context, tx *sql.Tx, profileId string, id string) (*transaction.FijoyTransaction, error)
}

type transactionRepository struct {
	db *sql.DB
}

func NewTransactionRepository(db *sql.DB) *transactionRepository {
	return &transactionRepository{db: db}
}

func (r *transactionRepository) CreateTransactionTX(ctx context.Context, tx *sql.Tx, profileId string, req *fijoyv1.CreateTransactionRequest, previousAmount decimal.Decimal, previousBalance decimal.Decimal) (*transaction.FijoyTransaction, error) {
	// FIXME: broken
	amount := decimal.RequireFromString(req.AmountDelta)
	value := decimal.RequireFromString(req.Value)
	fxRate := decimal.RequireFromString(req.FxRate)
	balance := amount.Mul(value).Mul(fxRate)

	newTransaction := transaction.FijoyTransaction{
		FijoyTransaction: model.FijoyTransaction{
			ID:        constants.TransactionPrefix + cuid2.Generate(),
			ProfileID: profileId,
			AccountID: req.AccountId,

			Note: &req.Note,

			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
		Amount:       amount,
		AmountDelta:  amount.Sub(previousAmount),
		Value:        value,
		FxRate:       fxRate,
		Balance:      amount.Mul(value).Mul(fxRate),
		BalanceDelta: balance.Sub(previousBalance),
	}

	dest := transaction.FijoyTransaction{}

	stmt := FijoyTransaction.
		INSERT(FijoyTransaction.AllColumns).
		MODEL(newTransaction).RETURNING(FijoyTransaction.AllColumns)

	err := stmt.QueryContext(ctx, tx, &dest)
	if err != nil {
		return nil, err
	}
	return &dest, nil
}

func (r *transactionRepository) GetTransactionById(ctx context.Context, profileId, id string) (*transaction.FijoyTransaction, error) {
	stmt := SELECT(FijoyTransaction.AllColumns).
		FROM(FijoyTransaction).
		WHERE(
			AND(
				FijoyTransaction.ID.EQ(String(id)),
				FijoyTransaction.ProfileID.EQ(String(profileId)),
			),
		)

	dest := transaction.FijoyTransaction{}

	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *transactionRepository) GetTransactions(ctx context.Context, profileId string) ([]*transaction.FijoyTransaction, error) {
	stmt := SELECT(FijoyTransaction.AllColumns).
		FROM(FijoyTransaction).
		WHERE(FijoyTransaction.ProfileID.EQ(String(profileId)))

	dest := []*transaction.FijoyTransaction{}

	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return dest, nil
}

func (r *transactionRepository) GetTransactionsByAccountId(ctx context.Context, profileId string, accountId string) ([]*transaction.FijoyTransaction, error) {
	stmt := SELECT(FijoyTransaction.AllColumns).
		FROM(FijoyTransaction).
		WHERE(
			AND(
				FijoyTransaction.ProfileID.EQ(String(profileId)),
				FijoyTransaction.AccountID.EQ(String(accountId)),
			),
		)

	dest := []*transaction.FijoyTransaction{}

	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return dest, nil
}

func (r *transactionRepository) GetLatestTransactionByAccountIdTX(ctx context.Context, tx *sql.Tx, profileId string, accountId string) (*transaction.FijoyTransaction, error) {
	stmt := SELECT(FijoyTransaction.AllColumns).
		FROM(FijoyTransaction).
		WHERE(
			AND(
				FijoyTransaction.ProfileID.EQ(String(profileId)),
				FijoyTransaction.AccountID.EQ(String(accountId)),
			),
		).
		ORDER_BY(FijoyTransaction.CreatedAt.DESC()).
		LIMIT(1)

	dest := transaction.FijoyTransaction{}

	err := stmt.QueryContext(ctx, tx, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *transactionRepository) DeleteTransactionByIdTX(ctx context.Context, tx *sql.Tx, profileId, id string) (*transaction.FijoyTransaction, error) {
	stmt := FijoyTransaction.
		DELETE().
		WHERE(
			AND(
				FijoyTransaction.ID.EQ(String(id)),
				FijoyTransaction.ProfileID.EQ(String(profileId)),
			),
		).
		RETURNING(FijoyTransaction.AllColumns)

	dest := transaction.FijoyTransaction{}

	err := stmt.QueryContext(ctx, tx, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}
