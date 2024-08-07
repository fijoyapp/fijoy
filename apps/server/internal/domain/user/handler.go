package user

import (
	"context"
	"database/sql"
	"fijoy/internal/gen/postgres/model"
	fijoyv1 "fijoy/internal/gen/proto/fijoy/v1"
	"fijoy/internal/util"

	. "fijoy/internal/gen/postgres/table"

	"connectrpc.com/connect"
	"github.com/bufbuild/protovalidate-go"
	. "github.com/go-jet/jet/v2/postgres"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type UserServer struct {
	db *sql.DB
}

func NewUserHandler(db *sql.DB) *UserServer {
	return &UserServer{db: db}
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
