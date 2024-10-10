package usecase

import (
	"context"
	"errors"
	"fijoy/constants"
	"fijoy/internal/domain/user/repository"
	"fijoy/internal/gen/postgres/model"
	fijoyv1 "fijoy/proto/fijoy/v1"

	"github.com/go-jet/jet/v2/qrm"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type AuthUseCase interface {
	LocalLogin(ctx context.Context) (*fijoyv1.User, error)
	GoogleLogin(ctx context.Context, email string, googleId string) (*fijoyv1.User, error)
}

type authUseCase struct {
	userRepo    repository.UserRepository
	userKeyRepo repository.UserKeyRepository
}

func New(userRepo repository.UserRepository, userKeyRepo repository.UserKeyRepository) AuthUseCase {
	return &authUseCase{userRepo: userRepo, userKeyRepo: userKeyRepo}
}

func userModelToProto(user *model.FijoyUser) *fijoyv1.User {
	return &fijoyv1.User{
		Id:        user.ID,
		Email:     user.Email,
		CreatedAt: timestamppb.New(user.CreatedAt),
	}
}

func (u *authUseCase) LocalLogin(ctx context.Context) (*fijoyv1.User, error) {
	userKey, err := u.userKeyRepo.GetUserKey(ctx, constants.LocalUserKey)
	if err != nil {
		if errors.Is(err, qrm.ErrNoRows) {
			user, err := u.userRepo.CreateUser(ctx, constants.LocalLoginEmail)
			if err != nil {
				return nil, err
			}

			userKey, err = u.userKeyRepo.CreateUserKey(ctx, constants.LocalUserKey, user.ID)
			if err != nil {
				return nil, err
			}

		} else {
			return nil, err
		}
	}

	user, err := u.userRepo.GetUser(ctx, userKey.UserID)
	if err != nil {
		return nil, err
	}

	return userModelToProto(user), nil
}

func (u *authUseCase) GoogleLogin(ctx context.Context, email string, googleId string) (*fijoyv1.User, error) {
	userKey, err := u.userKeyRepo.GetUserKey(ctx, constants.GoogleUserKey+googleId)
	if err != nil {
		if errors.Is(err, qrm.ErrNoRows) {
			user, err := u.userRepo.CreateUser(ctx, email)
			if err != nil {
				return nil, err
			}

			userKey, err = u.userKeyRepo.CreateUserKey(ctx, constants.GoogleUserKey+googleId, user.ID)
			if err != nil {
				return nil, err
			}
		} else {
			return nil, err
		}
	}

	user, err := u.userRepo.GetUser(ctx, userKey.UserID)
	if err != nil {
		return nil, err
	}

	return userModelToProto(user), nil
}
