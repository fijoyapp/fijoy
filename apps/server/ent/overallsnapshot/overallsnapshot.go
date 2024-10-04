// Code generated by ent, DO NOT EDIT.

package overallsnapshot

import (
	"entgo.io/ent/dialect/sql"
)

const (
	// Label holds the string label denoting the overallsnapshot type in the database.
	Label = "overall_snapshot"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// Table holds the table name of the overallsnapshot in the database.
	Table = "overall_snapshots"
)

// Columns holds all SQL columns for overallsnapshot fields.
var Columns = []string{
	FieldID,
}

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	return false
}

// OrderOption defines the ordering options for the OverallSnapshot queries.
type OrderOption func(*sql.Selector)

// ByID orders the results by the id field.
func ByID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldID, opts...).ToFunc()
}
