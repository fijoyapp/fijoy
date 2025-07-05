package usecase

import (
	"context"
	"fijoy/ent"
	"fijoy/internal/domain/user/repository"
	"fijoy/internal/util/database"
)

type UserUseCase interface {
	CreateUser(ctx context.Context, email string) (*ent.User, error)
	GetUser(ctx context.Context, userId int) (*ent.User, error)
	DeleteUser(ctx context.Context, userId int) error
}

type userUseCase struct {
	userRepo repository.UserRepository
	client   *ent.Client
}

func New(userRepo repository.UserRepository, client *ent.Client) UserUseCase {
	return &userUseCase{userRepo: userRepo, client: client}
}

func (u *userUseCase) CreateUser(ctx context.Context, email string) (*ent.User, error) {
	var user *ent.User

	err := database.WithTx(ctx, u.client, func(tx *ent.Tx) error {
		var err error
		user, err = u.userRepo.CreateUser(ctx, tx.Client(), email)
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

func (u *userUseCase) GetUser(ctx context.Context, userID int) (*ent.User, error) {
	user, err := u.userRepo.GetUser(ctx, u.client, userID)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (u *userUseCase) DeleteUser(ctx context.Context, userID int) error {
	err := database.WithTx(ctx, u.client, func(tx *ent.Tx) error {
		err := u.userRepo.DeleteUser(ctx, tx.Client(), userID)
		if err != nil {
			return err
		}

		return nil
	})
	if err != nil {
		return err
	}

	return nil
}
