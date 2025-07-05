package repository

import (
	"context"
	"fijoy/ent"
	"fijoy/ent/userkey"
)

type UserRepository interface {
	CreateUser(ctx context.Context, client *ent.Client, email string) (*ent.User, error)
	GetUser(ctx context.Context, client *ent.Client, id int) (*ent.User, error)
	DeleteUser(ctx context.Context, client *ent.Client, id int) error
}

type userRepository struct{}

func NewUserRepository() *userRepository {
	return &userRepository{}
}

type UserKeyRepository interface {
	CreateUserKey(ctx context.Context, client *ent.Client, key string, userID int) (*ent.UserKey, error)
	GetUserKey(ctx context.Context, client *ent.Client, key string) (*ent.UserKey, error)
	DeleteUserKey(ctx context.Context, client *ent.Client, key string) error
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

func (r *userRepository) GetUser(ctx context.Context, client *ent.Client, id int) (*ent.User, error) {
	user, err := client.User.Get(ctx, id)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *userRepository) DeleteUser(ctx context.Context, client *ent.Client, id int) error {
	err := client.User.DeleteOneID(id).Exec(ctx)
	if err != nil {
		return err
	}

	return nil
}

func (r *userKeyRepository) CreateUserKey(ctx context.Context, client *ent.Client, key string, userID int) (*ent.UserKey, error) {
	userKey, err := client.UserKey.
		Create().SetUserID(userID).SetKey(key).Save(ctx)
	if err != nil {
		return nil, err
	}

	return userKey, nil
}

func (r *userKeyRepository) GetUserKey(ctx context.Context, client *ent.Client, key string) (*ent.UserKey, error) {
	userKey, err := client.UserKey.Query().Where(userkey.KeyEQ(key)).Only(ctx)
	if err != nil {
		return nil, err
	}

	return userKey, nil
}

func (r *userKeyRepository) DeleteUserKey(ctx context.Context, client *ent.Client, key string) error {
	_, err := client.UserKey.Delete().Where(userkey.KeyEQ(key)).Exec(ctx)
	if err != nil {
		return err
	}

	return nil
}
