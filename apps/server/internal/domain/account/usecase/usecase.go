package usecase

import (
	"context"
	"errors"
	"fijoy/constants"
	"fijoy/ent"
	"fijoy/ent/account"
	account_repository "fijoy/internal/domain/account/repository"
	transaction_repository "fijoy/internal/domain/transaction/repository"
	"fijoy/internal/util/database"
	"fijoy/internal/util/market"
	fijoyv1 "fijoy/proto/fijoy/v1"

	"github.com/go-playground/validator/v10"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type AccountUseCase interface {
	CreateAccount(ctx context.Context, profileId string, req *fijoyv1.CreateAccountRequest) (*fijoyv1.Account, error)

	GetAccount(ctx context.Context, profileId string, req *fijoyv1.GetAccountRequest) (*fijoyv1.Account, error)
	GetAccounts(ctx context.Context, profileId string) (*fijoyv1.AccountList, error)

	UpdateAccount(ctx context.Context, profileId string, req *fijoyv1.UpdateAccountRequest) (*fijoyv1.Account, error)

	// DeleteAccount(ctx context.Context, profileId string, req *fijoyv1.DeleteAccountRequest) error
}

type accountUseCase struct {
	validator *validator.Validate

	entClient        *ent.Client
	marketDataClient market.MarketDataClient

	accountRepo     account_repository.AccountRepository
	transactionRepo transaction_repository.TransactionRepository
}

func New(validator *validator.Validate, entClient *ent.Client, marketDataClient market.MarketDataClient,
	accountRepo account_repository.AccountRepository, transactionRepo transaction_repository.TransactionRepository,
) AccountUseCase {
	return &accountUseCase{
		validator: validator, entClient: entClient, marketDataClient: marketDataClient,
		accountRepo: accountRepo, transactionRepo: transactionRepo,
	}
}

func accountModelToProto(account *ent.Account) *fijoyv1.Account {
	return &fijoyv1.Account{
		Id:          account.ID,
		Name:        account.Name,
		AccountType: accountTypeModelToProto(account.AccountType),

		Archived: account.Archived,

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

func accountsModelToProto(accounts []*ent.Account) *fijoyv1.AccountList {
	protoAccounts := make([]*fijoyv1.Account, len(accounts))
	for i, account := range accounts {
		protoAccounts[i] = accountModelToProto(account)
	}
	return &fijoyv1.AccountList{
		Items: protoAccounts,
	}
}

func accountTypeModelToProto(accountType account.AccountType) fijoyv1.AccountType {
	switch accountType {
	case account.AccountTypeLiquidity:
		return fijoyv1.AccountType_ACCOUNT_TYPE_LIQUIDITY
	case account.AccountTypeInvestment:
		return fijoyv1.AccountType_ACCOUNT_TYPE_INVESTMENT
	case account.AccountTypeProperty:
		return fijoyv1.AccountType_ACCOUNT_TYPE_PROPERTY
	case account.AccountTypeReceivable:
		return fijoyv1.AccountType_ACCOUNT_TYPE_RECEIVABLE
	case account.AccountTypeLiability:
		return fijoyv1.AccountType_ACCOUNT_TYPE_LIABILITY
	default:
		panic("unknown account type")
	}
}

func accountSymbolTypeModelToProto(accountSymbolType account.SymbolType) fijoyv1.AccountSymbolType {
	switch accountSymbolType {
	case account.SymbolTypeCurrency:
		return fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_CURRENCY
	case account.SymbolTypeCrypto:
		return fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_CRYPTO
	case account.SymbolTypeStock:
		return fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_STOCK
	default:
		panic("unknown account symbol type")
	}
}

func (u *accountUseCase) CreateAccount(ctx context.Context, profileId string, req *fijoyv1.CreateAccountRequest) (*fijoyv1.Account, error) {
	account, err := u.accountRepo.CreateAccount(ctx, u.entClient, profileId, req)
	if err != nil {
		return nil, err
	}

	return accountModelToProto(account), nil
}

func (u *accountUseCase) GetAccount(ctx context.Context, profileId string, req *fijoyv1.GetAccountRequest) (*fijoyv1.Account, error) {
	account, err := u.accountRepo.GetAccount(ctx, u.entClient, req.Id)
	if err != nil {
		return nil, err
	}

	id, err := account.QueryProfile().OnlyID(ctx)
	if err != nil {
		return nil, err
	}
	if id != profileId {
		return nil, errors.New(constants.ErrAccountNotFound)
	}

	return accountModelToProto(account), nil
}

func (u *accountUseCase) GetAccounts(ctx context.Context, profileId string) (*fijoyv1.AccountList, error) {
	accounts, err := u.accountRepo.GetAccounts(ctx, u.entClient, profileId)
	if err != nil {
		return nil, err
	}

	return accountsModelToProto(accounts), nil
}

func (u *accountUseCase) UpdateAccount(ctx context.Context, profileId string, req *fijoyv1.UpdateAccountRequest) (*fijoyv1.Account, error) {
	var account *ent.Account

	err := database.WithTx(ctx, u.entClient, func(tx *ent.Tx) error {
		var err error

		account, err = u.accountRepo.UpdateAccount(ctx, tx.Client(), req.Id, account_repository.UpdateAccountRequest{
			Name:     req.Name,
			Archived: req.Archived,
		})
		if err != nil {
			return err
		}

		return nil
	})
	if err != nil {
		return nil, err
	}

	return accountModelToProto(account), nil
}

// func (u *accountUseCase) DeleteAccount(ctx context.Context, profileId string, req *fijoyv1.DeleteAccountRequest) error {
// 	err := database.WithTx(ctx, u.client, func(tx *ent.Tx) error {
// 		var err error
// 		account, err := u.accountRepo.GetAccount(ctx, tx.Client(), req.Id)
// 		if err != nil {
// 			return err
// 		}
//
// 		id, err := account.QueryProfile().OnlyID(ctx)
// 		if err != nil {
// 			return err
// 		}
// 		if id != profileId {
// 			return errors.New(constants.ErrAccountNotFound)
// 		}
//
// 		err = u.accountRepo.DeleteAccount(ctx, tx.Client(), req.Id)
// 		if err != nil {
// 			return err
// 		}
//
// 		return nil
// 	})
// 	if err != nil {
// 		return err
// 	}
//
// 	return nil
// }
