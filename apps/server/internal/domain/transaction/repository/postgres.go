package repository

import (
	"context"
	"fijoy/ent"
	"fijoy/ent/account"
	"fijoy/ent/profile"
	"fijoy/ent/transaction"
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
	// TODO: implement
}

func (r *transactionRepository) CreateTransaction(ctx context.Context, client *ent.Client, req CreateTransactionRequest) (*ent.Transaction, error) {
	// TODO: implement
	return nil, nil
}

func (r *transactionRepository) GetTransaction(ctx context.Context, client *ent.Client, id string) (*ent.Transaction, error) {
	transaction, err := client.Transaction.Query().
		Where(transaction.ID(id)).
		WithAccount(func(q *ent.AccountQuery) {
			q.Select(account.FieldID)
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
			q.Select(account.FieldID)
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
			q.Select(account.FieldID)
		}).
		All(ctx)
	if err != nil {
		return nil, err
	}

	return transaction, nil
}

func (r *transactionRepository) DeleteTransaction(ctx context.Context, client *ent.Client, id string) error {
	// TODO: implement
	return nil
}
