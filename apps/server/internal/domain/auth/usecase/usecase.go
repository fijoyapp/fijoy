package usecase

import (
	"context"
	"fijoy/constants"
	"fijoy/ent"
	"fijoy/ent/profile"
	"fijoy/ent/user"
	"fijoy/internal/domain/user/repository"
	"fijoy/internal/util/database"
)

type AuthUseCase interface {
	LocalLogin(ctx context.Context) (*ent.User, error)
	GoogleLogin(ctx context.Context, email string, googleID string) (*ent.User, error)

	GetUserProfiles(ctx context.Context, userID int) ([]*ent.Profile, error)
}

type authUseCase struct {
	userRepo    repository.UserRepository
	userKeyRepo repository.UserKeyRepository
	client      *ent.Client
}

func New(userRepo repository.UserRepository, userKeyRepo repository.UserKeyRepository, client *ent.Client) AuthUseCase {
	return &authUseCase{userRepo: userRepo, userKeyRepo: userKeyRepo, client: client}
}

func (u *authUseCase) GetUserProfiles(ctx context.Context, userID int) ([]*ent.Profile, error) {
	profiles, err := u.client.Profile.Query().Where(profile.HasUsersWith(user.ID(userID))).All(ctx)
	if err != nil {
		return []*ent.Profile{}, err
	}

	return profiles, nil
}

func (u *authUseCase) LocalLogin(ctx context.Context) (*ent.User, error) {
	var user *ent.User
	var userKey *ent.UserKey

	err := database.WithTx(ctx, u.client, func(tx *ent.Tx) error {
		var err error

		userKey, err = u.userKeyRepo.GetUserKey(ctx, tx.Client(), constants.LocalUserKey)
		if err != nil {
			if ent.IsNotFound(err) {
				user, err := u.userRepo.CreateUser(ctx, tx.Client(), constants.LocalLoginEmail)
				if err != nil {
					return err
				}

				userKey, err = u.userKeyRepo.CreateUserKey(ctx, tx.Client(), constants.LocalUserKey, user.ID)
				if err != nil {
					return err
				}
			} else {
				return err
			}
		}

		user, err = u.userRepo.GetUser(ctx, tx.Client(), userKey.QueryUser().OnlyIDX(ctx))
		if err != nil {
			return err
		}

		return nil
	})
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (u *authUseCase) GoogleLogin(ctx context.Context, email string, googleID string) (*ent.User, error) {
	var user *ent.User
	var userKey *ent.UserKey

	err := database.WithTx(ctx, u.client, func(tx *ent.Tx) error {
		var err error

		userKey, err = u.userKeyRepo.GetUserKey(ctx, tx.Client(), constants.GoogleUserKey+googleID)
		if err != nil {
			if ent.IsNotFound(err) {
				user, err := u.userRepo.CreateUser(ctx, tx.Client(), email)
				if err != nil {
					return err
				}

				userKey, err = u.userKeyRepo.CreateUserKey(ctx, tx.Client(), constants.GoogleUserKey+googleID, user.ID)
				if err != nil {
					return err
				}
			} else {
				return err
			}
		}

		user, err = u.userRepo.GetUser(ctx, tx.Client(), userKey.QueryUser().OnlyIDX(ctx))
		if err != nil {
			return err
		}

		return nil
	})
	if err != nil {
		return nil, err
	}

	return user, nil
}
