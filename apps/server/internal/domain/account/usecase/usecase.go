package usecase

import (
	"context"
	"errors"
	"fijoy/constants"
	"fijoy/ent"
	account_repository "fijoy/internal/domain/account/repository"
	profile_repository "fijoy/internal/domain/profile/repository"
	transaction_repository "fijoy/internal/domain/transaction/repository"
	"fijoy/internal/util/convert"
	"fijoy/internal/util/database"
	"fijoy/internal/util/market"
	fijoyv1 "fijoy/proto/fijoy/v1"
	"fmt"
	"strings"

	"github.com/go-playground/validator/v10"
	"github.com/shopspring/decimal"
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

	profileRepo profile_repository.ProfileRepository

	accountRepo     account_repository.AccountRepository
	transactionRepo transaction_repository.TransactionRepository
}

func New(validator *validator.Validate, entClient *ent.Client, marketDataClient market.MarketDataClient,
	profileRepo profile_repository.ProfileRepository,
	accountRepo account_repository.AccountRepository, transactionRepo transaction_repository.TransactionRepository,
) AccountUseCase {
	return &accountUseCase{
		validator: validator, entClient: entClient, marketDataClient: marketDataClient,
		profileRepo: profileRepo,
		accountRepo: accountRepo, transactionRepo: transactionRepo,
	}
}

func (u *accountUseCase) CreateAccount(ctx context.Context, profileId string, req *fijoyv1.CreateAccountRequest) (*fijoyv1.Account, error) {
	account, err := u.accountRepo.CreateAccount(ctx, u.entClient, profileId, req)
	if err != nil {
		return nil, err
	}

	profile, err := u.profileRepo.GetProfile(ctx, u.entClient, profileId)
	if err != nil {
		return nil, err
	}
	currencies := strings.Split(profile.Currencies, ",")

	updateAccountRequest := &account_repository.UpdateAccountRequest{}

	switch req.SymbolType {
	case fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_UNSPECIFIED:
		return nil, errors.New(constants.ErrAccountSymbolTypeMissing)
	case fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_CURRENCY:
		if currencies[0] == req.Symbol {
			fxRate := decimal.NewFromInt(1)
			updateAccountRequest.FxRate = &fxRate
		} else {
			fxRate, err := u.marketDataClient.GetFxRate(ctx, req.Symbol, currencies[0])
			if err != nil {
				return nil, err
			}

			updateAccountRequest.FxRate = &fxRate.Rate
		}
		value := decimal.NewFromInt(1)
		updateAccountRequest.Value = &value
	case fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_STOCK:
		assetInfo, err := u.marketDataClient.GetAssetInfo(ctx, req.Symbol)
		if err != nil {
			return nil, err
		}
		updateAccountRequest.Value = &assetInfo.CurrentPrice

		if assetInfo.Currency == currencies[0] {
			fxRate := decimal.NewFromInt(1)
			updateAccountRequest.FxRate = &fxRate
		} else {
			fxRate, err := u.marketDataClient.GetFxRate(ctx, assetInfo.Currency, currencies[0])
			if err != nil {
				return nil, err
			}

			updateAccountRequest.FxRate = &fxRate.Rate
		}

	case fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_CRYPTO:
		assetInfo, err := u.marketDataClient.GetAssetInfo(ctx, fmt.Sprintf("%s/%s", req.Symbol, currencies[0]))
		if err != nil {
			return nil, err
		}
		updateAccountRequest.Value = &assetInfo.CurrentPrice

		fxRate := decimal.NewFromInt(1)
		updateAccountRequest.FxRate = &fxRate
	}

	account, err = u.accountRepo.UpdateAccount(ctx, u.entClient, account.ID, *updateAccountRequest)
	if err != nil {
		return nil, err
	}

	return convert.AccountModelToProto(account), nil
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

	return convert.AccountModelToProto(account), nil
}

func (u *accountUseCase) GetAccounts(ctx context.Context, profileId string) (*fijoyv1.AccountList, error) {
	accounts, err := u.accountRepo.GetAccounts(ctx, u.entClient, profileId)
	if err != nil {
		return nil, err
	}

	return convert.AccountsModelToProto(accounts), nil
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

	return convert.AccountModelToProto(account), nil
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
