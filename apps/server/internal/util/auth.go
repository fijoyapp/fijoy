package util

import (
	"context"
	"database/sql"
	"errors"
	"fijoy/internal/gen/postgres/model"
	"net/http"

	. "fijoy/internal/gen/postgres/table"

	. "github.com/go-jet/jet/v2/postgres"

	"github.com/go-chi/jwtauth/v5"
)

func GetUserIdFromContext(ctx context.Context) (string, error) {
	_, claims, _ := jwtauth.FromContext(ctx)
	if claims == nil {
		return "", errors.New("no claims found")
	}

	if _, ok := claims["user_id"]; !ok {
		return "", errors.New("no user_id found in claims")
	}

	return claims["user_id"].(string), nil
}

func GetWorkspaceUserPermission(db *sql.DB, userId string, worksapceId string) (model.FijoyWorkspaceUser, error) {
	stmt := SELECT(FijoyWorkspaceUser.AllColumns).
		FROM(FijoyWorkspaceUser).
		WHERE(AND(FijoyWorkspaceUser.WorkspaceID.EQ(String(worksapceId)),
			FijoyWorkspaceUser.UserID.EQ(String(userId))))

	var dest model.FijoyWorkspaceUser
	err := stmt.Query(db, &dest)
	if err != nil {
		return model.FijoyWorkspaceUser{}, err
	}
	return dest, nil
}

func HasAdminPermission(wu *model.FijoyWorkspaceUser) bool {
	switch wu.Role {
	case model.FijoyWorkspaceRole_Owner:
		return true
	default:
		return false
	}
}

func HasEditPermission(wu *model.FijoyWorkspaceUser) bool {
	switch wu.Role {
	case model.FijoyWorkspaceRole_Owner, model.FijoyWorkspaceRole_Editor:
		return true
	case model.FijoyWorkspaceRole_Viewer:
		return false
	default:
		return false
	}
}

func HasViewPermission(wu *model.FijoyWorkspaceUser) bool {
	switch wu.Role {
	case model.FijoyWorkspaceRole_Owner,
		model.FijoyWorkspaceRole_Editor,
		model.FijoyWorkspaceRole_Viewer:
		return true
	default:
		return false
	}
}

func ExtractWorkspaceIdFromHeader(header http.Header) (string, error) {
	workspaceId := header.Get("Fijoy-Workspace-Id")
	if workspaceId == "" {
		return "", errors.New("missing Fijoy-Workspace-Id in request header")
	}
	return workspaceId, nil
}
