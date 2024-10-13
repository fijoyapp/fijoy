package repository

import (
	"context"
	"fijoy/ent"
	"fijoy/ent/account"
	"fijoy/ent/accountsnapshot"
	"fijoy/ent/overallsnapshot"
	"fijoy/ent/profile"
)

type SnapshotRepository interface {
	// CreateSnapshot(ctx context.Context, client *ent.Client, req CreateSnapshotRequest) (*ent.Snapshot, error)

	// GetSnapshot(ctx context.Context, client *ent.Client, id string) (*ent.Snapshot, error)
	GetOverallSnapshots(ctx context.Context, client *ent.Client, profileId string) ([]*ent.OverallSnapshot, error)
	GetAccountSnapshots(ctx context.Context, client *ent.Client, accountId string) ([]*ent.AccountSnapshot, error)
	// GetSnapshotsByAccount(ctx context.Context, client *ent.Client, accountId string) ([]*ent.Snapshot, error)

	// DeleteSnapshot(ctx context.Context, client *ent.Client, id string) error
}

type snapshotRepository struct{}

func NewSnapshotRepository() *snapshotRepository {
	return &snapshotRepository{}
}

// type CreateSnapshotRequest struct {
// 	OldAmount   decimal.Decimal
// 	AmountDelta decimal.Decimal
// 	Value       decimal.Decimal
// 	FxRate      decimal.Decimal
// 	OldBalance  decimal.Decimal
//
// 	Note string
// }
//
// func (r *snapshotRepository) CreateSnapshot(ctx context.Context, client *ent.Client, req CreateSnapshotRequest) (*ent.Snapshot, error) {
// 	balanceDelta := req.AmountDelta.Mul(req.Value).Mul(req.FxRate)
// 	newBalance := req.OldBalance.Add(balanceDelta)
// 	newAmount := req.OldAmount.Add(req.AmountDelta)
//
// 	snapshot, err := client.Snapshot.Create().
// 		SetAmount(newAmount).
// 		SetAmountDelta(req.AmountDelta).
// 		SetValue(req.Value).
// 		SetFxRate(req.FxRate).
// 		SetBalance(newBalance).
// 		SetBalanceDelta(balanceDelta).
// 		SetNote(req.Note).Save(ctx)
// 	if err != nil {
// 		return nil, err
// 	}
//
// 	return snapshot, nil
// }

// func (r *snapshotRepository) GetSnapshot(ctx context.Context, client *ent.Client, id string) (*ent.Snapshot, error) {
// 	snapshot, err := client.Snapshot.Query().
// 		Where(snapshot.ID(id)).
// 		WithAccount(func(q *ent.AccountQuery) {
// 			q.Select(account.FieldID).Select(account.FieldName)
// 		}).
// 		Only(ctx)
// 	if err != nil {
// 		return nil, err
// 	}
//
// 	return snapshot, nil
// }

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

// func (r *snapshotRepository) GetSnapshotsByAccount(ctx context.Context, client *ent.Client, accountId string) ([]*ent.Snapshot, error) {
// 	snapshot, err := client.Snapshot.Query().
// 		Where(snapshot.HasAccountWith(account.ID(accountId))).
// 		WithAccount(func(q *ent.AccountQuery) {
// 			q.Select(account.FieldID).Select(account.FieldName)
// 		}).
// 		All(ctx)
// 	if err != nil {
// 		return nil, err
// 	}
//
// 	return snapshot, nil
// }
//
// func (r *snapshotRepository) DeleteSnapshot(ctx context.Context, client *ent.Client, id string) error {
// 	err := client.Snapshot.DeleteOneID(id).Exec(ctx)
// 	if err != nil {
// 		return err
// 	}
// 	return nil
// }
