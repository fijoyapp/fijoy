package usecase

import (
	"context"
	"database/sql"
	"fijoy/internal/domain/account"
	"fijoy/internal/domain/account/repository"
	"fijoy/internal/gen/postgres/model"
	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"

	"github.com/go-playground/validator/v10"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type AccountUseCase interface {
	GetAccountById(ctx context.Context, profileId string, req *fijoyv1.GetAccountByIdRequest) (*fijoyv1.Account, error)
	GetAccounts(ctx context.Context, profileId string) (*fijoyv1.Accounts, error)
	CreateAccount(ctx context.Context, profileId string, req *fijoyv1.CreateAccountRequest) (*fijoyv1.Account, error)

	// CreateProfile(ctx context.Context, userId string, req *fijoyv1.CreateProfileRequest) (*fijoyv1.Profile, error)
	// DeleteProfile(ctx context.Context, id string) (*fijoyv1.Profile, error)
	// UpdateCurrency(ctx context.Context, id string, req *fijoyv1.UpdateCurrencyRequest) (*fijoyv1.Profile, error)
	// UpdateLocale(ctx context.Context, id string, req *fijoyv1.UpdateLocaleRequest) (*fijoyv1.Profile, error)
}

type accountUseCase struct {
	validator *validator.Validate

	db   *sql.DB
	repo repository.AccountRepository
}

func New(validator *validator.Validate, db *sql.DB, repo repository.AccountRepository) AccountUseCase {
	return &accountUseCase{validator: validator, db: db, repo: repo}
}

func accountModelToProto(account *account.FijoyAccount) *fijoyv1.Account {
	return &fijoyv1.Account{
		Id:          account.ID,
		ProfileId:   account.ProfileID,
		Name:        account.Name,
		AccountType: accountTypeModelToProto(account.AccountType),
		Active:      account.Active,

		CreatedAt: timestamppb.New(account.CreatedAt),
		UpdatedAt: timestamppb.New(account.UpdatedAt),
		Symbol:    *account.Symbol,
		Amount:    account.Amount.String(),
		Currency:  account.Currency,
		Value:     account.Value.String(),
		FxRate:    account.FxRate.String(),
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

	createdAccount, err := u.repo.CreateAccountTX(ctx, tx, profileId, req)
	if err != nil {
		return nil, err
	}
	return accountModelToProto(createdAccount), nil
}

func (u *accountUseCase) GetAccountById(ctx context.Context, profileId string, req *fijoyv1.GetAccountByIdRequest) (*fijoyv1.Account, error) {
	account, err := u.repo.GetAccountById(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	return accountModelToProto(account), nil
}

func (u *accountUseCase) GetAccounts(ctx context.Context, profileId string) (*fijoyv1.Accounts, error) {
	accounts, err := u.repo.GetAccounts(ctx, profileId)
	if err != nil {
		return nil, err
	}

	return accountsModelToProto(accounts), nil
}
