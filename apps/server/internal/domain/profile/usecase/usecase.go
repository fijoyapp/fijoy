package usecase

import (
	"context"
	"fijoy/constants"
	"fijoy/ent"
	"fijoy/internal/domain/profile/repository"
	"fijoy/internal/util/database"
	fijoyv1 "fijoy/proto/fijoy/v1"
	"strings"

	"github.com/go-playground/validator/v10"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type ProfileUseCase interface {
	CreateProfile(ctx context.Context, userId string, req *fijoyv1.CreateProfileRequest) (*fijoyv1.Profile, error)
	GetProfile(ctx context.Context, id string) (*fijoyv1.Profile, error)
	GetProfileByUser(ctx context.Context, userId string) (*fijoyv1.Profile, error)
	DeleteProfile(ctx context.Context, id string) error
	UpdateProfile(ctx context.Context, id string, req *fijoyv1.UpdateProfileRequest) (*fijoyv1.Profile, error)
}

type profileUseCase struct {
	validator *validator.Validate

	client *ent.Client

	repo repository.ProfileRepository
}

func New(validator *validator.Validate, client *ent.Client, repo repository.ProfileRepository) ProfileUseCase {
	return &profileUseCase{validator: validator, client: client, repo: repo}
}

func profileModelToProto(profile *ent.Profile) *fijoyv1.Profile {
	currencies := strings.Split(profile.Currencies, ",")

	return &fijoyv1.Profile{
		Id:           profile.ID,
		Currencies:   currencies,
		Locale:       constants.Currencies[currencies[0]].Locale,
		CreatedAt:    timestamppb.New(profile.CreatedAt),
		NetWorthGoal: profile.NetWorthGoal.String(),
	}
}

func (u *profileUseCase) CreateProfile(ctx context.Context, userId string, req *fijoyv1.CreateProfileRequest) (*fijoyv1.Profile, error) {
	var profile *ent.Profile

	err := database.WithTx(ctx, u.client, func(tx *ent.Tx) error {
		var err error
		profile, err = u.repo.CreateProfile(ctx, tx.Client(), userId, req)
		if err != nil {
			return nil
		}

		return err
	})
	if err != nil {
		return nil, err
	}

	return profileModelToProto(profile), nil
}

func (u *profileUseCase) GetProfile(ctx context.Context, id string) (*fijoyv1.Profile, error) {
	var profile *ent.Profile

	err := database.WithTx(ctx, u.client, func(tx *ent.Tx) error {
		var err error
		profile, err = u.repo.GetProfile(ctx, tx.Client(), id)
		if err != nil {
			return nil
		}

		return err
	})
	if err != nil {
		return nil, err
	}

	return profileModelToProto(profile), nil
}

func (u *profileUseCase) GetProfileByUser(ctx context.Context, userId string) (*fijoyv1.Profile, error) {
	var profile *ent.Profile

	err := database.WithTx(ctx, u.client, func(tx *ent.Tx) error {
		var err error
		profile, err = u.repo.GetProfileByUser(ctx, tx.Client(), userId)
		if err != nil {
			return nil
		}

		return err
	})
	if err != nil {
		return nil, err
	}

	return profileModelToProto(profile), nil
}

func (u *profileUseCase) DeleteProfile(ctx context.Context, id string) error {
	err := database.WithTx(ctx, u.client, func(tx *ent.Tx) error {
		var err error
		err = u.repo.DeleteProfile(ctx, tx.Client(), id)
		if err != nil {
			return nil
		}

		return err
	})
	if err != nil {
		return err
	}

	return nil
}

func (u *profileUseCase) UpdateProfile(ctx context.Context, id string, req *fijoyv1.UpdateProfileRequest) (*fijoyv1.Profile, error) {
	var profile *ent.Profile

	err := database.WithTx(ctx, u.client, func(tx *ent.Tx) error {
		var err error
		profile, err = u.repo.UpdateProfile(ctx, tx.Client(), id, req)
		if err != nil {
			return nil
		}

		return err
	})
	if err != nil {
		return nil, err
	}

	return profileModelToProto(profile), nil
}
