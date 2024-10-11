package usecase

import (
	"context"
	"fijoy/ent"
	"fijoy/internal/domain/user/repository"
	"fijoy/internal/util/database"
	fijoyv1 "fijoy/proto/fijoy/v1"

	"google.golang.org/protobuf/types/known/timestamppb"
)

type UserUseCase interface {
	CreateUser(ctx context.Context, email string) (*fijoyv1.User, error)
	GetUser(ctx context.Context, userId string) (*fijoyv1.User, error)
	DeleteUser(ctx context.Context, userId string) error
}

type userUseCase struct {
	userRepo repository.UserRepository
	client   *ent.Client
}

func New(userRepo repository.UserRepository, client *ent.Client) UserUseCase {
	return &userUseCase{userRepo: userRepo, client: client}
}

func userModelToProto(user *ent.User) *fijoyv1.User {
	return &fijoyv1.User{
		Id:        user.ID,
		Email:     user.Email,
		CreatedAt: timestamppb.New(user.CreatedAt),
	}
}

func (u *userUseCase) CreateUser(ctx context.Context, email string) (*fijoyv1.User, error) {
	var user *ent.User

	err := database.WithTx(ctx, u.client, func(tx *ent.Tx) error {
		var err error
		user, err = u.userRepo.CreateUser(ctx, tx.Client(), email)
		if err != nil {
			return nil
		}

		return err
	})
	if err != nil {
		return nil, err
	}

	return userModelToProto(user), nil
}

func (u *userUseCase) GetUser(ctx context.Context, userId string) (*fijoyv1.User, error) {
	var user *ent.User

	err := database.WithTx(ctx, u.client, func(tx *ent.Tx) error {
		var err error
		user, err = u.userRepo.GetUser(ctx, tx.Client(), userId)
		if err != nil {
			return nil
		}

		return err
	})
	if err != nil {
		return nil, err
	}

	return userModelToProto(user), nil
}

func (u *userUseCase) DeleteUser(ctx context.Context, userId string) error {
	err := database.WithTx(ctx, u.client, func(tx *ent.Tx) error {
		var err error
		err = u.userRepo.DeleteUser(ctx, tx.Client(), userId)
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
