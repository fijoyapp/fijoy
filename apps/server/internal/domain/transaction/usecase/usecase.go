package usecase

import (
	"context"
	"errors"
	"fijoy/constants"
	"fijoy/ent"
	account_repository "fijoy/internal/domain/account/repository"
	transaction_repository "fijoy/internal/domain/transaction/repository"
	"fijoy/internal/middleware"
	"fijoy/internal/util/convert"
	"fijoy/internal/util/database"
	fijoyv1 "fijoy/proto/fijoy/v1"

	"github.com/go-playground/validator/v10"
	"github.com/shopspring/decimal"
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

	entClient       *ent.Client
	transactionRepo transaction_repository.TransactionRepository
	accountRepo     account_repository.AccountRepository
}

func New(validator *validator.Validate, entClient *ent.Client,
	transactionRepo transaction_repository.TransactionRepository,
	accountRepo account_repository.AccountRepository,
) TransactionUseCase {
	return &transactionUseCase{
		validator: validator, entClient: entClient,
		transactionRepo: transactionRepo,
		accountRepo:     accountRepo,
	}
}

func transactionModelToProto(transaction *ent.Transaction) *fijoyv1.Transaction {
	return &fijoyv1.Transaction{
		Id:      transaction.ID,
		Account: convert.AccountModelToProto(transaction.Edges.Account),

		Amount: transaction.Amount.String(),

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
	logger := middleware.GetLogger(ctx)
	var transaction *ent.Transaction

	err := database.WithTx(ctx, u.entClient, func(tx *ent.Tx) error {
		var err error

		// Make sure we have the proper permission
		targetAccount, err := u.accountRepo.GetAccount(ctx, tx.Client(), req.AccountId)
		if err != nil {
			logger.Error(err.Error())
			return err
		}

		id, err := targetAccount.QueryProfile().OnlyID(ctx)
		if err != nil {
			logger.Error(err.Error())
			return err
		}
		if id != profileId {
			return errors.New(constants.ErrAccountNotFound)
		}

		// Creating the transction
		transaction, err = u.transactionRepo.CreateTransaction(ctx, tx.Client(), transaction_repository.CreateTransactionRequest{
			ProfileId: profileId,
			AccountId: targetAccount.ID,
			Amount:    decimal.RequireFromString(req.Amount),
			Note:      req.Note,
		})
		if err != nil {
			logger.Error(err.Error())
			return err
		}

		// Update the account entity
		newAmount := transaction.Amount.Add(targetAccount.Amount)
		newBalance := newAmount.Mul(targetAccount.Value).Mul(targetAccount.FxRate)
		_, err = u.accountRepo.UpdateAccount(ctx, tx.Client(), targetAccount.ID, account_repository.UpdateAccountRequest{
			Amount:  &newAmount,
			Balance: &newBalance,
		})
		if err != nil {
			logger.Error(err.Error())
			return err
		}

		transaction, err = u.transactionRepo.GetTransaction(ctx, tx.Client(), transaction.ID)
		if err != nil {
			logger.Error(err.Error())
			return err
		}

		return nil
	})
	if err != nil {
		return nil, err
	}

	return transactionModelToProto(transaction), nil
}

func (u *transactionUseCase) GetTransaction(ctx context.Context, profileId string, req *fijoyv1.GetTransactionRequest) (*fijoyv1.Transaction, error) {
	transaction, err := u.transactionRepo.GetTransaction(ctx, u.entClient, req.Id)
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
	transactions, err := u.transactionRepo.GetTransactions(ctx, u.entClient, profileId)
	if err != nil {
		return nil, err
	}

	return transactionsModelToProto(transactions), nil
}

func (u *transactionUseCase) GetTransactionsByAccount(ctx context.Context, profileId string, req *fijoyv1.GetTransactionsByAccountRequest) (*fijoyv1.TransactionList, error) {
	transactions, err := u.transactionRepo.GetTransactionsByAccount(ctx, u.entClient, req.AccountId)
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
