// Code generated by ent, DO NOT EDIT.

package ent

import (
	"fijoy/ent/profile"
	"fijoy/ent/user"
	"fmt"
	"strings"
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"github.com/shopspring/decimal"
)

// Profile is the model entity for the Profile schema.
type Profile struct {
	config `json:"-"`
	// ID of the ent.
	ID string `json:"id,omitempty"`
	// Locale holds the value of the "locale" field.
	Locale string `json:"locale,omitempty"`
	// Currencies holds the value of the "currencies" field.
	Currencies string `json:"currencies,omitempty"`
	// NetWorthGoal holds the value of the "net_worth_goal" field.
	NetWorthGoal decimal.Decimal `json:"net_worth_goal,omitempty"`
	// CreatedAt holds the value of the "created_at" field.
	CreatedAt time.Time `json:"created_at,omitempty"`
	// UpdatedAt holds the value of the "updated_at" field.
	UpdatedAt time.Time `json:"updated_at,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the ProfileQuery when eager-loading is set.
	Edges        ProfileEdges `json:"edges"`
	user_profile *string
	selectValues sql.SelectValues
}

// ProfileEdges holds the relations/edges for other nodes in the graph.
type ProfileEdges struct {
	// User holds the value of the user edge.
	User *User `json:"user,omitempty"`
	// Account holds the value of the account edge.
	Account []*Account `json:"account,omitempty"`
	// Transaction holds the value of the transaction edge.
	Transaction []*Transaction `json:"transaction,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [3]bool
}

// UserOrErr returns the User value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e ProfileEdges) UserOrErr() (*User, error) {
	if e.User != nil {
		return e.User, nil
	} else if e.loadedTypes[0] {
		return nil, &NotFoundError{label: user.Label}
	}
	return nil, &NotLoadedError{edge: "user"}
}

// AccountOrErr returns the Account value or an error if the edge
// was not loaded in eager-loading.
func (e ProfileEdges) AccountOrErr() ([]*Account, error) {
	if e.loadedTypes[1] {
		return e.Account, nil
	}
	return nil, &NotLoadedError{edge: "account"}
}

// TransactionOrErr returns the Transaction value or an error if the edge
// was not loaded in eager-loading.
func (e ProfileEdges) TransactionOrErr() ([]*Transaction, error) {
	if e.loadedTypes[2] {
		return e.Transaction, nil
	}
	return nil, &NotLoadedError{edge: "transaction"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Profile) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case profile.FieldNetWorthGoal:
			values[i] = new(decimal.Decimal)
		case profile.FieldID, profile.FieldLocale, profile.FieldCurrencies:
			values[i] = new(sql.NullString)
		case profile.FieldCreatedAt, profile.FieldUpdatedAt:
			values[i] = new(sql.NullTime)
		case profile.ForeignKeys[0]: // user_profile
			values[i] = new(sql.NullString)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Profile fields.
func (pr *Profile) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case profile.FieldID:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value.Valid {
				pr.ID = value.String
			}
		case profile.FieldLocale:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field locale", values[i])
			} else if value.Valid {
				pr.Locale = value.String
			}
		case profile.FieldCurrencies:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field currencies", values[i])
			} else if value.Valid {
				pr.Currencies = value.String
			}
		case profile.FieldNetWorthGoal:
			if value, ok := values[i].(*decimal.Decimal); !ok {
				return fmt.Errorf("unexpected type %T for field net_worth_goal", values[i])
			} else if value != nil {
				pr.NetWorthGoal = *value
			}
		case profile.FieldCreatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field created_at", values[i])
			} else if value.Valid {
				pr.CreatedAt = value.Time
			}
		case profile.FieldUpdatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field updated_at", values[i])
			} else if value.Valid {
				pr.UpdatedAt = value.Time
			}
		case profile.ForeignKeys[0]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field user_profile", values[i])
			} else if value.Valid {
				pr.user_profile = new(string)
				*pr.user_profile = value.String
			}
		default:
			pr.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// Value returns the ent.Value that was dynamically selected and assigned to the Profile.
// This includes values selected through modifiers, order, etc.
func (pr *Profile) Value(name string) (ent.Value, error) {
	return pr.selectValues.Get(name)
}

// QueryUser queries the "user" edge of the Profile entity.
func (pr *Profile) QueryUser() *UserQuery {
	return NewProfileClient(pr.config).QueryUser(pr)
}

// QueryAccount queries the "account" edge of the Profile entity.
func (pr *Profile) QueryAccount() *AccountQuery {
	return NewProfileClient(pr.config).QueryAccount(pr)
}

// QueryTransaction queries the "transaction" edge of the Profile entity.
func (pr *Profile) QueryTransaction() *TransactionQuery {
	return NewProfileClient(pr.config).QueryTransaction(pr)
}

// Update returns a builder for updating this Profile.
// Note that you need to call Profile.Unwrap() before calling this method if this Profile
// was returned from a transaction, and the transaction was committed or rolled back.
func (pr *Profile) Update() *ProfileUpdateOne {
	return NewProfileClient(pr.config).UpdateOne(pr)
}

// Unwrap unwraps the Profile entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (pr *Profile) Unwrap() *Profile {
	_tx, ok := pr.config.driver.(*txDriver)
	if !ok {
		panic("ent: Profile is not a transactional entity")
	}
	pr.config.driver = _tx.drv
	return pr
}

// String implements the fmt.Stringer.
func (pr *Profile) String() string {
	var builder strings.Builder
	builder.WriteString("Profile(")
	builder.WriteString(fmt.Sprintf("id=%v, ", pr.ID))
	builder.WriteString("locale=")
	builder.WriteString(pr.Locale)
	builder.WriteString(", ")
	builder.WriteString("currencies=")
	builder.WriteString(pr.Currencies)
	builder.WriteString(", ")
	builder.WriteString("net_worth_goal=")
	builder.WriteString(fmt.Sprintf("%v", pr.NetWorthGoal))
	builder.WriteString(", ")
	builder.WriteString("created_at=")
	builder.WriteString(pr.CreatedAt.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("updated_at=")
	builder.WriteString(pr.UpdatedAt.Format(time.ANSIC))
	builder.WriteByte(')')
	return builder.String()
}

// Profiles is a parsable slice of Profile.
type Profiles []*Profile
