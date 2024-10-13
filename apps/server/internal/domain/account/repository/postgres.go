package repository

import (
	"context"
	"fijoy/ent"
	"fijoy/ent/account"
	"fijoy/ent/profile"

	fijoyv1 "fijoy/proto/fijoy/v1"

	"github.com/shopspring/decimal"
)

type AccountRepository interface {
	CreateAccount(ctx context.Context, client *ent.Client, profileId string, req *fijoyv1.CreateAccountRequest) (*ent.Account, error)

	GetAccount(ctx context.Context, client *ent.Client, id string) (*ent.Account, error)
	GetAccounts(ctx context.Context, client *ent.Client, profileId string) ([]*ent.Account, error)

	UpdateAccount(ctx context.Context, client *ent.Client, id string, req UpdateAccountRequest) (*ent.Account, error)

	DeleteAccount(ctx context.Context, client *ent.Client, id string) error
}

type accountRepository struct{}

func NewAccountRepository() *accountRepository {
	return &accountRepository{}
}

func accountTypeProtoToModel(accountType fijoyv1.AccountType) account.AccountType {
	switch accountType {
	case fijoyv1.AccountType_ACCOUNT_TYPE_LIQUIDITY:
		return account.AccountTypeLiquidity
	case fijoyv1.AccountType_ACCOUNT_TYPE_INVESTMENT:
		return account.AccountTypeInvestment
	case fijoyv1.AccountType_ACCOUNT_TYPE_PROPERTY:
		return account.AccountTypeProperty
	case fijoyv1.AccountType_ACCOUNT_TYPE_RECEIVABLE:
		return account.AccountTypeReceivable
	case fijoyv1.AccountType_ACCOUNT_TYPE_LIABILITY:
		return account.AccountTypeLiability
	default:
		panic("unknown account type")
	}
}

func accountSymbolTypeProtoToModel(accountSymbolType fijoyv1.AccountSymbolType) account.SymbolType {
	switch accountSymbolType {
	case fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_CURRENCY:
		return account.SymbolTypeCurrency
	case fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_CRYPTO:
		return account.SymbolTypeCrypto
	case fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_STOCK:
		return account.SymbolTypeStock
	default:
		panic("unknown account symbol type")
	}
}

func (r *accountRepository) CreateAccount(ctx context.Context, client *ent.Client, profileId string, req *fijoyv1.CreateAccountRequest) (*ent.Account, error) {
	account, err := client.Account.
		Create().
		SetProfileID(profileId).
		SetName(req.Name).
		SetAccountType(accountTypeProtoToModel(req.AccountType)).
		SetSymbol(req.Symbol).
		SetSymbolType(accountSymbolTypeProtoToModel(req.SymbolType)).
		SetAmount(decimal.Zero).
		SetValue(decimal.Zero).
		SetFxRate(decimal.Zero).
		SetBalance(decimal.Zero).
		Save(ctx)
	if err != nil {
		return nil, err
	}

	return account, nil
}

func (r *accountRepository) GetAccount(ctx context.Context, client *ent.Client, id string) (*ent.Account, error) {
	account, err := client.Account.Get(ctx, id)
	if err != nil {
		return nil, err
	}

	return account, nil
}

func (r *accountRepository) GetAccounts(ctx context.Context, client *ent.Client, profileId string) ([]*ent.Account, error) {
	account, err := client.Account.Query().
		Where(account.HasProfileWith(profile.ID(profileId))).
		All(ctx)
	if err != nil {
		return nil, err
	}

	return account, nil
}

type UpdateAccountRequest struct {
	Name              *string
	Archived          *bool
	IncludeInNetWorth *bool

	Amount  *decimal.Decimal
	Value   *decimal.Decimal
	FxRate  *decimal.Decimal
	Balance *decimal.Decimal
}

func (r *accountRepository) UpdateAccount(ctx context.Context, client *ent.Client, id string, req UpdateAccountRequest) (*ent.Account, error) {
	update := client.Account.UpdateOneID(id)

	if req.Name != nil && *req.Name != "" {
		update = update.SetName(*req.Name)
	}
	if req.Archived != nil {
		update = update.SetArchived(*req.Archived)
	}
	if req.IncludeInNetWorth != nil {
		update = update.SetIncludeInNetWorth(*req.IncludeInNetWorth)
	}

	if req.Amount != nil {
		update = update.SetAmount(*req.Amount)
	}
	if req.Value != nil {
		update = update.SetValue(*req.Value)
	}
	if req.FxRate != nil {
		update = update.SetFxRate(*req.FxRate)
	}
	if req.Balance != nil {
		update = update.SetBalance(*req.Balance)
	}

	account, err := update.Save(ctx)
	if err != nil {
		return nil, err
	}

	return account, nil
}

func (r *accountRepository) DeleteAccount(ctx context.Context, client *ent.Client, id string) error {
	err := client.Account.DeleteOneID(id).Exec(ctx)
	if err != nil {
		return err
	}

	return nil
}
