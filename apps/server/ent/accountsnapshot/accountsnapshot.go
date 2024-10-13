// Code generated by ent, DO NOT EDIT.

package accountsnapshot

import (
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
)

const (
	// Label holds the string label denoting the accountsnapshot type in the database.
	Label = "account_snapshot"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldDatehour holds the string denoting the datehour field in the database.
	FieldDatehour = "datehour"
	// FieldBalance holds the string denoting the balance field in the database.
	FieldBalance = "balance"
	// EdgeAccount holds the string denoting the account edge name in mutations.
	EdgeAccount = "account"
	// Table holds the table name of the accountsnapshot in the database.
	Table = "account_snapshots"
	// AccountTable is the table that holds the account relation/edge.
	AccountTable = "account_snapshots"
	// AccountInverseTable is the table name for the Account entity.
	// It exists in this package in order to avoid circular dependency with the "account" package.
	AccountInverseTable = "accounts"
	// AccountColumn is the table column denoting the account relation/edge.
	AccountColumn = "account_account_snapshot"
)

// Columns holds all SQL columns for accountsnapshot fields.
var Columns = []string{
	FieldID,
	FieldDatehour,
	FieldBalance,
}

// ForeignKeys holds the SQL foreign-keys that are owned by the "account_snapshots"
// table and are not defined as standalone fields in the schema.
var ForeignKeys = []string{
	"account_account_snapshot",
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
	// DefaultID holds the default value on creation for the "id" field.
	DefaultID string
)

// OrderOption defines the ordering options for the AccountSnapshot queries.
type OrderOption func(*sql.Selector)

// ByID orders the results by the id field.
func ByID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldID, opts...).ToFunc()
}

// ByDatehour orders the results by the datehour field.
func ByDatehour(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldDatehour, opts...).ToFunc()
}

// ByBalance orders the results by the balance field.
func ByBalance(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldBalance, opts...).ToFunc()
}

// ByAccountField orders the results by account field.
func ByAccountField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newAccountStep(), sql.OrderByField(field, opts...))
	}
}
func newAccountStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(AccountInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, AccountTable, AccountColumn),
	)
}