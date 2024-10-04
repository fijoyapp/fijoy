// Code generated by ent, DO NOT EDIT.

package ent

import (
	"fijoy/ent/userkey"
	"fmt"
	"strings"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
)

// UserKey is the model entity for the UserKey schema.
type UserKey struct {
	config
	// ID of the ent.
	ID            int `json:"id,omitempty"`
	user_user_key *int
	selectValues  sql.SelectValues
}

// scanValues returns the types for scanning values from sql.Rows.
func (*UserKey) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case userkey.FieldID:
			values[i] = new(sql.NullInt64)
		case userkey.ForeignKeys[0]: // user_user_key
			values[i] = new(sql.NullInt64)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the UserKey fields.
func (uk *UserKey) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case userkey.FieldID:
			value, ok := values[i].(*sql.NullInt64)
			if !ok {
				return fmt.Errorf("unexpected type %T for field id", value)
			}
			uk.ID = int(value.Int64)
		case userkey.ForeignKeys[0]:
			if value, ok := values[i].(*sql.NullInt64); !ok {
				return fmt.Errorf("unexpected type %T for edge-field user_user_key", value)
			} else if value.Valid {
				uk.user_user_key = new(int)
				*uk.user_user_key = int(value.Int64)
			}
		default:
			uk.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// Value returns the ent.Value that was dynamically selected and assigned to the UserKey.
// This includes values selected through modifiers, order, etc.
func (uk *UserKey) Value(name string) (ent.Value, error) {
	return uk.selectValues.Get(name)
}

// Update returns a builder for updating this UserKey.
// Note that you need to call UserKey.Unwrap() before calling this method if this UserKey
// was returned from a transaction, and the transaction was committed or rolled back.
func (uk *UserKey) Update() *UserKeyUpdateOne {
	return NewUserKeyClient(uk.config).UpdateOne(uk)
}

// Unwrap unwraps the UserKey entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (uk *UserKey) Unwrap() *UserKey {
	_tx, ok := uk.config.driver.(*txDriver)
	if !ok {
		panic("ent: UserKey is not a transactional entity")
	}
	uk.config.driver = _tx.drv
	return uk
}

// String implements the fmt.Stringer.
func (uk *UserKey) String() string {
	var builder strings.Builder
	builder.WriteString("UserKey(")
	builder.WriteString(fmt.Sprintf("id=%v", uk.ID))
	builder.WriteByte(')')
	return builder.String()
}

// UserKeys is a parsable slice of UserKey.
type UserKeys []*UserKey
