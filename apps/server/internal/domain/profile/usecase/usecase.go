package usecase

import (
	"context"
	"database/sql"
	"errors"
	"fijoy/constants"
	"fijoy/internal/domain/profile"
	"fijoy/internal/domain/profile/repository"
	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"
	"strings"

	"github.com/go-playground/validator/v10"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type ProfileUseCase interface {
	CreateProfile(ctx context.Context, userId string, req *fijoyv1.CreateProfileRequest) (*fijoyv1.Profile, error)
	GetProfileById(ctx context.Context, id string) (*fijoyv1.Profile, error)
	GetProfileByUserId(ctx context.Context, userId string) (*fijoyv1.Profile, error)
	DeleteProfile(ctx context.Context, id string) (*fijoyv1.Profile, error)
	UpdateProfile(ctx context.Context, id string, req *fijoyv1.UpdateProfileRequest) (*fijoyv1.Profile, error)
}

type profileUseCase struct {
	validator *validator.Validate

	db   *sql.DB
	repo repository.ProfileRepository
}

func New(validator *validator.Validate, db *sql.DB, repo repository.ProfileRepository) ProfileUseCase {
	return &profileUseCase{validator: validator, db: db, repo: repo}
}

func profileModelToProto(profile *profile.FijoyProfile) *fijoyv1.Profile {
	currencies := strings.Split(profile.Currencies, ",")

	return &fijoyv1.Profile{
		Id:           profile.ID,
		UserId:       profile.UserID,
		Currencies:   currencies,
		Locale:       constants.Currencies[currencies[0]].Locale,
		CreatedAt:    timestamppb.New(profile.CreatedAt),
		NetWorthGoal: profile.NetWorthGoal.String(),
	}
}

func (u *profileUseCase) CreateProfile(ctx context.Context, userId string, req *fijoyv1.CreateProfileRequest) (*fijoyv1.Profile, error) {
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

	if err := u.validator.Var(req.Currencies, "dive,iso4217"); err != nil {
		return nil, errors.New(constants.ErrInvalidCurrencyCode)
	}

	profile, err := u.repo.CreateProfileTX(ctx, tx, userId, req)
	if err != nil {
		return nil, err
	}

	return profileModelToProto(profile), nil
}

func (u *profileUseCase) GetProfileById(ctx context.Context, id string) (*fijoyv1.Profile, error) {
	profile, err := u.repo.GetProfileById(ctx, id)
	if err != nil {
		return nil, err
	}

	return profileModelToProto(profile), nil
}

func (u *profileUseCase) GetProfileByUserId(ctx context.Context, userId string) (*fijoyv1.Profile, error) {
	profile, err := u.repo.GetProfileByUserId(ctx, userId)
	if err != nil {
		return nil, err
	}

	return profileModelToProto(profile), nil
}

func (u *profileUseCase) DeleteProfile(ctx context.Context, id string) (*fijoyv1.Profile, error) {
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

	profile, err := u.repo.DeleteProfileTX(ctx, tx, id)
	if err != nil {
		return nil, err
	}

	return profileModelToProto(profile), nil
}

func (u *profileUseCase) UpdateProfile(ctx context.Context, id string, req *fijoyv1.UpdateProfileRequest) (*fijoyv1.Profile, error) {
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

	if err := u.validator.Var(req.Currencies, "dive,iso4217"); err != nil {
		return nil, errors.New(constants.ErrInvalidCurrencyCode)
	}

	profile, err := u.repo.UpdateProfileTX(ctx, tx, id, req)
	if err != nil {
		return nil, err
	}

	return profileModelToProto(profile), nil
}
