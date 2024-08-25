package usecase

import (
	"context"
	"database/sql"
	"fijoy/internal/domain/account"
	account_repository "fijoy/internal/domain/account/repository"
	transaction_repository "fijoy/internal/domain/transaction/repository"
	"fijoy/internal/gen/postgres/model"
	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"

	"github.com/go-playground/validator/v10"
	"github.com/shopspring/decimal"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type AccountUseCase interface {
	GetAccountById(ctx context.Context, profileId string, req *fijoyv1.GetAccountByIdRequest) (*fijoyv1.Account, error)
	GetAccounts(ctx context.Context, profileId string) (*fijoyv1.Accounts, error)
	CreateAccount(ctx context.Context, profileId string, req *fijoyv1.CreateAccountRequest) (*fijoyv1.Account, error)
	DeleteAccountById(ctx context.Context, profileId string, req *fijoyv1.DeleteAccountByIdRequest) (*fijoyv1.Account, error)
}

type accountUseCase struct {
	validator *validator.Validate

	db              *sql.DB
	accountRepo     account_repository.AccountRepository
	transactionRepo transaction_repository.TransactionRepository
}

func New(validator *validator.Validate, db *sql.DB, accountRepo account_repository.AccountRepository, transactionRepo transaction_repository.TransactionRepository) AccountUseCase {
	return &accountUseCase{validator: validator, db: db, accountRepo: accountRepo, transactionRepo: transactionRepo}
}

func accountModelToProto(account *account.FijoyAccount) *fijoyv1.Account {
	return &fijoyv1.Account{
		Id:                account.ID,
		ProfileId:         account.ProfileID,
		Name:              account.Name,
		AccountType:       accountTypeModelToProto(account.AccountType),
		Archived:          account.Archived,
		IncludeInNetWorth: account.IncludeInNetWorth,

		Symbol:     account.Symbol,
		SymbolType: accountSymbolTypeModelToProto(account.SymbolType),

		Amount:  account.Amount.String(),
		Value:   account.Value.String(),
		FxRate:  account.FxRate.String(),
		Balance: account.Balance.String(),

		CreatedAt: timestamppb.New(account.CreatedAt),
		UpdatedAt: timestamppb.New(account.UpdatedAt),
	}
}

func accountsModelToProto(accounts []*account.FijoyAccount) *fijoyv1.Accounts {
	protoAccounts := make([]*fijoyv1.Account, len(accounts))
	for i, account := range accounts {
		protoAccounts[i] = accountModelToProto(account)
	}
	return &fijoyv1.Accounts{
		Accounts: protoAccounts,
	}
}

func accountTypeModelToProto(accountType model.FijoyAccountType) fijoyv1.AccountType {
	switch accountType {
	case model.FijoyAccountType_Liquidity:
		return fijoyv1.AccountType_ACCOUNT_TYPE_LIQUIDITY
	case model.FijoyAccountType_Investment:
		return fijoyv1.AccountType_ACCOUNT_TYPE_INVESTMENT
	case model.FijoyAccountType_Property:
		return fijoyv1.AccountType_ACCOUNT_TYPE_PROPERTY
	case model.FijoyAccountType_Receivable:
		return fijoyv1.AccountType_ACCOUNT_TYPE_RECEIVABLE
	case model.FijoyAccountType_Liability:
		return fijoyv1.AccountType_ACCOUNT_TYPE_LIABILITY
	default:
		return fijoyv1.AccountType_ACCOUNT_TYPE_UNSPECIFIED
	}
}

func accountSymbolTypeModelToProto(accountSymbolType model.FijoyAccountSymbolType) fijoyv1.AccountSymbolType {
	switch accountSymbolType {
	case model.FijoyAccountSymbolType_Currency:
		return fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_CURRENCY
	case model.FijoyAccountSymbolType_Crypto:
		return fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_CRYPTO
	case model.FijoyAccountSymbolType_Stock:
		return fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_STOCK
	default:
		return fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_UNSPECIFIED
	}
}

func (u *accountUseCase) CreateAccount(ctx context.Context, profileId string, req *fijoyv1.CreateAccountRequest) (*fijoyv1.Account, error) {
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

	createdAccount, err := u.accountRepo.CreateAccountTX(ctx, tx, profileId, req)
	if err != nil {
		return nil, err
	}

	transactionReq := &fijoyv1.CreateTransactionRequest{
		AccountId: createdAccount.ID,
		Amount:    req.Amount,
		Value:     createdAccount.Value.String(),
		FxRate:    createdAccount.FxRate.String(),
		Note:      "Initial balance",
	}

	_, err = u.transactionRepo.CreateTransactionTX(ctx, tx, profileId, transactionReq, decimal.Zero, decimal.Zero)
	if err != nil {
		return nil, err
	}

	return accountModelToProto(createdAccount), nil
}

func (u *accountUseCase) GetAccountById(ctx context.Context, profileId string, req *fijoyv1.GetAccountByIdRequest) (*fijoyv1.Account, error) {
	account, err := u.accountRepo.GetAccountById(ctx, profileId, req.Id)
	if err != nil {
		return nil, err
	}

	return accountModelToProto(account), nil
}

func (u *accountUseCase) GetAccounts(ctx context.Context, profileId string) (*fijoyv1.Accounts, error) {
	accounts, err := u.accountRepo.GetAccounts(ctx, profileId)
	if err != nil {
		return nil, err
	}

	return accountsModelToProto(accounts), nil
}

func (u *accountUseCase) DeleteAccountById(ctx context.Context, profileId string, req *fijoyv1.DeleteAccountByIdRequest) (*fijoyv1.Account, error) {
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

	deletedAccount, err := u.accountRepo.DeleteAccountByIdTX(ctx, tx, profileId, req.Id)
	if err != nil {
		return nil, err
	}

	return accountModelToProto(deletedAccount), nil
}
