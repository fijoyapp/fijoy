package usecase

import (
	"context"
	"errors"
	"fijoy/constants"
	"fijoy/ent"
	transaction_repository "fijoy/internal/domain/transaction/repository"
	fijoyv1 "fijoy/proto/fijoy/v1"

	"github.com/go-playground/validator/v10"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type TransactionUseCase interface {
	CreateTransaction(ctx context.Context, profileId string, req *fijoyv1.CreateTransactionRequest) (*fijoyv1.Transaction, error)

	GetTransaction(ctx context.Context, profileId string, req *fijoyv1.GetTransactionRequest) (*fijoyv1.Transaction, error)
	GetTransactionsByAccount(ctx context.Context, profileId string, req *fijoyv1.GetTransactionsByAccountRequest) (*fijoyv1.TransactionList, error)
	GetTransactions(ctx context.Context, profileId string) (*fijoyv1.TransactionList, error)

	UpdateTransaction(ctx context.Context, profileId string, req *fijoyv1.UpdateTransactionRequest) (*fijoyv1.Transaction, error)

	DeleteTransaction(ctx context.Context, profileId string, req *fijoyv1.DeleteTransactionRequest) error
}

type transactionUseCase struct {
	validator *validator.Validate

	client          *ent.Client
	transactionRepo transaction_repository.TransactionRepository
}

func New(validator *validator.Validate, client *ent.Client, transactionRepo transaction_repository.TransactionRepository) TransactionUseCase {
	return &transactionUseCase{validator: validator, client: client, transactionRepo: transactionRepo}
}

func transactionModelToProto(transaction *ent.Transaction) *fijoyv1.Transaction {
	return &fijoyv1.Transaction{
		Id:        transaction.ID,
		AccountId: transaction.Edges.Account.ID,

		Amount:       transaction.Amount.String(),
		AmountDelta:  transaction.AmountDelta.String(),
		Value:        transaction.Value.String(),
		FxRate:       transaction.FxRate.String(),
		Balance:      transaction.Balance.String(),
		BalanceDelta: transaction.BalanceDelta.String(),

		Note: transaction.Note,

		CreatedAt: timestamppb.New(transaction.CreatedAt),
		UpdatedAt: timestamppb.New(transaction.UpdatedAt),
	}
}

func transactionsModelToProto(transactions []*ent.Transaction) *fijoyv1.TransactionList {
	protoTransactions := make([]*fijoyv1.Transaction, len(transactions))
	for i, transaction := range transactions {
		protoTransactions[i] = transactionModelToProto(transaction)
	}
	return &fijoyv1.TransactionList{
		Items: protoTransactions,
	}
}

func (u *transactionUseCase) CreateTransaction(ctx context.Context, profileId string, req *fijoyv1.CreateTransactionRequest) (*fijoyv1.Transaction, error) {
	// TODO: Implement this method
	return nil, nil
}

func (u *transactionUseCase) GetTransaction(ctx context.Context, profileId string, req *fijoyv1.GetTransactionRequest) (*fijoyv1.Transaction, error) {
	transaction, err := u.transactionRepo.GetTransaction(ctx, u.client, req.Id)
	if err != nil {
		return nil, err
	}
	id, err := transaction.QueryProfile().OnlyID(ctx)
	if err != nil {
		return nil, err
	}
	if id != profileId {
		return nil, errors.New(constants.ErrTransactionNotFound)
	}

	return transactionModelToProto(transaction), nil
}

func (u *transactionUseCase) GetTransactions(ctx context.Context, profileId string) (*fijoyv1.TransactionList, error) {
	transactions, err := u.transactionRepo.GetTransactions(ctx, u.client, profileId)
	if err != nil {
		return nil, err
	}

	return transactionsModelToProto(transactions), nil
}

func (u *transactionUseCase) GetTransactionsByAccount(ctx context.Context, profileId string, req *fijoyv1.GetTransactionsByAccountRequest) (*fijoyv1.TransactionList, error) {
	transactions, err := u.transactionRepo.GetTransactionsByAccount(ctx, u.client, req.AccountId)
	if err != nil {
		return nil, err
	}

	return transactionsModelToProto(transactions), nil
}

func (u *transactionUseCase) UpdateTransaction(ctx context.Context, profileId string, req *fijoyv1.UpdateTransactionRequest) (*fijoyv1.Transaction, error) {
	// TODO: Implement this method
	return nil, nil
}

func (u *transactionUseCase) DeleteTransaction(ctx context.Context, profileId string, req *fijoyv1.DeleteTransactionRequest) error {
	// TODO: Implement this method
	return nil
}
