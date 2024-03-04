package handler

import (
	"database/sql"
	"encoding/json"
	"fijoy/internal/gen/postgres/railway/public/model"
	"fmt"
	"net/http"
	"time"

	. "fijoy/internal/gen/postgres/railway/public/table"

	. "github.com/go-jet/jet/v2/postgres"
	"github.com/go-playground/validator"
	"github.com/nrednav/cuid2"
	"github.com/shopspring/decimal"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"
)

type transactionHandler struct {
	tokenAuth *jwtauth.JWTAuth
	db        *sql.DB
}

func NewTransactionHandler(r *chi.Mux, tokenAuth *jwtauth.JWTAuth, db *sql.DB) {
	handler := &transactionHandler{tokenAuth, db}

	r.Route("/v1/transactions", func(r chi.Router) {
		r.Use(jwtauth.Verifier(tokenAuth))
		r.Use(jwtauth.Authenticator(tokenAuth))

		r.Get("/", handler.getTransactions)
		r.Post("/", handler.createTransaction)
		r.Patch("/{transactionID}", handler.updateTransaction)
		r.Delete("/{transactionID}", handler.deleteTransaction)
	})
}

func (th *transactionHandler) getTransactions(w http.ResponseWriter, r *http.Request) {
	// _, claims, _ := jwtauth.FromContext(r.Context())
	workspaceID := r.URL.Query().Get("workspace_id")

	stmt := SELECT(FijoyTransaction.AllColumns, FijoyCategory.AllColumns).
		FROM(FijoyTransaction.INNER_JOIN(FijoyCategory,
			AND(FijoyCategory.WorkspaceID.EQ(FijoyTransaction.WorkspaceID),
				FijoyCategory.ID.EQ(FijoyTransaction.CategoryID)))).
		WHERE(FijoyTransaction.WorkspaceID.EQ(String(workspaceID)))

	var dest []struct {
		model.FijoyTransaction
		CategoryDetail model.FijoyCategory
	}

	err := stmt.Query(th.db, &dest)
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")

	if dest == nil {
		fmt.Fprint(w, "[]")
		return
	}

	jsonText, _ := json.MarshalIndent(dest, "", "\t")

	fmt.Fprint(w, string(jsonText))
}

type createTransaction struct {
	TransactionType string          `json:"TransactionType" validate:"required,oneof=expense income transfer"`
	Amount          decimal.Decimal `json:"Amount" validate:"required"`
	Currency        string          `json:"Currency" validate:"required"`
	AccountID       string          `json:"AccountID"`
	CategoryID      string          `json:"CategoryID"`
	Entity          string          `json:"Entity"`
}

func (ch *transactionHandler) createTransaction(w http.ResponseWriter, r *http.Request) {
	workspaceID := r.URL.Query().Get("workspace_id")
	if workspaceID == "" {
		http.Error(w, "Invalid request: workspace_id is required", http.StatusBadRequest)
		return
	}

	_, claims, _ := jwtauth.FromContext(r.Context())
	userId := claims["user_id"].(string)

	// TODO: check if this user has access to this workspace
	var createTransaction createTransaction

	err := json.NewDecoder(r.Body).Decode(&createTransaction)
	if err != nil {
		http.Error(w, "Invalid request body: "+err.Error(), http.StatusBadRequest)
		return
	}

	v := validator.New()
	err = v.Struct(createTransaction)
	if err != nil {
		http.Error(w, "Invalid request body: "+err.Error(), http.StatusBadRequest)
		return
	}

	transaction := model.FijoyTransaction{
		ID:              "category_" + cuid2.Generate(),
		TransactionType: GetTransactionType(createTransaction.TransactionType),
		Amount:          createTransaction.Amount.InexactFloat64(),
		AccountID:       &createTransaction.AccountID,
		UserID:          userId,
		WorkspaceID:     workspaceID,
		Datetime:        time.Now().UTC(),
		Note:            new(string),
		CategoryID:      &createTransaction.CategoryID,
		Entity:          &createTransaction.Entity,
	}

	stmt := FijoyTransaction.INSERT(FijoyTransaction.AllColumns).MODEL(transaction)

	_, err = stmt.Exec(ch.db)
	if err != nil {
		fmt.Println(err.Error())
		http.Error(w, "Failed to create transaction: "+err.Error(), http.StatusInternalServerError)
		return
	}
}

func (ch *transactionHandler) deleteTransaction(w http.ResponseWriter, r *http.Request) {
	workspaceID := r.URL.Query().Get("workspace_id")
	if workspaceID == "" {
		http.Error(w, "Invalid request: workspace_id is required", http.StatusBadRequest)
		return
	}

	transactionID := chi.URLParam(r, "transactionID")

	// TODO: need to actually update the balance of the respective account(s)
	stmt := FijoyTransaction.DELETE().WHERE(FijoyTransaction.ID.EQ(String(transactionID)))

	_, err := stmt.Exec(ch.db)
	if err != nil {
		http.Error(w, "Failed to delete transaction: "+err.Error(), http.StatusInternalServerError)
		return
	}
}

type updateTransaction struct {
	Amount     decimal.Decimal `json:"Amount"`
	Currency   string          `json:"Currency"`
	AccountID  string          `json:"AccountID"`
	CategoryID string          `json:"CategoryID"`
	PayeeName  string          `json:"PayeeName"`
	PayerName  string          `json:"PayerName"`
}

func (ch *transactionHandler) updateTransaction(w http.ResponseWriter, r *http.Request) {
	workspaceID := r.URL.Query().Get("workspace_id")
	if workspaceID == "" {
		http.Error(w, "Invalid request: workspace_id is required", http.StatusBadRequest)
		return
	}

	// TODO: check if this user has access to this workspace
	var updateTransaction updateTransaction

	err := json.NewDecoder(r.Body).Decode(&updateTransaction)
	if err != nil {
		http.Error(w, "Invalid request body: "+err.Error(), http.StatusBadRequest)
		return
	}

	// TODO: need to actually update the balance of the respective account(s)
	v := validator.New()
	err = v.Struct(updateTransaction)
	if err != nil {
		http.Error(w, "Invalid request body: "+err.Error(), http.StatusBadRequest)
		return
	}

	categoryID := chi.URLParam(r, "categoryID")

	stmt := FijoyCategory.UPDATE(FijoyCategory.Name).MODEL(updateTransaction).
		WHERE(FijoyCategory.ID.EQ(String(categoryID)))

	_, err = stmt.Exec(ch.db)
	if err != nil {
		http.Error(w, "Failed to update category: "+err.Error(), http.StatusInternalServerError)
		return
	}
}

func GetTransactionType(transactionType string) model.FijoyTransactionType {
	switch transactionType {
	case "expense":
		return model.FijoyTransactionType_Expense
	case "income":
		return model.FijoyTransactionType_Income
	case "transfer":
		return model.FijoyTransactionType_Transfer
	default:
		return ""
	}
}
