package usecase

import (
	"context"
	"fijoy/internal/domain/user/repository"
	"fijoy/internal/gen/postgres/model"
	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"

	"github.com/go-jet/jet/qrm"
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
	localEmail := "local@fijoy.app"

	_, err := u.userKeyRepo.GetUserKey(ctx, "local:")

	if err == qrm.ErrNoRows {
		user, err := u.userRepo.CreateUser(ctx, localEmail)
		if err != nil {
			return nil, err
		}

		_, err = u.userKeyRepo.CreateUserKey(ctx, "local:", user.ID)
		if err != nil {
			return nil, err
		}

	} else if err != nil {
		return nil, err
	}

	user, err := u.userRepo.GetUser(ctx, localEmail)
	if err != nil {
		return nil, err
	}

	return userModelToProto(user), nil
}

func (u *authUseCase) GoogleLogin(ctx context.Context, email string, googleId string) (*fijoyv1.User, error) {
	_, err := u.userKeyRepo.GetUserKey(ctx, "local:")

	if err == qrm.ErrNoRows {
		_, err := u.userRepo.CreateUser(ctx, email)
		if err != nil {
			return nil, err
		}

		_, err = u.userKeyRepo.CreateUserKey(ctx, "google:", googleId)
		if err != nil {
			return nil, err
		}

	} else if err != nil {
		return nil, err
	}

	user, err := u.userRepo.GetUser(ctx, email)
	if err != nil {
		return nil, err
	}

	return userModelToProto(user), nil
}
