package repository

import (
	"context"
	"fijoy/ent"
)

type UserRepository interface {
	CreateUser(ctx context.Context, client *ent.Client, email string) (*ent.User, error)
	GetUser(ctx context.Context, client *ent.Client, id string) (*ent.User, error)
	DeleteUser(ctx context.Context, client *ent.Client, id string) error
}

type userRepository struct{}

func NewUserRepository() *userRepository {
	return &userRepository{}
}

type UserKeyRepository interface {
	CreateUserKey(ctx context.Context, client *ent.Client, id string, userId string) (*ent.UserKey, error)
	GetUserKey(ctx context.Context, client *ent.Client, id string) (*ent.UserKey, error)
	DeleteUserKey(ctx context.Context, client *ent.Client, id string) error
}

type userKeyRepository struct{}

func NewUserKeyRepository() *userKeyRepository {
	return &userKeyRepository{}
}

func (r *userRepository) CreateUser(ctx context.Context, client *ent.Client, email string) (*ent.User, error) {
	user, err := client.User.Create().SetEmail(email).Save(ctx)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *userRepository) GetUser(ctx context.Context, client *ent.Client, id string) (*ent.User, error) {
	user, err := client.User.Get(ctx, id)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *userRepository) DeleteUser(ctx context.Context, client *ent.Client, id string) error {
	err := client.User.DeleteOneID(id).Exec(ctx)
	if err != nil {
		return err
	}

	return nil
}

func (r *userKeyRepository) CreateUserKey(ctx context.Context, client *ent.Client, id string, userId string) (*ent.UserKey, error) {
	userKey, err := client.UserKey.
		Create().SetUserID(userId).SetID(id).Save(ctx)
	if err != nil {
		return nil, err
	}

	return userKey, nil
}

func (r *userKeyRepository) GetUserKey(ctx context.Context, client *ent.Client, id string) (*ent.UserKey, error) {
	userKey, err := client.
		UserKey.Get(ctx, id)
	if err != nil {
		return nil, err
	}

	return userKey, nil
}

func (r *userKeyRepository) DeleteUserKey(ctx context.Context, client *ent.Client, id string) error {
	err := client.UserKey.DeleteOneID(id).Exec(ctx)
	if err != nil {
		return err
	}

	return nil
}
