// Code generated by ent, DO NOT EDIT.

package ent

import (
	"fijoy/ent/account"
	"fijoy/ent/profile"
	"fmt"
	"strings"
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"github.com/shopspring/decimal"
)

// Account is the model entity for the Account schema.
type Account struct {
	config `json:"-"`
	// ID of the ent.
	ID string `json:"id,omitempty"`
	// Name holds the value of the "name" field.
	Name string `json:"name,omitempty"`
	// AccountType holds the value of the "account_type" field.
	AccountType account.AccountType `json:"account_type,omitempty"`
	// Archived holds the value of the "archived" field.
	Archived bool `json:"archived,omitempty"`
	// IncludeInNetWorth holds the value of the "include_in_net_worth" field.
	IncludeInNetWorth bool `json:"include_in_net_worth,omitempty"`
	// Symbol holds the value of the "symbol" field.
	Symbol string `json:"symbol,omitempty"`
	// SymbolType holds the value of the "symbol_type" field.
	SymbolType account.SymbolType `json:"symbol_type,omitempty"`
	// Amount holds the value of the "amount" field.
	Amount decimal.Decimal `json:"amount,omitempty"`
	// Value holds the value of the "value" field.
	Value decimal.Decimal `json:"value,omitempty"`
	// FxRate holds the value of the "fx_rate" field.
	FxRate decimal.Decimal `json:"fx_rate,omitempty"`
	// Balance holds the value of the "balance" field.
	Balance decimal.Decimal `json:"balance,omitempty"`
	// CreatedAt holds the value of the "created_at" field.
	CreatedAt time.Time `json:"created_at,omitempty"`
	// UpdatedAt holds the value of the "updated_at" field.
	UpdatedAt time.Time `json:"updated_at,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the AccountQuery when eager-loading is set.
	Edges           AccountEdges `json:"edges"`
	profile_account *string
	selectValues    sql.SelectValues
}

// AccountEdges holds the relations/edges for other nodes in the graph.
type AccountEdges struct {
	// Profile holds the value of the profile edge.
	Profile *Profile `json:"profile,omitempty"`
	// AccountSnapshot holds the value of the account_snapshot edge.
	AccountSnapshot []*AccountSnapshot `json:"account_snapshot,omitempty"`
	// Transaction holds the value of the transaction edge.
	Transaction []*Transaction `json:"transaction,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [3]bool
}

// ProfileOrErr returns the Profile value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e AccountEdges) ProfileOrErr() (*Profile, error) {
	if e.Profile != nil {
		return e.Profile, nil
	} else if e.loadedTypes[0] {
		return nil, &NotFoundError{label: profile.Label}
	}
	return nil, &NotLoadedError{edge: "profile"}
}

// AccountSnapshotOrErr returns the AccountSnapshot value or an error if the edge
// was not loaded in eager-loading.
func (e AccountEdges) AccountSnapshotOrErr() ([]*AccountSnapshot, error) {
	if e.loadedTypes[1] {
		return e.AccountSnapshot, nil
	}
	return nil, &NotLoadedError{edge: "account_snapshot"}
}

// TransactionOrErr returns the Transaction value or an error if the edge
// was not loaded in eager-loading.
func (e AccountEdges) TransactionOrErr() ([]*Transaction, error) {
	if e.loadedTypes[2] {
		return e.Transaction, nil
	}
	return nil, &NotLoadedError{edge: "transaction"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Account) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case account.FieldAmount, account.FieldValue, account.FieldFxRate, account.FieldBalance:
			values[i] = new(decimal.Decimal)
		case account.FieldArchived, account.FieldIncludeInNetWorth:
			values[i] = new(sql.NullBool)
		case account.FieldID, account.FieldName, account.FieldAccountType, account.FieldSymbol, account.FieldSymbolType:
			values[i] = new(sql.NullString)
		case account.FieldCreatedAt, account.FieldUpdatedAt:
			values[i] = new(sql.NullTime)
		case account.ForeignKeys[0]: // profile_account
			values[i] = new(sql.NullString)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Account fields.
func (a *Account) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case account.FieldID:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value.Valid {
				a.ID = value.String
			}
		case account.FieldName:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field name", values[i])
			} else if value.Valid {
				a.Name = value.String
			}
		case account.FieldAccountType:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field account_type", values[i])
			} else if value.Valid {
				a.AccountType = account.AccountType(value.String)
			}
		case account.FieldArchived:
			if value, ok := values[i].(*sql.NullBool); !ok {
				return fmt.Errorf("unexpected type %T for field archived", values[i])
			} else if value.Valid {
				a.Archived = value.Bool
			}
		case account.FieldIncludeInNetWorth:
			if value, ok := values[i].(*sql.NullBool); !ok {
				return fmt.Errorf("unexpected type %T for field include_in_net_worth", values[i])
			} else if value.Valid {
				a.IncludeInNetWorth = value.Bool
			}
		case account.FieldSymbol:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field symbol", values[i])
			} else if value.Valid {
				a.Symbol = value.String
			}
		case account.FieldSymbolType:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field symbol_type", values[i])
			} else if value.Valid {
				a.SymbolType = account.SymbolType(value.String)
			}
		case account.FieldAmount:
			if value, ok := values[i].(*decimal.Decimal); !ok {
				return fmt.Errorf("unexpected type %T for field amount", values[i])
			} else if value != nil {
				a.Amount = *value
			}
		case account.FieldValue:
			if value, ok := values[i].(*decimal.Decimal); !ok {
				return fmt.Errorf("unexpected type %T for field value", values[i])
			} else if value != nil {
				a.Value = *value
			}
		case account.FieldFxRate:
			if value, ok := values[i].(*decimal.Decimal); !ok {
				return fmt.Errorf("unexpected type %T for field fx_rate", values[i])
			} else if value != nil {
				a.FxRate = *value
			}
		case account.FieldBalance:
			if value, ok := values[i].(*decimal.Decimal); !ok {
				return fmt.Errorf("unexpected type %T for field balance", values[i])
			} else if value != nil {
				a.Balance = *value
			}
		case account.FieldCreatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field created_at", values[i])
			} else if value.Valid {
				a.CreatedAt = value.Time
			}
		case account.FieldUpdatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field updated_at", values[i])
			} else if value.Valid {
				a.UpdatedAt = value.Time
			}
		case account.ForeignKeys[0]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field profile_account", values[i])
			} else if value.Valid {
				a.profile_account = new(string)
				*a.profile_account = value.String
			}
		default:
			a.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// GetValue returns the ent.Value that was dynamically selected and assigned to the Account.
// This includes values selected through modifiers, order, etc.
func (a *Account) GetValue(name string) (ent.Value, error) {
	return a.selectValues.Get(name)
}

// QueryProfile queries the "profile" edge of the Account entity.
func (a *Account) QueryProfile() *ProfileQuery {
	return NewAccountClient(a.config).QueryProfile(a)
}

// QueryAccountSnapshot queries the "account_snapshot" edge of the Account entity.
func (a *Account) QueryAccountSnapshot() *AccountSnapshotQuery {
	return NewAccountClient(a.config).QueryAccountSnapshot(a)
}

// QueryTransaction queries the "transaction" edge of the Account entity.
func (a *Account) QueryTransaction() *TransactionQuery {
	return NewAccountClient(a.config).QueryTransaction(a)
}

// Update returns a builder for updating this Account.
// Note that you need to call Account.Unwrap() before calling this method if this Account
// was returned from a transaction, and the transaction was committed or rolled back.
func (a *Account) Update() *AccountUpdateOne {
	return NewAccountClient(a.config).UpdateOne(a)
}

// Unwrap unwraps the Account entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (a *Account) Unwrap() *Account {
	_tx, ok := a.config.driver.(*txDriver)
	if !ok {
		panic("ent: Account is not a transactional entity")
	}
	a.config.driver = _tx.drv
	return a
}

// String implements the fmt.Stringer.
func (a *Account) String() string {
	var builder strings.Builder
	builder.WriteString("Account(")
	builder.WriteString(fmt.Sprintf("id=%v, ", a.ID))
	builder.WriteString("name=")
	builder.WriteString(a.Name)
	builder.WriteString(", ")
	builder.WriteString("account_type=")
	builder.WriteString(fmt.Sprintf("%v", a.AccountType))
	builder.WriteString(", ")
	builder.WriteString("archived=")
	builder.WriteString(fmt.Sprintf("%v", a.Archived))
	builder.WriteString(", ")
	builder.WriteString("include_in_net_worth=")
	builder.WriteString(fmt.Sprintf("%v", a.IncludeInNetWorth))
	builder.WriteString(", ")
	builder.WriteString("symbol=")
	builder.WriteString(a.Symbol)
	builder.WriteString(", ")
	builder.WriteString("symbol_type=")
	builder.WriteString(fmt.Sprintf("%v", a.SymbolType))
	builder.WriteString(", ")
	builder.WriteString("amount=")
	builder.WriteString(fmt.Sprintf("%v", a.Amount))
	builder.WriteString(", ")
	builder.WriteString("value=")
	builder.WriteString(fmt.Sprintf("%v", a.Value))
	builder.WriteString(", ")
	builder.WriteString("fx_rate=")
	builder.WriteString(fmt.Sprintf("%v", a.FxRate))
	builder.WriteString(", ")
	builder.WriteString("balance=")
	builder.WriteString(fmt.Sprintf("%v", a.Balance))
	builder.WriteString(", ")
	builder.WriteString("created_at=")
	builder.WriteString(a.CreatedAt.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("updated_at=")
	builder.WriteString(a.UpdatedAt.Format(time.ANSIC))
	builder.WriteByte(')')
	return builder.String()
}

// Accounts is a parsable slice of Account.
type Accounts []*Account