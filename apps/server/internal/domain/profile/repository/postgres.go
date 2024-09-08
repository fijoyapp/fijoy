package repository

import (
	"context"
	"database/sql"
	"fijoy/constants"
	"fijoy/internal/domain/profile"
	"fijoy/internal/gen/postgres/model"
	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"
	"strings"
	"time"

	. "fijoy/internal/gen/postgres/table"

	. "github.com/go-jet/jet/v2/postgres"
	"github.com/nrednav/cuid2"
	"github.com/shopspring/decimal"
)

type ProfileRepository interface {
	CreateProfileTX(ctx context.Context, tx *sql.Tx, userId string, req *fijoyv1.CreateProfileRequest) (*profile.FijoyProfile, error)
	GetProfileByIdTX(ctx context.Context, tx *sql.Tx, id string) (*profile.FijoyProfile, error)
	DeleteProfileTX(ctx context.Context, tx *sql.Tx, id string) (*profile.FijoyProfile, error)
	UpdateProfileTX(ctx context.Context, tx *sql.Tx, id string, req *fijoyv1.UpdateProfileRequest) (*profile.FijoyProfile, error)

	GetProfileById(ctx context.Context, id string) (*profile.FijoyProfile, error)
	GetProfileByUserId(ctx context.Context, userId string) (*profile.FijoyProfile, error)
}

type profileRepository struct {
	db *sql.DB
}

func NewProfileRepository(db *sql.DB) *profileRepository {
	return &profileRepository{db: db}
}

func (r *profileRepository) CreateProfileTX(ctx context.Context, tx *sql.Tx, userId string, req *fijoyv1.CreateProfileRequest) (*profile.FijoyProfile, error) {
	profileId := constants.ProfilePrefix + cuid2.Generate()

	newProfile := profile.FijoyProfile{
		FijoyProfile: model.FijoyProfile{
			ID:         profileId,
			UserID:     userId,
			Currencies: strings.Join(req.Currencies, ","),
			CreatedAt:  time.Now(),
		},
		NetWorthGoal: decimal.RequireFromString(req.NetWorthGoal),
	}

	stmt := FijoyProfile.
		INSERT(FijoyProfile.AllColumns).
		MODEL(newProfile).RETURNING(FijoyProfile.AllColumns)

	dest := profile.FijoyProfile{}

	err := stmt.QueryContext(ctx, tx, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *profileRepository) GetProfileById(ctx context.Context, id string) (*profile.FijoyProfile, error) {
	stmt := SELECT(FijoyProfile.AllColumns).
		FROM(FijoyProfile).
		WHERE(FijoyProfile.ID.EQ(String(id)))

	dest := profile.FijoyProfile{}

	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *profileRepository) GetProfileByIdTX(ctx context.Context, tx *sql.Tx, id string) (*profile.FijoyProfile, error) {
	stmt := SELECT(FijoyProfile.AllColumns).
		FROM(FijoyProfile).
		WHERE(FijoyProfile.ID.EQ(String(id)))

	dest := profile.FijoyProfile{}

	err := stmt.QueryContext(ctx, tx, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *profileRepository) GetProfileByUserId(ctx context.Context, userId string) (*profile.FijoyProfile, error) {
	stmt := SELECT(FijoyProfile.AllColumns).
		FROM(FijoyProfile).
		WHERE(FijoyProfile.UserID.EQ(String(userId)))

	dest := profile.FijoyProfile{}

	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *profileRepository) DeleteProfileTX(ctx context.Context, tx *sql.Tx, id string) (*profile.FijoyProfile, error) {
	stmt := FijoyProfile.DELETE().
		WHERE(FijoyProfile.ID.EQ(String(id))).
		RETURNING(FijoyProfile.AllColumns)

	dest := profile.FijoyProfile{}

	err := stmt.QueryContext(ctx, r.db, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}

func (r *profileRepository) UpdateProfileTX(ctx context.Context, tx *sql.Tx, id string, req *fijoyv1.UpdateProfileRequest) (*profile.FijoyProfile, error) {
	updatedProfile, err := r.GetProfileByIdTX(ctx, tx, id)
	if err != nil {
		return nil, err
	}

	columnList := ColumnList{}

	if req.Currencies != nil {
		updatedProfile.Currencies = strings.Join(req.Currencies, ",")
		columnList = append(columnList, FijoyProfile.Currencies)
	}

	if req.NetWorthGoal != nil {
		updatedProfile.NetWorthGoal = decimal.RequireFromString(*req.NetWorthGoal)
		columnList = append(columnList, FijoyProfile.NetWorthGoal)
	}

	stmt := FijoyProfile.
		UPDATE(columnList).
		MODEL(updatedProfile).WHERE(FijoyProfile.ID.EQ(String(id))).
		RETURNING(FijoyProfile.AllColumns)

	dest := profile.FijoyProfile{}

	err = stmt.QueryContext(ctx, tx, &dest)
	if err != nil {
		return nil, err
	}

	return &dest, nil
}
