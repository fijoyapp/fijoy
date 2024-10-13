package usecase

import (
	"context"
	"errors"
	"fijoy/constants"
	"fijoy/ent"
	"fijoy/ent/account"
	account_repository "fijoy/internal/domain/account/repository"
	snapshot_repository "fijoy/internal/domain/snapshot/repository"
	transaction_repository "fijoy/internal/domain/transaction/repository"
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

	client          *ent.Client
	transactionRepo transaction_repository.TransactionRepository
	accountRepo     account_repository.AccountRepository
	snapshotRepo    snapshot_repository.SnapshotRepository
}

func New(validator *validator.Validate, client *ent.Client,
	transactionRepo transaction_repository.TransactionRepository,
	snapshotRepo snapshot_repository.SnapshotRepository,
	accountRepo account_repository.AccountRepository,
) TransactionUseCase {
	return &transactionUseCase{
		validator: validator, client: client,
		transactionRepo: transactionRepo,
		accountRepo:     accountRepo,
		snapshotRepo:    snapshotRepo,
	}
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
	var transaction *ent.Transaction

	err := database.WithTx(ctx, u.client, func(tx *ent.Tx) error {
		var err error

		targetAccount, err := u.accountRepo.GetAccount(ctx, tx.Client(), req.AccountId)
		if err != nil {
			return err
		}

		id, err := targetAccount.QueryProfile().OnlyID(ctx)
		if err != nil {
			return err
		}
		if id != profileId {
			return errors.New(constants.ErrAccountNotFound)
		}

		transaction, err = u.transactionRepo.CreateTransaction(ctx, tx.Client(), transaction_repository.CreateTransactionRequest{
			OldAmount:   targetAccount.Amount,
			AmountDelta: decimal.RequireFromString(req.AmountDelta),
			Value:       decimal.RequireFromString(req.Value),
			FxRate:      decimal.RequireFromString(req.FxRate),
			OldBalance:  targetAccount.Balance,
			Note:        req.Note,
		})
		if err != nil {
			return nil
		}

		_, err = u.snapshotRepo.CreateAccountSnapshot(ctx, tx.Client(), snapshot_repository.CreateAccountSnapshotRequest{
			Datehour: transaction.CreatedAt,
			Balance:  transaction.Balance,
		})
		if err != nil {
			return nil
		}

		lastestOverallSnapshot, err := u.snapshotRepo.GetLatestOverallSnapshot(ctx, tx.Client(), profileId)
		if err != nil {
			return err
		}

		switch targetAccount.AccountType {
		case account.AccountTypeLiquidity:
			lastestOverallSnapshot.Liquidity = lastestOverallSnapshot.Liquidity.Add(transaction.BalanceDelta)
		case account.AccountTypeInvestment:
			lastestOverallSnapshot.Investment = lastestOverallSnapshot.Investment.Add(transaction.BalanceDelta)
		case account.AccountTypeProperty:
			lastestOverallSnapshot.Property = lastestOverallSnapshot.Property.Add(transaction.BalanceDelta)
		case account.AccountTypeReceivable:
			lastestOverallSnapshot.Receivable = lastestOverallSnapshot.Receivable.Add(transaction.BalanceDelta)
		case account.AccountTypeLiability:
			lastestOverallSnapshot.Liability = lastestOverallSnapshot.Liability.Add(transaction.BalanceDelta)
		}

		_, err = u.snapshotRepo.CreateOverallSnapshot(
			ctx, tx.Client(), snapshot_repository.CreateOverallSnapshotRequest{
				Datehour:   transaction.CreatedAt,
				Liquidity:  lastestOverallSnapshot.Liquidity,
				Investment: lastestOverallSnapshot.Investment,
				Property:   lastestOverallSnapshot.Property,
				Receivable: lastestOverallSnapshot.Receivable,
				Liability:  lastestOverallSnapshot.Liability,
			})
		if err != nil {
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
