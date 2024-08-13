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
	// CreateProfileTX(ctx context.Context, tx *sql.Tx, userId string, req *fijoyv1.CreateProfileRequest) (*model.FijoyProfile, error)
	// DeleteProfileTX(ctx context.Context, tx *sql.Tx, id string) (*model.FijoyProfile, error)
	// UpdateCurrencyTX(ctx context.Context, tx *sql.Tx, id string, req *fijoyv1.UpdateCurrencyRequest) (*model.FijoyProfile, error)
	// UpdateLocaleTX(ctx context.Context, tx *sql.Tx, id string, req *fijoyv1.UpdateLocaleRequest) (*model.FijoyProfile, error)
	CreateAccountTX(ctx context.Context, tx *sql.Tx, profileId string, req *fijoyv1.CreateAccountRequest) (*account.FijoyAccount, error)

	GetAccountById(ctx context.Context, id string) (*account.FijoyAccount, error)
	GetAccounts(ctx context.Context, profileId string) ([]*account.FijoyAccount, error)
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

func (r *accountRepository) CreateAccountTX(ctx context.Context, tx *sql.Tx, profileId string, req *fijoyv1.CreateAccountRequest) (*account.FijoyAccount, error) {
	newAccount := account.FijoyAccount{
		FijoyAccount: model.FijoyAccount{
			ID:          constants.AccountPrefix + cuid2.Generate(),
			ProfileID:   profileId,
			Name:        req.Name,
			AccountType: accountTypeProtoToModel(req.AccountType),
			Active:      true,
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
			Symbol:      &req.Symbol,
			Currency:    req.Currency,
		},
		Amount: decimal.RequireFromString(req.Amount),
		Value:  decimal.RequireFromString(req.Value),
		FxRate: decimal.RequireFromString(req.FxRate),
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

func (r *accountRepository) GetAccountById(ctx context.Context, id string) (*account.FijoyAccount, error) {
	stmt := SELECT(FijoyAccount.AllColumns).
		FROM(FijoyAccount).
		WHERE(FijoyAccount.ID.EQ(String(id)))

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
