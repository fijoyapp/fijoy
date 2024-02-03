package handlers

import (
	"database/sql"
	"encoding/json"
	"fijoy/.gen/neondb/public/model"
	"fmt"
	"net/http"

	. "fijoy/.gen/neondb/public/table"

	. "github.com/go-jet/jet/v2/postgres"
	"github.com/go-playground/validator"
	"github.com/nrednav/cuid2"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"
)

type categoryHandler struct {
	tokenAuth *jwtauth.JWTAuth
	db        *sql.DB
}

func NewCategoryHandler(tokenAuth *jwtauth.JWTAuth, db *sql.DB) chi.Router {
	handler := &categoryHandler{tokenAuth, db}

	router := chi.NewRouter()

	router.Use(jwtauth.Verifier(tokenAuth))
	router.Use(jwtauth.Authenticator(tokenAuth))

	router.Get("/", handler.getCategories)
	router.Post("/", handler.createCategory)
	router.Patch("/", handler.updateCategory)
	router.Delete("/{accountID}", handler.deleteCategory)
	return router
}

func (ch *categoryHandler) getCategories(w http.ResponseWriter, r *http.Request) {
	// _, claims, _ := jwtauth.FromContext(r.Context())
	workspaceID := r.URL.Query().Get("workspace_id")

	stmt := SELECT(FijoyCategory.AllColumns).FROM(FijoyCategory).
		WHERE(FijoyCategory.WorkspaceID.EQ(String(workspaceID)))

	dest := []model.FijoyCategory{}

	err := stmt.Query(ch.db, &dest)
	if err != nil {
		panic(err)
	}

	jsonText, _ := json.MarshalIndent(dest, "", "\t")

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, string(jsonText))
}

type createCategory struct {
	Name         string `json:"Name" validate:"required"`
	CategoryType string `json:"CategoryType" validate:"required"`
}

func (ch *categoryHandler) createCategory(w http.ResponseWriter, r *http.Request) {
	workspaceID := r.URL.Query().Get("workspace_id")
	if workspaceID == "" {
		http.Error(w, "Invalid request: workspace_id is required", http.StatusBadRequest)
		return
	}

	// TODO: check if this user has access to this workspace
	var createCategory createCategory

	err := json.NewDecoder(r.Body).Decode(&createCategory)
	if err != nil {
		http.Error(w, "Invalid request body: "+err.Error(), http.StatusBadRequest)
		return
	}

	v := validator.New()
	err = v.Struct(createCategory)
	if err != nil {
		http.Error(w, "Invalid request body: "+err.Error(), http.StatusBadRequest)
		return
	}

	category := model.FijoyCategory{
		ID:           "category_" + cuid2.Generate(),
		Name:         createCategory.Name,
		CategoryType: createCategory.CategoryType,
		WorkspaceID:  workspaceID,
	}

	stmt := FijoyCategory.INSERT(FijoyCategory.AllColumns).MODEL(category)

	_, err = stmt.Exec(ch.db)
	if err != nil {
		http.Error(w, "Failed to create category: "+err.Error(), http.StatusInternalServerError)
		return
	}
}

func (ch *categoryHandler) deleteCategory(w http.ResponseWriter, r *http.Request) {
	workspaceID := r.URL.Query().Get("workspace_id")
	if workspaceID == "" {
		http.Error(w, "Invalid request: workspace_id is required", http.StatusBadRequest)
		return
	}

	categoryID := chi.URLParam(r, "categoryID")

	stmt := FijoyCategory.DELETE().WHERE(FijoyCategory.ID.EQ(String(categoryID)))

	_, err := stmt.Exec(ch.db)
	if err != nil {
		http.Error(w, "Failed to delete category: "+err.Error(), http.StatusInternalServerError)
		return
	}
}

type updateCategory struct {
	Name string `json:"Name" validate:"required"`
}

func (ch *categoryHandler) updateCategory(w http.ResponseWriter, r *http.Request) {
	workspaceID := r.URL.Query().Get("workspace_id")
	if workspaceID == "" {
		http.Error(w, "Invalid request: workspace_id is required", http.StatusBadRequest)
		return
	}

	// TODO: check if this user has access to this workspace
	var updateCategory updateCategory

	err := json.NewDecoder(r.Body).Decode(&updateCategory)
	if err != nil {
		http.Error(w, "Invalid request body: "+err.Error(), http.StatusBadRequest)
		return
	}

	v := validator.New()
	err = v.Struct(updateCategory)
	if err != nil {
		http.Error(w, "Invalid request body: "+err.Error(), http.StatusBadRequest)
		return
	}

	categoryID := chi.URLParam(r, "categoryID")

	stmt := FijoyCategory.UPDATE(FijoyCategory.Name).MODEL(updateCategory).
		WHERE(FijoyCategory.ID.EQ(String(categoryID)))

	_, err = stmt.Exec(ch.db)
	if err != nil {
		http.Error(w, "Failed to update category: "+err.Error(), http.StatusInternalServerError)
		return
	}
}
