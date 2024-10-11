// Code generated by ent, DO NOT EDIT.

package ent

import (
	"fijoy/ent/account"
	"fijoy/ent/accountsnapshot"
	"fmt"
	"strings"
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"github.com/shopspring/decimal"
)

// AccountSnapshot is the model entity for the AccountSnapshot schema.
type AccountSnapshot struct {
	config `json:"-"`
	// ID of the ent.
	ID string `json:"id,omitempty"`
	// Datehour holds the value of the "datehour" field.
	Datehour time.Time `json:"datehour,omitempty"`
	// Balance holds the value of the "balance" field.
	Balance decimal.Decimal `json:"balance,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the AccountSnapshotQuery when eager-loading is set.
	Edges                    AccountSnapshotEdges `json:"edges"`
	account_account_snapshot *string
	selectValues             sql.SelectValues
}

// AccountSnapshotEdges holds the relations/edges for other nodes in the graph.
type AccountSnapshotEdges struct {
	// Account holds the value of the account edge.
	Account *Account `json:"account,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [1]bool
}

// AccountOrErr returns the Account value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e AccountSnapshotEdges) AccountOrErr() (*Account, error) {
	if e.Account != nil {
		return e.Account, nil
	} else if e.loadedTypes[0] {
		return nil, &NotFoundError{label: account.Label}
	}
	return nil, &NotLoadedError{edge: "account"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*AccountSnapshot) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case accountsnapshot.FieldBalance:
			values[i] = new(decimal.Decimal)
		case accountsnapshot.FieldID:
			values[i] = new(sql.NullString)
		case accountsnapshot.FieldDatehour:
			values[i] = new(sql.NullTime)
		case accountsnapshot.ForeignKeys[0]: // account_account_snapshot
			values[i] = new(sql.NullString)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the AccountSnapshot fields.
func (as *AccountSnapshot) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case accountsnapshot.FieldID:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value.Valid {
				as.ID = value.String
			}
		case accountsnapshot.FieldDatehour:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field datehour", values[i])
			} else if value.Valid {
				as.Datehour = value.Time
			}
		case accountsnapshot.FieldBalance:
			if value, ok := values[i].(*decimal.Decimal); !ok {
				return fmt.Errorf("unexpected type %T for field balance", values[i])
			} else if value != nil {
				as.Balance = *value
			}
		case accountsnapshot.ForeignKeys[0]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field account_account_snapshot", values[i])
			} else if value.Valid {
				as.account_account_snapshot = new(string)
				*as.account_account_snapshot = value.String
			}
		default:
			as.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// Value returns the ent.Value that was dynamically selected and assigned to the AccountSnapshot.
// This includes values selected through modifiers, order, etc.
func (as *AccountSnapshot) Value(name string) (ent.Value, error) {
	return as.selectValues.Get(name)
}

// QueryAccount queries the "account" edge of the AccountSnapshot entity.
func (as *AccountSnapshot) QueryAccount() *AccountQuery {
	return NewAccountSnapshotClient(as.config).QueryAccount(as)
}

// Update returns a builder for updating this AccountSnapshot.
// Note that you need to call AccountSnapshot.Unwrap() before calling this method if this AccountSnapshot
// was returned from a transaction, and the transaction was committed or rolled back.
func (as *AccountSnapshot) Update() *AccountSnapshotUpdateOne {
	return NewAccountSnapshotClient(as.config).UpdateOne(as)
}

// Unwrap unwraps the AccountSnapshot entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (as *AccountSnapshot) Unwrap() *AccountSnapshot {
	_tx, ok := as.config.driver.(*txDriver)
	if !ok {
		panic("ent: AccountSnapshot is not a transactional entity")
	}
	as.config.driver = _tx.drv
	return as
}

// String implements the fmt.Stringer.
func (as *AccountSnapshot) String() string {
	var builder strings.Builder
	builder.WriteString("AccountSnapshot(")
	builder.WriteString(fmt.Sprintf("id=%v, ", as.ID))
	builder.WriteString("datehour=")
	builder.WriteString(as.Datehour.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("balance=")
	builder.WriteString(fmt.Sprintf("%v", as.Balance))
	builder.WriteByte(')')
	return builder.String()
}

// AccountSnapshots is a parsable slice of AccountSnapshot.
type AccountSnapshots []*AccountSnapshot
