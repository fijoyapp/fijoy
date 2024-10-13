package repository

import (
	"context"
	"fijoy/ent"
	"fijoy/ent/account"
	"fijoy/ent/accountsnapshot"
	"fijoy/ent/overallsnapshot"
	"fijoy/ent/profile"
	"time"

	"entgo.io/ent/dialect/sql"
	"github.com/shopspring/decimal"
)

type SnapshotRepository interface {
	CreateAccountSnapshot(ctx context.Context, client *ent.Client, req CreateAccountSnapshotRequest) (*ent.AccountSnapshot, error)
	CreateOverallSnapshot(ctx context.Context, client *ent.Client, req CreateOverallSnapshotRequest) (*ent.OverallSnapshot, error)

	GetOverallSnapshots(ctx context.Context, client *ent.Client, profileId string) ([]*ent.OverallSnapshot, error)
	GetAccountSnapshots(ctx context.Context, client *ent.Client, accountId string) ([]*ent.AccountSnapshot, error)

	GetLatestOverallSnapshot(ctx context.Context, client *ent.Client, profileId string) (*ent.OverallSnapshot, error)
	GetLatestAccountSnapshot(ctx context.Context, client *ent.Client, accountId string) (*ent.AccountSnapshot, error)
}

type snapshotRepository struct{}

func NewSnapshotRepository() *snapshotRepository {
	return &snapshotRepository{}
}

type CreateAccountSnapshotRequest struct {
	AccountId string
	Datehour  time.Time
	Balance   decimal.Decimal
}

func (r *snapshotRepository) CreateAccountSnapshot(ctx context.Context, client *ent.Client, req CreateAccountSnapshotRequest) (*ent.AccountSnapshot, error) {
	latestSnapshot, err := r.GetLatestAccountSnapshot(ctx, client, req.AccountId)
	if err != nil {
		return nil, err
	}

	if latestSnapshot.Datehour.Truncate(time.Hour).Equal(req.Datehour.Truncate(time.Hour)) {
		// Last snapshot already exists for the same hour, update it instead!
		snapshot, err := client.AccountSnapshot.UpdateOneID(latestSnapshot.ID).SetBalance(req.Balance).Save(ctx)
		if err != nil {
			return nil, err
		}

		return snapshot, nil
	}

	snapshot, err := client.AccountSnapshot.Create().
		SetDatehour(req.Datehour.Truncate(time.Hour)).
		SetAccountID(req.AccountId).
		SetBalance(req.Balance).
		Save(ctx)
	if err != nil {
		return nil, err
	}

	return snapshot, nil
}

type CreateOverallSnapshotRequest struct {
	ProfileId string
	Datehour  time.Time

	Liquidity  decimal.Decimal
	Investment decimal.Decimal
	Property   decimal.Decimal
	Receivable decimal.Decimal
	Liability  decimal.Decimal
}

func (r *snapshotRepository) CreateOverallSnapshot(ctx context.Context, client *ent.Client, req CreateOverallSnapshotRequest) (*ent.OverallSnapshot, error) {
	latestSnapshot, err := r.GetLatestOverallSnapshot(ctx, client, req.ProfileId)
	if err != nil {
		return nil, err
	}

	if latestSnapshot.Datehour.Truncate(time.Hour).Equal(req.Datehour.Truncate(time.Hour)) {
		// Last snapshot already exists for the same hour, update it instead!
		snapshot, err := client.OverallSnapshot.UpdateOneID(latestSnapshot.ID).
			SetLiquidity(req.Liquidity).
			SetInvestment(req.Investment).
			SetProperty(req.Property).
			SetReceivable(req.Receivable).
			SetLiability(req.Liability).
			Save(ctx)
		if err != nil {
			return nil, err
		}

		return snapshot, nil
	}

	snapshot, err := client.OverallSnapshot.Create().
		SetDatehour(req.Datehour.Truncate(time.Hour)).
		SetProfileID(req.ProfileId).
		SetLiquidity(req.Liquidity).
		SetInvestment(req.Investment).
		SetProperty(req.Property).
		SetReceivable(req.Receivable).
		SetLiability(req.Liability).
		Save(ctx)
	if err != nil {
		return nil, err
	}

	return snapshot, nil
}

func (r *snapshotRepository) GetOverallSnapshots(ctx context.Context, client *ent.Client, profileId string) ([]*ent.OverallSnapshot, error) {
	snapshot, err := client.OverallSnapshot.Query().
		Where(overallsnapshot.HasProfileWith(profile.ID(profileId))).
		All(ctx)
	if err != nil {
		return nil, err
	}

	return snapshot, nil
}

func (r *snapshotRepository) GetAccountSnapshots(ctx context.Context, client *ent.Client, accountId string) ([]*ent.AccountSnapshot, error) {
	snapshot, err := client.AccountSnapshot.Query().
		Where(accountsnapshot.HasAccountWith(account.ID(accountId))).
		All(ctx)
	if err != nil {
		return nil, err
	}

	return snapshot, nil
}

func (r *snapshotRepository) GetLatestOverallSnapshot(ctx context.Context, client *ent.Client, profileId string) (*ent.OverallSnapshot, error) {
	snapshot, err := client.OverallSnapshot.Query().
		Order(overallsnapshot.ByDatehour(sql.OrderDesc())).
		Where(overallsnapshot.HasProfileWith(profile.ID(profileId))).
		Only(ctx)
	if err != nil {
		return nil, err
	}

	return snapshot, nil
}

func (r *snapshotRepository) GetLatestAccountSnapshot(ctx context.Context, client *ent.Client, accountId string) (*ent.AccountSnapshot, error) {
	snapshot, err := client.AccountSnapshot.Query().
		Order(accountsnapshot.ByDatehour(sql.OrderDesc())).
		Where(accountsnapshot.HasAccountWith(account.ID(accountId))).
		Only(ctx)
	if err != nil {
		return nil, err
	}

	return snapshot, nil
}
