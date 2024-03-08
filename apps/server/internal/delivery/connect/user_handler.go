package handler

import (
	"context"
	"database/sql"
	"fijoy/internal/gen/postgres/model"
	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"
	"fijoy/internal/gen/proto/fijoy/v1/fijoyv1connect"
	"fijoy/internal/util"

	. "fijoy/internal/gen/postgres/table"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
	. "github.com/go-jet/jet/v2/postgres"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"
)

type UserServer struct {
	db *sql.DB
}

func NewUserHandler(r *chi.Mux, tokenAuth *jwtauth.JWTAuth, db *sql.DB) {
	userServer := &UserServer{db: db}

	path, handler := fijoyv1connect.NewUserServiceHandler(userServer)

	r.Group(func(r chi.Router) {
		r.Use(jwtauth.Verifier(tokenAuth))
		r.Use(jwtauth.Authenticator(tokenAuth))

		r.Mount(path, handler)
	})
}

func (s *UserServer) GetUser(
	ctx context.Context,
	req *connect.Request[emptypb.Empty],
) (*connect.Response[fijoyv1.User], error) {
	userId, err := util.GetUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}

	v, err := protovalidate.New()
	if err != nil {
		return nil, err
	}

	if err = v.Validate(req.Msg); err != nil {
		return nil, err
	}

	stmt := SELECT(FijoyUser.AllColumns).FROM(FijoyUser).
		WHERE(FijoyUser.ID.EQ(String(userId)))

	dest := model.FijoyUser{}

	err = stmt.QueryContext(ctx, s.db, &dest)
	if err != nil {
		return nil, err
	}

	return connect.NewResponse(&fijoyv1.User{
		Id:        dest.ID,
		Email:     dest.Email,
		CreatedAt: timestamppb.New(dest.CreatedAt),
	}), nil
}
