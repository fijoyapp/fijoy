package usecase

import (
	"context"
	"fijoy/internal/domain/user/repository"
	"fijoy/internal/gen/postgres/model"
	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"

	"google.golang.org/protobuf/types/known/timestamppb"
)

type UserUseCase interface {
	CreateUser(ctx context.Context, email string) (*fijoyv1.User, error)
	GetUser(ctx context.Context, userId string) (*fijoyv1.User, error)
	DeleteUser(ctx context.Context, userId string) (*fijoyv1.User, error)
}

type userUseCase struct {
	userRepo repository.UserRepository
}

func New(userRepo repository.UserRepository) UserUseCase {
	return &userUseCase{userRepo: userRepo}
}

func userModelToProto(user *model.FijoyUser) *fijoyv1.User {
	return &fijoyv1.User{
		Id:        user.ID,
		Email:     user.Email,
		CreatedAt: timestamppb.New(user.CreatedAt),
	}
}

func (u *userUseCase) CreateUser(ctx context.Context, email string) (*fijoyv1.User, error) {
	user, err := u.userRepo.CreateUser(ctx, email)
	if err != nil {
		return nil, err
	}

	return userModelToProto(user), nil
}

func (u *userUseCase) GetUser(ctx context.Context, userId string) (*fijoyv1.User, error) {
	user, err := u.userRepo.GetUser(ctx, userId)
	if err != nil {
		return nil, err
	}

	return userModelToProto(user), nil
}

func (u *userUseCase) DeleteUser(ctx context.Context, userId string) (*fijoyv1.User, error) {
	user, err := u.userRepo.DeleteUser(ctx, userId)
	if err != nil {
		return nil, err
	}

	return userModelToProto(user), nil
}
