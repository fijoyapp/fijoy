package handler

import (
	"context"
	"errors"
	"fijoy/constants"
	"fijoy/internal/domain/snapshot/usecase"
	fijoyv1 "fijoy/proto/fijoy/v1"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
)

type snapshotHandler struct {
	useCase        usecase.SnapshotUseCase
	protoValidator *protovalidate.Validator
}

func NewSnapshotHandler(protoValidator *protovalidate.Validator, useCase usecase.SnapshotUseCase) *snapshotHandler {
	return &snapshotHandler{useCase: useCase, protoValidator: protoValidator}
}

func (h *snapshotHandler) GetOverallSnapshots(
	ctx context.Context,
	req *connect.Request[fijoyv1.GetOverallSnapshotsRequest],
) (*connect.Response[fijoyv1.OverallSnapshotList], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	profileId := ctx.Value("profileId").(string)
	if profileId == "" {
		return nil, errors.New(constants.ErrFijoyProfileIdMissing)
	}

	snapshot, err := h.useCase.GetOverallSnapshots(ctx, profileId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(snapshot), nil
}

func (h *snapshotHandler) GetAccountSnapshots(
	ctx context.Context,
	req *connect.Request[fijoyv1.GetAccountSnapshotsRequest],
) (*connect.Response[fijoyv1.AccountSnapshotList], error) {
	if err := h.protoValidator.Validate(req.Msg); err != nil {
		return nil, err
	}

	profileId := ctx.Value("profileId").(string)
	if profileId == "" {
		return nil, errors.New(constants.ErrFijoyProfileIdMissing)
	}

	snapshots, err := h.useCase.GetAccountSnapshots(ctx, profileId, req.Msg)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(snapshots), nil
}
