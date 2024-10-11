// Code generated by ent, DO NOT EDIT.

package transaction

import (
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
)

const (
	// Label holds the string label denoting the transaction type in the database.
	Label = "transaction"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldAmount holds the string denoting the amount field in the database.
	FieldAmount = "amount"
	// FieldAmountDelta holds the string denoting the amount_delta field in the database.
	FieldAmountDelta = "amount_delta"
	// FieldValue holds the string denoting the value field in the database.
	FieldValue = "value"
	// FieldFxRate holds the string denoting the fx_rate field in the database.
	FieldFxRate = "fx_rate"
	// FieldBalance holds the string denoting the balance field in the database.
	FieldBalance = "balance"
	// FieldBalanceDelta holds the string denoting the balance_delta field in the database.
	FieldBalanceDelta = "balance_delta"
	// FieldNote holds the string denoting the note field in the database.
	FieldNote = "note"
	// FieldCreatedAt holds the string denoting the created_at field in the database.
	FieldCreatedAt = "created_at"
	// FieldUpdatedAt holds the string denoting the updated_at field in the database.
	FieldUpdatedAt = "updated_at"
	// EdgeProfile holds the string denoting the profile edge name in mutations.
	EdgeProfile = "profile"
	// EdgeAccount holds the string denoting the account edge name in mutations.
	EdgeAccount = "account"
	// Table holds the table name of the transaction in the database.
	Table = "transactions"
	// ProfileTable is the table that holds the profile relation/edge.
	ProfileTable = "transactions"
	// ProfileInverseTable is the table name for the Profile entity.
	// It exists in this package in order to avoid circular dependency with the "profile" package.
	ProfileInverseTable = "profiles"
	// ProfileColumn is the table column denoting the profile relation/edge.
	ProfileColumn = "profile_transaction"
	// AccountTable is the table that holds the account relation/edge.
	AccountTable = "transactions"
	// AccountInverseTable is the table name for the Account entity.
	// It exists in this package in order to avoid circular dependency with the "account" package.
	AccountInverseTable = "accounts"
	// AccountColumn is the table column denoting the account relation/edge.
	AccountColumn = "account_transaction"
)

// Columns holds all SQL columns for transaction fields.
var Columns = []string{
	FieldID,
	FieldAmount,
	FieldAmountDelta,
	FieldValue,
	FieldFxRate,
	FieldBalance,
	FieldBalanceDelta,
	FieldNote,
	FieldCreatedAt,
	FieldUpdatedAt,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the "transactions"
// table and are not defined as standalone fields in the schema.
var ForeignKeys = []string{
	"account_transaction",
	"profile_transaction",
}

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	for i := range ForeignKeys {
		if column == ForeignKeys[i] {
			return true
		}
	}
	return false
}

var (
	// DefaultCreatedAt holds the default value on creation for the "created_at" field.
	DefaultCreatedAt func() time.Time
	// DefaultUpdatedAt holds the default value on creation for the "updated_at" field.
	DefaultUpdatedAt func() time.Time
	// DefaultID holds the default value on creation for the "id" field.
	DefaultID string
)

// OrderOption defines the ordering options for the Transaction queries.
type OrderOption func(*sql.Selector)

// ByID orders the results by the id field.
func ByID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldID, opts...).ToFunc()
}

// ByAmount orders the results by the amount field.
func ByAmount(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldAmount, opts...).ToFunc()
}

// ByAmountDelta orders the results by the amount_delta field.
func ByAmountDelta(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldAmountDelta, opts...).ToFunc()
}

// ByValue orders the results by the value field.
func ByValue(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldValue, opts...).ToFunc()
}

// ByFxRate orders the results by the fx_rate field.
func ByFxRate(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldFxRate, opts...).ToFunc()
}

// ByBalance orders the results by the balance field.
func ByBalance(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldBalance, opts...).ToFunc()
}

// ByBalanceDelta orders the results by the balance_delta field.
func ByBalanceDelta(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldBalanceDelta, opts...).ToFunc()
}

// ByNote orders the results by the note field.
func ByNote(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldNote, opts...).ToFunc()
}

// ByCreatedAt orders the results by the created_at field.
func ByCreatedAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldCreatedAt, opts...).ToFunc()
}

// ByUpdatedAt orders the results by the updated_at field.
func ByUpdatedAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldUpdatedAt, opts...).ToFunc()
}

// ByProfileField orders the results by profile field.
func ByProfileField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newProfileStep(), sql.OrderByField(field, opts...))
	}
}

// ByAccountField orders the results by account field.
func ByAccountField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newAccountStep(), sql.OrderByField(field, opts...))
	}
}
func newProfileStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(ProfileInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, ProfileTable, ProfileColumn),
	)
}
func newAccountStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(AccountInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, AccountTable, AccountColumn),
	)
}
