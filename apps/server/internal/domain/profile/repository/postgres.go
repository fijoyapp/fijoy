package repository

import (
	"context"
	"database/sql"
	"fijoy/constants"
	"fijoy/internal/gen/postgres/model"
	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"
	"strings"
	"time"

	. "fijoy/internal/gen/postgres/table"

	. "github.com/go-jet/jet/v2/postgres"
	"github.com/nrednav/cuid2"
)

type ProfileRepository interface {
	CreateProfileTX(ctx context.Context, tx *sql.Tx, userId string, req *fijoyv1.CreateProfileRequest) (*model.FijoyProfile, error)
	DeleteProfileTX(ctx context.Context, tx *sql.Tx, id string) (*model.FijoyProfile, error)
	UpdateCurrencyTX(ctx context.Context, tx *sql.Tx, id string, req *fijoyv1.UpdateCurrencyRequest) (*model.FijoyProfile, error)

	GetProfileById(ctx context.Context, id string) (*model.FijoyProfile, error)
	GetProfileByUserId(ctx context.Context, userId string) (*model.FijoyProfile, error)
}

type profileRepository struct {
	db *sql.DB
}

func NewProfileRepository(db *sql.DB) *profileRepository {
	return &profileRepository{db: db}
}

func (r *profileRepository) CreateProfileTX(ctx context.Context, tx *sql.Tx, userId string, req *fijoyv1.CreateProfileRequest) (*model.FijoyProfile, error) {
	profileId := constants.ProfilePrefix + cuid2.Generate()

	profile := model.FijoyProfile{
		ID:         profileId,
		UserID:     userId,
		Currencies: strings.Join(req.Currencies, ","),
		CreatedAt:  time.Now(),
	}

	stmt := FijoyProfile.
		INSERT(FijoyProfile.AllColumns).
		MODEL(profile).RETURNING(FijoyProfile.AllColumns)

	dest := model.FijoyProfile{}

	err := stmt.QueryContext(ctx, tx, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *profileRepository) GetProfileById(ctx context.Context, id string) (*model.FijoyProfile, error) {
	stmt := SELECT(FijoyProfile.AllColumns).
		FROM(FijoyProfile).
		WHERE(FijoyProfile.ID.EQ(String(id)))

	dest := model.FijoyProfile{}

	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *profileRepository) GetProfileByUserId(ctx context.Context, userId string) (*model.FijoyProfile, error) {
	stmt := SELECT(FijoyProfile.AllColumns).
		FROM(FijoyProfile).
		WHERE(FijoyProfile.UserID.EQ(String(userId)))

	dest := model.FijoyProfile{}

	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *profileRepository) DeleteProfileTX(ctx context.Context, tx *sql.Tx, id string) (*model.FijoyProfile, error) {
	stmt := FijoyProfile.DELETE().
		WHERE(FijoyProfile.ID.EQ(String(id))).
		RETURNING(FijoyProfile.AllColumns)

	dest := model.FijoyProfile{}

	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *profileRepository) UpdateCurrencyTX(ctx context.Context, tx *sql.Tx, id string, req *fijoyv1.UpdateCurrencyRequest) (*model.FijoyProfile, error) {
	profile := model.FijoyProfile{
		Currencies: strings.Join(req.Currencies, ","),
	}

	stmt := FijoyProfile.
		UPDATE(FijoyProfile.Currencies).
		MODEL(profile).WHERE(FijoyProfile.ID.EQ(String(id))).
		RETURNING(FijoyProfile.AllColumns)

	var dest model.FijoyProfile

	err := stmt.QueryContext(ctx, tx, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}
