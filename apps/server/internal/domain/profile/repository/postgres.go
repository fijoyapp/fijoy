package repository

import (
	"context"
	"fijoy/ent"
	"fijoy/ent/profile"
	"fijoy/ent/user"
	fijoyv1 "fijoy/proto/fijoy/v1"
	"strings"

	"github.com/shopspring/decimal"
)

type ProfileRepository interface {
	CreateProfile(ctx context.Context, client *ent.Client, userId string, req *fijoyv1.CreateProfileRequest) (*ent.Profile, error)
	GetProfile(ctx context.Context, client *ent.Client, id string) (*ent.Profile, error)
	GetProfileByUser(ctx context.Context, client *ent.Client, userId string) (*ent.Profile, error)
	DeleteProfile(ctx context.Context, client *ent.Client, id string) error
	UpdateProfile(ctx context.Context, client *ent.Client, id string, req *fijoyv1.UpdateProfileRequest) (*ent.Profile, error)
}

type profileRepository struct{}

func NewProfileRepository() *profileRepository {
	return &profileRepository{}
}

func (r *profileRepository) CreateProfile(ctx context.Context, client *ent.Client, userId string, req *fijoyv1.CreateProfileRequest) (*ent.Profile, error) {
	profile, err := client.Profile.
		Create().
		SetCurrencies(strings.Join(req.Currencies, ",")).
		SetNetWorthGoal(decimal.RequireFromString(req.NetWorthGoal)).
		SetLocale("en-CA"). // TODO: remove hard coding
		SetUserID(userId).
		Save(ctx)
	if err != nil {
		return nil, err
	}

	return profile, nil
}

func (r *profileRepository) GetProfile(ctx context.Context, client *ent.Client, id string) (*ent.Profile, error) {
	profile, err := client.Profile.Get(ctx, id)
	if err != nil {
		return nil, err
	}

	return profile, nil
}

func (r *profileRepository) GetProfileByUser(ctx context.Context, client *ent.Client, userId string) (*ent.Profile, error) {
	profile, err := client.Profile.
		Query().
		Where(
			profile.HasUserWith(user.ID(userId)),
		).
		Only(ctx)
	if err != nil {
		return nil, err
	}

	return profile, nil
}

func (r *profileRepository) DeleteProfile(ctx context.Context, client *ent.Client, id string) error {
	err := client.Profile.DeleteOneID(id).Exec(ctx)
	if err != nil {
		return err
	}

	return nil
}

func (r *profileRepository) UpdateProfile(ctx context.Context, client *ent.Client, id string, req *fijoyv1.UpdateProfileRequest) (*ent.Profile, error) {
	update := client.Profile.UpdateOneID(id)

	if req.Currencies != nil {
		update = update.SetCurrencies(strings.Join(req.Currencies, ","))
	}

	if req.NetWorthGoal != nil {
		update = update.SetNetWorthGoal(decimal.RequireFromString(*req.NetWorthGoal))
	}

	profile, err := update.Save(ctx)
	if err != nil {
		return nil, err
	}

	return profile, nil
}
