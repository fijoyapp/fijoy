package repository

import (
	"context"
	"fijoy/ent"
	"fijoy/ent/account"
	"fijoy/ent/profile"
	"fijoy/ent/transaction"

	"github.com/shopspring/decimal"
)

type TransactionRepository interface {
	CreateTransaction(ctx context.Context, client *ent.Client, req CreateTransactionRequest) (*ent.Transaction, error)

	GetTransaction(ctx context.Context, client *ent.Client, id string) (*ent.Transaction, error)
	GetTransactions(ctx context.Context, client *ent.Client, profileId string) ([]*ent.Transaction, error)
	GetTransactionsByAccount(ctx context.Context, client *ent.Client, accountId string) ([]*ent.Transaction, error)

	DeleteTransaction(ctx context.Context, client *ent.Client, id string) error
}

type transactionRepository struct{}

func NewTransactionRepository() *transactionRepository {
	return &transactionRepository{}
}

type CreateTransactionRequest struct {
	ProfileId string
	AccountId string
	Amount    decimal.Decimal

	Note string
}

func (r *transactionRepository) CreateTransaction(ctx context.Context, client *ent.Client, req CreateTransactionRequest) (*ent.Transaction, error) {
	transaction, err := client.Transaction.Create().
		SetProfileID(req.ProfileId).
		SetAccountID(req.AccountId).
		SetAmount(req.Amount).
		SetNote(req.Note).Save(ctx)
	if err != nil {
		return nil, err
	}

	return transaction, nil
}

func (r *transactionRepository) GetTransaction(ctx context.Context, client *ent.Client, id string) (*ent.Transaction, error) {
	transaction, err := client.Transaction.Query().
		Where(transaction.ID(id)).
		WithAccount(func(q *ent.AccountQuery) {
			q.Select(account.FieldID).Select(account.FieldName)
		}).
		Only(ctx)
	if err != nil {
		return nil, err
	}

	return transaction, nil
}

func (r *transactionRepository) GetTransactions(ctx context.Context, client *ent.Client, profileId string) ([]*ent.Transaction, error) {
	transaction, err := client.Transaction.Query().
		Where(transaction.HasProfileWith(profile.ID(profileId))).
		WithAccount(func(q *ent.AccountQuery) {
			q.Select(account.FieldID).Select(account.FieldName)
		}).
		All(ctx)
	if err != nil {
		return nil, err
	}

	return transaction, nil
}

func (r *transactionRepository) GetTransactionsByAccount(ctx context.Context, client *ent.Client, accountId string) ([]*ent.Transaction, error) {
	transaction, err := client.Transaction.Query().
		Where(transaction.HasAccountWith(account.ID(accountId))).
		WithAccount(func(q *ent.AccountQuery) {
			q.Select(account.FieldID).Select(account.FieldName)
		}).
		All(ctx)
	if err != nil {
		return nil, err
	}

	return transaction, nil
}

func (r *transactionRepository) DeleteTransaction(ctx context.Context, client *ent.Client, id string) error {
	err := client.Transaction.DeleteOneID(id).Exec(ctx)
	if err != nil {
		return err
	}
	return nil
}
