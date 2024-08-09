package repository

import (
	"context"
	"database/sql"
	"fijoy/constants"
	"fijoy/internal/gen/postgres/model"
	"time"

	. "fijoy/internal/gen/postgres/table"

	. "github.com/go-jet/jet/v2/postgres"
	"github.com/nrednav/cuid2"
)

type UserRepository interface {
	CreateUser(ctx context.Context, email string) (*model.FijoyUser, error)
	GetUser(ctx context.Context, id string) (*model.FijoyUser, error)
	DeleteUser(ctx context.Context, id string) (*model.FijoyUser, error)
}

type userRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *userRepository {
	return &userRepository{db: db}
}

type UserKeyRepository interface {
	CreateUserKey(ctx context.Context, id string, userId string) (*model.FijoyUserKey, error)
	GetUserKey(ctx context.Context, id string) (*model.FijoyUserKey, error)
	DeleteUserKey(ctx context.Context, id string) (*model.FijoyUserKey, error)
}

type userKeyRepository struct {
	db *sql.DB
}

func NewUserKeyRepository(db *sql.DB) *userKeyRepository {
	return &userKeyRepository{db: db}
}

func (r *userRepository) CreateUser(ctx context.Context, email string) (*model.FijoyUser, error) {
	userId := constants.UserPrefix + cuid2.Generate()

	user := model.FijoyUser{
		ID:        userId,
		Email:     email,
		CreatedAt: time.Now(),
	}
	stmt := FijoyUser.
		INSERT(FijoyUser.AllColumns).
		MODEL(user).RETURNING(FijoyUser.AllColumns)

	dest := model.FijoyUser{}

	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *userRepository) GetUser(ctx context.Context, id string) (*model.FijoyUser, error) {
	stmt := SELECT(FijoyUser.AllColumns).
		FROM(FijoyUser).
		WHERE(FijoyUser.ID.EQ(String(id)))

	dest := model.FijoyUser{}

	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *userRepository) DeleteUser(ctx context.Context, id string) (*model.FijoyUser, error) {
	stmt := FijoyUser.DELETE().
		WHERE(FijoyUser.ID.EQ(String(id))).
		RETURNING(FijoyUser.AllColumns)

	dest := model.FijoyUser{}

	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *userKeyRepository) CreateUserKey(ctx context.Context, id string, userId string) (*model.FijoyUserKey, error) {
	userKey := model.FijoyUserKey{
		ID:     id,
		UserID: userId,
	}

	stmt := FijoyUserKey.
		INSERT(FijoyUserKey.AllColumns).
		MODEL(userKey).
		RETURNING(FijoyUserKey.AllColumns)

	dest := model.FijoyUserKey{}
	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *userKeyRepository) GetUserKey(ctx context.Context, id string) (*model.FijoyUserKey, error) {
	stmt := SELECT(FijoyUserKey.AllColumns).
		FROM(FijoyUserKey).
		WHERE(FijoyUserKey.ID.EQ(String(id)))

	dest := model.FijoyUserKey{}
	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *userKeyRepository) DeleteUserKey(ctx context.Context, id string) (*model.FijoyUserKey, error) {
	stmt := FijoyUserKey.DELETE().
		WHERE(FijoyUserKey.ID.EQ(String(id))).
		RETURNING(FijoyUserKey.AllColumns)

	dest := model.FijoyUserKey{}
	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}
