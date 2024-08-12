package repository

import (
	"context"
	"database/sql"
	"fijoy/internal/domain/account"

	. "fijoy/internal/gen/postgres/table"

	. "github.com/go-jet/jet/v2/postgres"
)

type AccountRepository interface {
	// CreateProfileTX(ctx context.Context, tx *sql.Tx, userId string, req *fijoyv1.CreateProfileRequest) (*model.FijoyProfile, error)
	// DeleteProfileTX(ctx context.Context, tx *sql.Tx, id string) (*model.FijoyProfile, error)
	// UpdateCurrencyTX(ctx context.Context, tx *sql.Tx, id string, req *fijoyv1.UpdateCurrencyRequest) (*model.FijoyProfile, error)
	// UpdateLocaleTX(ctx context.Context, tx *sql.Tx, id string, req *fijoyv1.UpdateLocaleRequest) (*model.FijoyProfile, error)

	GetAccountById(ctx context.Context, id string) (*account.FijoyAccount, error)
	GetAccounts(ctx context.Context, profileId string) ([]*account.FijoyAccount, error)
}

type accountRepository struct {
	db *sql.DB
}

func NewAccountRepository(db *sql.DB) *accountRepository {
	return &accountRepository{db: db}
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
