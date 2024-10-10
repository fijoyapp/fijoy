package usecase

import (
	"context"
	"database/sql"
	"errors"
	"fijoy/internal/domain/transaction"
	"fijoy/internal/domain/transaction/repository"
	fijoyv1 "fijoy/proto/fijoy/v1"

	"github.com/go-jet/jet/v2/qrm"
	"github.com/go-playground/validator/v10"
	"github.com/shopspring/decimal"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type TransactionUseCase interface {
	CreateTransaction(ctx context.Context, profileId string, req *fijoyv1.CreateTransactionRequest) (*fijoyv1.Transaction, error)

	GetTransactionById(ctx context.Context, profileId string, req *fijoyv1.GetTransactionByIdRequest) (*fijoyv1.Transaction, error)
	GetTransactionsByAccountId(ctx context.Context, profileId string, req *fijoyv1.GetTransactionsByAccountIdRequest) (*fijoyv1.TransactionList, error)
	GetTransactions(ctx context.Context, profileId string) (*fijoyv1.TransactionList, error)

	DeleteTransactionById(ctx context.Context, profileId string, req *fijoyv1.DeleteTransactionByIdRequest) (*fijoyv1.Transaction, error)
}

type transactionUseCase struct {
	validator *validator.Validate

	db   *sql.DB
	repo repository.TransactionRepository
}

func New(validator *validator.Validate, db *sql.DB, repo repository.TransactionRepository) TransactionUseCase {
	return &transactionUseCase{validator: validator, db: db, repo: repo}
}

func transactionModelToProto(transaction *transaction.FijoyTransaction) *fijoyv1.Transaction {
	return &fijoyv1.Transaction{
		Id:        transaction.ID,
		ProfileId: transaction.ProfileID,
		AccountId: transaction.AccountID,

		Amount:       transaction.Amount.String(),
		AmountDelta:  transaction.AmountDelta.String(),
		Value:        transaction.Value.String(),
		FxRate:       transaction.FxRate.String(),
		Balance:      transaction.Balance.String(),
		BalanceDelta: transaction.BalanceDelta.String(),

		Note: *transaction.Note,

		CreatedAt: timestamppb.New(transaction.CreatedAt),
		UpdatedAt: timestamppb.New(transaction.UpdatedAt),
	}
}

func transactionsModelToProto(transactions []*transaction.FijoyTransaction) *fijoyv1.TransactionList {
	protoTransactions := make([]*fijoyv1.Transaction, len(transactions))
	for i, transaction := range transactions {
		protoTransactions[i] = transactionModelToProto(transaction)
	}
	return &fijoyv1.TransactionList{
		Items: protoTransactions,
	}
}

func (u *transactionUseCase) CreateTransaction(ctx context.Context, profileId string, req *fijoyv1.CreateTransactionRequest) (*fijoyv1.Transaction, error) {
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

	latestTransaction, err := u.repo.GetLatestTransactionByAccountIdTX(ctx, tx, profileId, req.AccountId)

	var previousAmount decimal.Decimal
	var previousBalance decimal.Decimal

	if errors.Is(err, qrm.ErrNoRows) {
		previousAmount = decimal.Zero
		previousBalance = decimal.Zero
	} else if err != nil {
		return nil, err
	} else {
		previousAmount = latestTransaction.Amount
		previousBalance = latestTransaction.Balance
	}

	createdTransaction, err := u.repo.CreateTransactionTX(
		ctx, tx, profileId, req, previousAmount, previousBalance,
	)
	if err != nil {
		return nil, err
	}

	return transactionModelToProto(createdTransaction), nil
}

func (u *transactionUseCase) GetTransactionById(ctx context.Context, profileId string, req *fijoyv1.GetTransactionByIdRequest) (*fijoyv1.Transaction, error) {
	transaction, err := u.repo.GetTransactionById(ctx, profileId, req.Id)
	if err != nil {
		return nil, err
	}

	return transactionModelToProto(transaction), nil
}

func (u *transactionUseCase) GetTransactions(ctx context.Context, profileId string) (*fijoyv1.TransactionList, error) {
	transactions, err := u.repo.GetTransactions(ctx, profileId)
	if err != nil {
		return nil, err
	}

	return transactionsModelToProto(transactions), nil
}

func (u *transactionUseCase) GetTransactionsByAccountId(ctx context.Context, profileId string, req *fijoyv1.GetTransactionsByAccountIdRequest) (*fijoyv1.TransactionList, error) {
	transactions, err := u.repo.GetTransactionsByAccountId(ctx, profileId, req.AccountId)
	if err != nil {
		return nil, err
	}

	return transactionsModelToProto(transactions), nil
}

func (u *transactionUseCase) DeleteTransactionById(ctx context.Context, profileId string, req *fijoyv1.DeleteTransactionByIdRequest) (*fijoyv1.Transaction, error) {
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

	deletedTransaction, err := u.repo.DeleteTransactionByIdTX(ctx, tx, profileId, req.Id)
	if err != nil {
		return nil, err
	}

	return transactionModelToProto(deletedTransaction), nil
}
