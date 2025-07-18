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
	ID int `json:"id,omitempty"`
	// CreateTime holds the value of the "create_time" field.
	CreateTime time.Time `json:"create_time,omitempty"`
	// UpdateTime holds the value of the "update_time" field.
	UpdateTime time.Time `json:"update_time,omitempty"`
	// Name holds the value of the "name" field.
	Name string `json:"name,omitempty"`
	// AccountType holds the value of the "account_type" field.
	AccountType account.AccountType `json:"account_type,omitempty"`
	// InvestmentType holds the value of the "investment_type" field.
	InvestmentType account.InvestmentType `json:"investment_type,omitempty"`
	// CurrencySymbol holds the value of the "currency_symbol" field.
	CurrencySymbol string `json:"currency_symbol,omitempty"`
	// Ticker holds the value of the "ticker" field.
	Ticker string `json:"ticker,omitempty"`
	// TickerType holds the value of the "ticker_type" field.
	TickerType account.TickerType `json:"ticker_type,omitempty"`
	// The unit amount of share or money in this account
	Amount decimal.Decimal `json:"amount,omitempty"`
	// The value of 1 share in the native currency. If this is just a currency account, then this field will be 1
	Value decimal.Decimal `json:"value,omitempty"`
	// The exchange rate from the native currency to user's default display currency
	FxRate decimal.Decimal `json:"fx_rate,omitempty"`
	// The total balance of this account in user's display currency
	Balance decimal.Decimal `json:"balance,omitempty"`
	// Archived holds the value of the "archived" field.
	Archived bool `json:"archived,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the AccountQuery when eager-loading is set.
	Edges            AccountEdges `json:"edges"`
	profile_accounts *int
	selectValues     sql.SelectValues
}

// AccountEdges holds the relations/edges for other nodes in the graph.
type AccountEdges struct {
	// Profile holds the value of the profile edge.
	Profile *Profile `json:"profile,omitempty"`
	// TransactionEntries holds the value of the transaction_entries edge.
	TransactionEntries []*TransactionEntry `json:"transaction_entries,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [2]bool
	// totalCount holds the count of the edges above.
	totalCount [2]map[string]int

	namedTransactionEntries map[string][]*TransactionEntry
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

// TransactionEntriesOrErr returns the TransactionEntries value or an error if the edge
// was not loaded in eager-loading.
func (e AccountEdges) TransactionEntriesOrErr() ([]*TransactionEntry, error) {
	if e.loadedTypes[1] {
		return e.TransactionEntries, nil
	}
	return nil, &NotLoadedError{edge: "transaction_entries"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Account) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case account.FieldAmount, account.FieldValue, account.FieldFxRate, account.FieldBalance:
			values[i] = new(decimal.Decimal)
		case account.FieldArchived:
			values[i] = new(sql.NullBool)
		case account.FieldID:
			values[i] = new(sql.NullInt64)
		case account.FieldName, account.FieldAccountType, account.FieldInvestmentType, account.FieldCurrencySymbol, account.FieldTicker, account.FieldTickerType:
			values[i] = new(sql.NullString)
		case account.FieldCreateTime, account.FieldUpdateTime:
			values[i] = new(sql.NullTime)
		case account.ForeignKeys[0]: // profile_accounts
			values[i] = new(sql.NullInt64)
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
			value, ok := values[i].(*sql.NullInt64)
			if !ok {
				return fmt.Errorf("unexpected type %T for field id", value)
			}
			a.ID = int(value.Int64)
		case account.FieldCreateTime:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field create_time", values[i])
			} else if value.Valid {
				a.CreateTime = value.Time
			}
		case account.FieldUpdateTime:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field update_time", values[i])
			} else if value.Valid {
				a.UpdateTime = value.Time
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
		case account.FieldInvestmentType:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field investment_type", values[i])
			} else if value.Valid {
				a.InvestmentType = account.InvestmentType(value.String)
			}
		case account.FieldCurrencySymbol:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field currency_symbol", values[i])
			} else if value.Valid {
				a.CurrencySymbol = value.String
			}
		case account.FieldTicker:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field ticker", values[i])
			} else if value.Valid {
				a.Ticker = value.String
			}
		case account.FieldTickerType:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field ticker_type", values[i])
			} else if value.Valid {
				a.TickerType = account.TickerType(value.String)
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
		case account.FieldArchived:
			if value, ok := values[i].(*sql.NullBool); !ok {
				return fmt.Errorf("unexpected type %T for field archived", values[i])
			} else if value.Valid {
				a.Archived = value.Bool
			}
		case account.ForeignKeys[0]:
			if value, ok := values[i].(*sql.NullInt64); !ok {
				return fmt.Errorf("unexpected type %T for edge-field profile_accounts", value)
			} else if value.Valid {
				a.profile_accounts = new(int)
				*a.profile_accounts = int(value.Int64)
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

// QueryTransactionEntries queries the "transaction_entries" edge of the Account entity.
func (a *Account) QueryTransactionEntries() *TransactionEntryQuery {
	return NewAccountClient(a.config).QueryTransactionEntries(a)
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
	builder.WriteString("create_time=")
	builder.WriteString(a.CreateTime.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("update_time=")
	builder.WriteString(a.UpdateTime.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("name=")
	builder.WriteString(a.Name)
	builder.WriteString(", ")
	builder.WriteString("account_type=")
	builder.WriteString(fmt.Sprintf("%v", a.AccountType))
	builder.WriteString(", ")
	builder.WriteString("investment_type=")
	builder.WriteString(fmt.Sprintf("%v", a.InvestmentType))
	builder.WriteString(", ")
	builder.WriteString("currency_symbol=")
	builder.WriteString(a.CurrencySymbol)
	builder.WriteString(", ")
	builder.WriteString("ticker=")
	builder.WriteString(a.Ticker)
	builder.WriteString(", ")
	builder.WriteString("ticker_type=")
	builder.WriteString(fmt.Sprintf("%v", a.TickerType))
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
	builder.WriteString("archived=")
	builder.WriteString(fmt.Sprintf("%v", a.Archived))
	builder.WriteByte(')')
	return builder.String()
}

// NamedTransactionEntries returns the TransactionEntries named value or an error if the edge was not
// loaded in eager-loading with this name.
func (a *Account) NamedTransactionEntries(name string) ([]*TransactionEntry, error) {
	if a.Edges.namedTransactionEntries == nil {
		return nil, &NotLoadedError{edge: name}
	}
	nodes, ok := a.Edges.namedTransactionEntries[name]
	if !ok {
		return nil, &NotLoadedError{edge: name}
	}
	return nodes, nil
}

func (a *Account) appendNamedTransactionEntries(name string, edges ...*TransactionEntry) {
	if a.Edges.namedTransactionEntries == nil {
		a.Edges.namedTransactionEntries = make(map[string][]*TransactionEntry)
	}
	if len(edges) == 0 {
		a.Edges.namedTransactionEntries[name] = []*TransactionEntry{}
	} else {
		a.Edges.namedTransactionEntries[name] = append(a.Edges.namedTransactionEntries[name], edges...)
	}
}

// Accounts is a parsable slice of Account.
type Accounts []*Account
