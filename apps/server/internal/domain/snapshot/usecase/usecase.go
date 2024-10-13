package usecase

import (
	"context"
	"fijoy/ent"
	snapshot_repository "fijoy/internal/domain/snapshot/repository"
	fijoyv1 "fijoy/proto/fijoy/v1"

	"github.com/go-playground/validator/v10"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type SnapshotUseCase interface {
	GetOverallSnapshots(ctx context.Context, profileId string, req *fijoyv1.GetOverallSnapshotsRequest) (*fijoyv1.OverallSnapshotList, error)
	GetAccountSnapshots(ctx context.Context, profileId string, req *fijoyv1.GetAccountSnapshotsRequest) (*fijoyv1.AccountSnapshotList, error)
}

type snapshotUseCase struct {
	validator *validator.Validate

	client       *ent.Client
	snapshotRepo snapshot_repository.SnapshotRepository
}

func New(validator *validator.Validate, client *ent.Client, snapshotRepo snapshot_repository.SnapshotRepository) SnapshotUseCase {
	return &snapshotUseCase{validator: validator, client: client, snapshotRepo: snapshotRepo}
}

func overallSnapshotModelToProto(snapshot *ent.OverallSnapshot) *fijoyv1.OverallSnapshot {
	return &fijoyv1.OverallSnapshot{
		Id:       snapshot.ID,
		Datehour: timestamppb.New(snapshot.Datehour),

		Liquidity:  snapshot.Liquidity.String(),
		Investment: snapshot.Investment.String(),
		Property:   snapshot.Property.String(),
		Receivable: snapshot.Receivable.String(),
		Liability:  snapshot.Liability.String(),
	}
}

func overallSnapshotsModelToProto(snapshots []*ent.OverallSnapshot) *fijoyv1.OverallSnapshotList {
	protoSnapshots := make([]*fijoyv1.OverallSnapshot, len(snapshots))
	for i, snapshot := range snapshots {
		protoSnapshots[i] = overallSnapshotModelToProto(snapshot)
	}
	return &fijoyv1.OverallSnapshotList{
		Items: protoSnapshots,
	}
}

func accountSnapshotModelToProto(snapshot *ent.AccountSnapshot) *fijoyv1.AccountSnapshot {
	return &fijoyv1.AccountSnapshot{
		Id:       snapshot.ID,
		Datehour: timestamppb.New(snapshot.Datehour),

		Balance: snapshot.Balance.String(),
	}
}

func accountSnapshotsModelToProto(snapshots []*ent.AccountSnapshot) *fijoyv1.AccountSnapshotList {
	protoSnapshots := make([]*fijoyv1.AccountSnapshot, len(snapshots))
	for i, snapshot := range snapshots {
		protoSnapshots[i] = accountSnapshotModelToProto(snapshot)
	}
	return &fijoyv1.AccountSnapshotList{
		Items: protoSnapshots,
	}
}

func (u *snapshotUseCase) GetOverallSnapshots(ctx context.Context, profileId string, req *fijoyv1.GetOverallSnapshotsRequest) (*fijoyv1.OverallSnapshotList, error) {
	snapshots, err := u.snapshotRepo.GetOverallSnapshots(ctx, u.client, profileId)
	if err != nil {
		return nil, err
	}

	return overallSnapshotsModelToProto(snapshots), nil
}

func (u *snapshotUseCase) GetAccountSnapshots(ctx context.Context, profileId string, req *fijoyv1.GetAccountSnapshotsRequest) (*fijoyv1.AccountSnapshotList, error) {
	snapshots, err := u.snapshotRepo.GetAccountSnapshots(ctx, u.client, profileId)
	if err != nil {
		return nil, err
	}

	return accountSnapshotsModelToProto(snapshots), nil
}
