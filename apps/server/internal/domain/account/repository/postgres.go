package repository

import (
	"context"
	"database/sql"
	"fijoy/constants"
	"fijoy/internal/domain/account"
	"fijoy/internal/gen/postgres/model"
	"time"

	. "fijoy/internal/gen/postgres/table"
	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"

	. "github.com/go-jet/jet/v2/postgres"
	"github.com/nrednav/cuid2"
	"github.com/shopspring/decimal"
)

type AccountRepository interface {
	CreateAccountTX(ctx context.Context, tx *sql.Tx, profileId string, req *fijoyv1.CreateAccountRequest) (*account.FijoyAccount, error)

	GetAccountById(ctx context.Context, profileId string, id string) (*account.FijoyAccount, error)
	GetAccounts(ctx context.Context, profileId string) ([]*account.FijoyAccount, error)

	DeleteAccountByIdTX(ctx context.Context, tx *sql.Tx, profileId string, id string) (*account.FijoyAccount, error)
}

type accountRepository struct {
	db *sql.DB
}

func NewAccountRepository(db *sql.DB) *accountRepository {
	return &accountRepository{db: db}
}

func accountTypeProtoToModel(accountType fijoyv1.AccountType) model.FijoyAccountType {
	switch accountType {
	case fijoyv1.AccountType_ACCOUNT_TYPE_LIQUIDITY:
		return model.FijoyAccountType_Liquidity
	case fijoyv1.AccountType_ACCOUNT_TYPE_INVESTMENT:
		return model.FijoyAccountType_Investment
	case fijoyv1.AccountType_ACCOUNT_TYPE_PROPERTY:
		return model.FijoyAccountType_Property
	case fijoyv1.AccountType_ACCOUNT_TYPE_RECEIVABLE:
		return model.FijoyAccountType_Receivable
	case fijoyv1.AccountType_ACCOUNT_TYPE_LIABILITY:
		return model.FijoyAccountType_Liability
	default:
		panic("unknown account type")
	}
}

func accountSymbolTypeProtoToModel(accountSymbolType fijoyv1.AccountSymbolType) model.FijoyAccountSymbolType {
	switch accountSymbolType {
	case fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_CURRENCY:
		return model.FijoyAccountSymbolType_Currency
	case fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_CRYPTO:
		return model.FijoyAccountSymbolType_Crypto
	case fijoyv1.AccountSymbolType_ACCOUNT_SYMBOL_TYPE_STOCK:
		return model.FijoyAccountSymbolType_Stock
	default:
		panic("unknown account symbol type")
	}
}

func (r *accountRepository) CreateAccountTX(ctx context.Context, tx *sql.Tx, profileId string, req *fijoyv1.CreateAccountRequest) (*account.FijoyAccount, error) {
	value := decimal.RequireFromString(req.Value)
	fxRate := decimal.RequireFromString(req.FxRate)

	newAccount := account.FijoyAccount{
		FijoyAccount: model.FijoyAccount{
			ID:          constants.AccountPrefix + cuid2.Generate(),
			ProfileID:   profileId,
			Name:        req.Name,
			AccountType: accountTypeProtoToModel(req.AccountType),

			Archived:          false,
			IncludeInNetWorth: true,

			Symbol:     req.Symbol,
			SymbolType: accountSymbolTypeProtoToModel(req.SymbolType),

			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
		Amount:  decimal.Zero,
		Value:   value,
		FxRate:  fxRate,
		Balance: decimal.Zero,
	}

	dest := account.FijoyAccount{}

	stmt := FijoyAccount.
		INSERT(FijoyAccount.AllColumns).
		MODEL(newAccount).RETURNING(FijoyAccount.AllColumns)

	err := stmt.QueryContext(ctx, tx, &dest)
	if err != nil {
		return nil, err
	}
	return &dest, nil
}

func (r *accountRepository) GetAccountById(ctx context.Context, profileId, id string) (*account.FijoyAccount, error) {
	stmt := SELECT(FijoyAccount.AllColumns).
		FROM(FijoyAccount).
		WHERE(FijoyAccount.ID.EQ(String(id))).
		WHERE(FijoyAccount.ProfileID.EQ(String(profileId)))

	dest := account.FijoyAccount{}

	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *accountRepository) GetAccounts(ctx context.Context, profileId string) ([]*account.FijoyAccount, error) {
	stmt := SELECT(FijoyAccount.AllColumns).
		FROM(FijoyAccount).
		WHERE(FijoyAccount.ProfileID.EQ(String(profileId)))

	dest := []*account.FijoyAccount{}

	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return dest, nil
}

func (r *accountRepository) DeleteAccountByIdTX(ctx context.Context, tx *sql.Tx, profileId, id string) (*account.FijoyAccount, error) {
	stmt := FijoyAccount.
		DELETE().
		WHERE(FijoyAccount.ID.EQ(String(id))).
		WHERE(FijoyAccount.ProfileID.EQ(String(profileId))).
		RETURNING(FijoyAccount.AllColumns)

	dest := account.FijoyAccount{}

	err := stmt.QueryContext(ctx, tx, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}
