package usecase

import (
	"context"
	"fijoy/constants"
	"fijoy/ent"
	"fijoy/ent/profile"
	"fijoy/ent/user"
	"fijoy/internal/domain/user/repository"
	"fijoy/internal/util/database"
	fijoyv1 "fijoy/proto/fijoy/v1"

	"google.golang.org/protobuf/types/known/timestamppb"
)

type AuthUseCase interface {
	LocalLogin(ctx context.Context) (*fijoyv1.User, error)
	GoogleLogin(ctx context.Context, email string, googleId string) (*fijoyv1.User, error)

	GetProfileId(ctx context.Context, userId string) (string, error)
}

type authUseCase struct {
	userRepo    repository.UserRepository
	userKeyRepo repository.UserKeyRepository
	client      *ent.Client
}

func New(userRepo repository.UserRepository, userKeyRepo repository.UserKeyRepository, client *ent.Client) AuthUseCase {
	return &authUseCase{userRepo: userRepo, userKeyRepo: userKeyRepo, client: client}
}

func (u *authUseCase) GetProfileId(ctx context.Context, userId string) (string, error) {
	profile, err := u.client.Profile.Query().Where(profile.HasUserWith(user.ID(userId))).Only(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return "", nil
		}
		return "", err
	}

	return profile.ID, nil
}

func userModelToProto(user *ent.User) *fijoyv1.User {
	return &fijoyv1.User{
		Id:        user.ID,
		Email:     user.Email,
		CreatedAt: timestamppb.New(user.CreatedAt),
	}
}

func (u *authUseCase) LocalLogin(ctx context.Context) (*fijoyv1.User, error) {
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

	return userModelToProto(user), nil
}

func (u *authUseCase) GoogleLogin(ctx context.Context, email string, googleId string) (*fijoyv1.User, error) {
	var user *ent.User
	var userKey *ent.UserKey

	err := database.WithTx(ctx, u.client, func(tx *ent.Tx) error {
		var err error

		userKey, err = u.userKeyRepo.GetUserKey(ctx, tx.Client(), constants.GoogleUserKey+googleId)
		if err != nil {
			if ent.IsNotFound(err) {
				user, err := u.userRepo.CreateUser(ctx, tx.Client(), constants.LocalLoginEmail)
				if err != nil {
					return err
				}

				userKey, err = u.userKeyRepo.CreateUserKey(ctx, tx.Client(), constants.GoogleUserKey+googleId, user.ID)
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

	return userModelToProto(user), nil
}
