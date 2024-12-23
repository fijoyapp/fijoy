// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fijoy/ent/account"
	"fijoy/ent/predicate"
	"fijoy/ent/profile"
	"fijoy/ent/transaction"
	"fmt"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/shopspring/decimal"
)

// AccountUpdate is the builder for updating Account entities.
type AccountUpdate struct {
	config
	hooks    []Hook
	mutation *AccountMutation
}

// Where appends a list predicates to the AccountUpdate builder.
func (au *AccountUpdate) Where(ps ...predicate.Account) *AccountUpdate {
	au.mutation.Where(ps...)
	return au
}

// SetName sets the "name" field.
func (au *AccountUpdate) SetName(s string) *AccountUpdate {
	au.mutation.SetName(s)
	return au
}

// SetNillableName sets the "name" field if the given value is not nil.
func (au *AccountUpdate) SetNillableName(s *string) *AccountUpdate {
	if s != nil {
		au.SetName(*s)
	}
	return au
}

// SetAccountType sets the "account_type" field.
func (au *AccountUpdate) SetAccountType(at account.AccountType) *AccountUpdate {
	au.mutation.SetAccountType(at)
	return au
}

// SetNillableAccountType sets the "account_type" field if the given value is not nil.
func (au *AccountUpdate) SetNillableAccountType(at *account.AccountType) *AccountUpdate {
	if at != nil {
		au.SetAccountType(*at)
	}
	return au
}

// SetArchived sets the "archived" field.
func (au *AccountUpdate) SetArchived(b bool) *AccountUpdate {
	au.mutation.SetArchived(b)
	return au
}

// SetNillableArchived sets the "archived" field if the given value is not nil.
func (au *AccountUpdate) SetNillableArchived(b *bool) *AccountUpdate {
	if b != nil {
		au.SetArchived(*b)
	}
	return au
}

// SetSymbol sets the "symbol" field.
func (au *AccountUpdate) SetSymbol(s string) *AccountUpdate {
	au.mutation.SetSymbol(s)
	return au
}

// SetNillableSymbol sets the "symbol" field if the given value is not nil.
func (au *AccountUpdate) SetNillableSymbol(s *string) *AccountUpdate {
	if s != nil {
		au.SetSymbol(*s)
	}
	return au
}

// SetSymbolType sets the "symbol_type" field.
func (au *AccountUpdate) SetSymbolType(at account.SymbolType) *AccountUpdate {
	au.mutation.SetSymbolType(at)
	return au
}

// SetNillableSymbolType sets the "symbol_type" field if the given value is not nil.
func (au *AccountUpdate) SetNillableSymbolType(at *account.SymbolType) *AccountUpdate {
	if at != nil {
		au.SetSymbolType(*at)
	}
	return au
}

// SetAmount sets the "amount" field.
func (au *AccountUpdate) SetAmount(d decimal.Decimal) *AccountUpdate {
	au.mutation.ResetAmount()
	au.mutation.SetAmount(d)
	return au
}

// SetNillableAmount sets the "amount" field if the given value is not nil.
func (au *AccountUpdate) SetNillableAmount(d *decimal.Decimal) *AccountUpdate {
	if d != nil {
		au.SetAmount(*d)
	}
	return au
}

// AddAmount adds d to the "amount" field.
func (au *AccountUpdate) AddAmount(d decimal.Decimal) *AccountUpdate {
	au.mutation.AddAmount(d)
	return au
}

// SetValue sets the "value" field.
func (au *AccountUpdate) SetValue(d decimal.Decimal) *AccountUpdate {
	au.mutation.ResetValue()
	au.mutation.SetValue(d)
	return au
}

// SetNillableValue sets the "value" field if the given value is not nil.
func (au *AccountUpdate) SetNillableValue(d *decimal.Decimal) *AccountUpdate {
	if d != nil {
		au.SetValue(*d)
	}
	return au
}

// AddValue adds d to the "value" field.
func (au *AccountUpdate) AddValue(d decimal.Decimal) *AccountUpdate {
	au.mutation.AddValue(d)
	return au
}

// SetFxRate sets the "fx_rate" field.
func (au *AccountUpdate) SetFxRate(d decimal.Decimal) *AccountUpdate {
	au.mutation.ResetFxRate()
	au.mutation.SetFxRate(d)
	return au
}

// SetNillableFxRate sets the "fx_rate" field if the given value is not nil.
func (au *AccountUpdate) SetNillableFxRate(d *decimal.Decimal) *AccountUpdate {
	if d != nil {
		au.SetFxRate(*d)
	}
	return au
}

// AddFxRate adds d to the "fx_rate" field.
func (au *AccountUpdate) AddFxRate(d decimal.Decimal) *AccountUpdate {
	au.mutation.AddFxRate(d)
	return au
}

// ClearFxRate clears the value of the "fx_rate" field.
func (au *AccountUpdate) ClearFxRate() *AccountUpdate {
	au.mutation.ClearFxRate()
	return au
}

// SetBalance sets the "balance" field.
func (au *AccountUpdate) SetBalance(d decimal.Decimal) *AccountUpdate {
	au.mutation.ResetBalance()
	au.mutation.SetBalance(d)
	return au
}

// SetNillableBalance sets the "balance" field if the given value is not nil.
func (au *AccountUpdate) SetNillableBalance(d *decimal.Decimal) *AccountUpdate {
	if d != nil {
		au.SetBalance(*d)
	}
	return au
}

// AddBalance adds d to the "balance" field.
func (au *AccountUpdate) AddBalance(d decimal.Decimal) *AccountUpdate {
	au.mutation.AddBalance(d)
	return au
}

// SetCreatedAt sets the "created_at" field.
func (au *AccountUpdate) SetCreatedAt(t time.Time) *AccountUpdate {
	au.mutation.SetCreatedAt(t)
	return au
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (au *AccountUpdate) SetNillableCreatedAt(t *time.Time) *AccountUpdate {
	if t != nil {
		au.SetCreatedAt(*t)
	}
	return au
}

// SetUpdatedAt sets the "updated_at" field.
func (au *AccountUpdate) SetUpdatedAt(t time.Time) *AccountUpdate {
	au.mutation.SetUpdatedAt(t)
	return au
}

// SetNillableUpdatedAt sets the "updated_at" field if the given value is not nil.
func (au *AccountUpdate) SetNillableUpdatedAt(t *time.Time) *AccountUpdate {
	if t != nil {
		au.SetUpdatedAt(*t)
	}
	return au
}

// SetProfileID sets the "profile" edge to the Profile entity by ID.
func (au *AccountUpdate) SetProfileID(id string) *AccountUpdate {
	au.mutation.SetProfileID(id)
	return au
}

// SetProfile sets the "profile" edge to the Profile entity.
func (au *AccountUpdate) SetProfile(p *Profile) *AccountUpdate {
	return au.SetProfileID(p.ID)
}

// AddTransactionIDs adds the "transaction" edge to the Transaction entity by IDs.
func (au *AccountUpdate) AddTransactionIDs(ids ...string) *AccountUpdate {
	au.mutation.AddTransactionIDs(ids...)
	return au
}

// AddTransaction adds the "transaction" edges to the Transaction entity.
func (au *AccountUpdate) AddTransaction(t ...*Transaction) *AccountUpdate {
	ids := make([]string, len(t))
	for i := range t {
		ids[i] = t[i].ID
	}
	return au.AddTransactionIDs(ids...)
}

// Mutation returns the AccountMutation object of the builder.
func (au *AccountUpdate) Mutation() *AccountMutation {
	return au.mutation
}

// ClearProfile clears the "profile" edge to the Profile entity.
func (au *AccountUpdate) ClearProfile() *AccountUpdate {
	au.mutation.ClearProfile()
	return au
}

// ClearTransaction clears all "transaction" edges to the Transaction entity.
func (au *AccountUpdate) ClearTransaction() *AccountUpdate {
	au.mutation.ClearTransaction()
	return au
}

// RemoveTransactionIDs removes the "transaction" edge to Transaction entities by IDs.
func (au *AccountUpdate) RemoveTransactionIDs(ids ...string) *AccountUpdate {
	au.mutation.RemoveTransactionIDs(ids...)
	return au
}

// RemoveTransaction removes "transaction" edges to Transaction entities.
func (au *AccountUpdate) RemoveTransaction(t ...*Transaction) *AccountUpdate {
	ids := make([]string, len(t))
	for i := range t {
		ids[i] = t[i].ID
	}
	return au.RemoveTransactionIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (au *AccountUpdate) Save(ctx context.Context) (int, error) {
	return withHooks(ctx, au.sqlSave, au.mutation, au.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (au *AccountUpdate) SaveX(ctx context.Context) int {
	affected, err := au.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (au *AccountUpdate) Exec(ctx context.Context) error {
	_, err := au.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (au *AccountUpdate) ExecX(ctx context.Context) {
	if err := au.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (au *AccountUpdate) check() error {
	if v, ok := au.mutation.Name(); ok {
		if err := account.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf(`ent: validator failed for field "Account.name": %w`, err)}
		}
	}
	if v, ok := au.mutation.AccountType(); ok {
		if err := account.AccountTypeValidator(v); err != nil {
			return &ValidationError{Name: "account_type", err: fmt.Errorf(`ent: validator failed for field "Account.account_type": %w`, err)}
		}
	}
	if v, ok := au.mutation.Symbol(); ok {
		if err := account.SymbolValidator(v); err != nil {
			return &ValidationError{Name: "symbol", err: fmt.Errorf(`ent: validator failed for field "Account.symbol": %w`, err)}
		}
	}
	if v, ok := au.mutation.SymbolType(); ok {
		if err := account.SymbolTypeValidator(v); err != nil {
			return &ValidationError{Name: "symbol_type", err: fmt.Errorf(`ent: validator failed for field "Account.symbol_type": %w`, err)}
		}
	}
	if au.mutation.ProfileCleared() && len(au.mutation.ProfileIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "Account.profile"`)
	}
	return nil
}

func (au *AccountUpdate) sqlSave(ctx context.Context) (n int, err error) {
	if err := au.check(); err != nil {
		return n, err
	}
	_spec := sqlgraph.NewUpdateSpec(account.Table, account.Columns, sqlgraph.NewFieldSpec(account.FieldID, field.TypeString))
	if ps := au.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := au.mutation.Name(); ok {
		_spec.SetField(account.FieldName, field.TypeString, value)
	}
	if value, ok := au.mutation.AccountType(); ok {
		_spec.SetField(account.FieldAccountType, field.TypeEnum, value)
	}
	if value, ok := au.mutation.Archived(); ok {
		_spec.SetField(account.FieldArchived, field.TypeBool, value)
	}
	if value, ok := au.mutation.Symbol(); ok {
		_spec.SetField(account.FieldSymbol, field.TypeString, value)
	}
	if value, ok := au.mutation.SymbolType(); ok {
		_spec.SetField(account.FieldSymbolType, field.TypeEnum, value)
	}
	if value, ok := au.mutation.Amount(); ok {
		_spec.SetField(account.FieldAmount, field.TypeFloat64, value)
	}
	if value, ok := au.mutation.AddedAmount(); ok {
		_spec.AddField(account.FieldAmount, field.TypeFloat64, value)
	}
	if value, ok := au.mutation.Value(); ok {
		_spec.SetField(account.FieldValue, field.TypeFloat64, value)
	}
	if value, ok := au.mutation.AddedValue(); ok {
		_spec.AddField(account.FieldValue, field.TypeFloat64, value)
	}
	if value, ok := au.mutation.FxRate(); ok {
		_spec.SetField(account.FieldFxRate, field.TypeFloat64, value)
	}
	if value, ok := au.mutation.AddedFxRate(); ok {
		_spec.AddField(account.FieldFxRate, field.TypeFloat64, value)
	}
	if au.mutation.FxRateCleared() {
		_spec.ClearField(account.FieldFxRate, field.TypeFloat64)
	}
	if value, ok := au.mutation.Balance(); ok {
		_spec.SetField(account.FieldBalance, field.TypeFloat64, value)
	}
	if value, ok := au.mutation.AddedBalance(); ok {
		_spec.AddField(account.FieldBalance, field.TypeFloat64, value)
	}
	if value, ok := au.mutation.CreatedAt(); ok {
		_spec.SetField(account.FieldCreatedAt, field.TypeTime, value)
	}
	if value, ok := au.mutation.UpdatedAt(); ok {
		_spec.SetField(account.FieldUpdatedAt, field.TypeTime, value)
	}
	if au.mutation.ProfileCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   account.ProfileTable,
			Columns: []string{account.ProfileColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(profile.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := au.mutation.ProfileIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   account.ProfileTable,
			Columns: []string{account.ProfileColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(profile.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if au.mutation.TransactionCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   account.TransactionTable,
			Columns: []string{account.TransactionColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(transaction.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := au.mutation.RemovedTransactionIDs(); len(nodes) > 0 && !au.mutation.TransactionCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   account.TransactionTable,
			Columns: []string{account.TransactionColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(transaction.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := au.mutation.TransactionIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   account.TransactionTable,
			Columns: []string{account.TransactionColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(transaction.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, au.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{account.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	au.mutation.done = true
	return n, nil
}

// AccountUpdateOne is the builder for updating a single Account entity.
type AccountUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *AccountMutation
}

// SetName sets the "name" field.
func (auo *AccountUpdateOne) SetName(s string) *AccountUpdateOne {
	auo.mutation.SetName(s)
	return auo
}

// SetNillableName sets the "name" field if the given value is not nil.
func (auo *AccountUpdateOne) SetNillableName(s *string) *AccountUpdateOne {
	if s != nil {
		auo.SetName(*s)
	}
	return auo
}

// SetAccountType sets the "account_type" field.
func (auo *AccountUpdateOne) SetAccountType(at account.AccountType) *AccountUpdateOne {
	auo.mutation.SetAccountType(at)
	return auo
}

// SetNillableAccountType sets the "account_type" field if the given value is not nil.
func (auo *AccountUpdateOne) SetNillableAccountType(at *account.AccountType) *AccountUpdateOne {
	if at != nil {
		auo.SetAccountType(*at)
	}
	return auo
}

// SetArchived sets the "archived" field.
func (auo *AccountUpdateOne) SetArchived(b bool) *AccountUpdateOne {
	auo.mutation.SetArchived(b)
	return auo
}

// SetNillableArchived sets the "archived" field if the given value is not nil.
func (auo *AccountUpdateOne) SetNillableArchived(b *bool) *AccountUpdateOne {
	if b != nil {
		auo.SetArchived(*b)
	}
	return auo
}

// SetSymbol sets the "symbol" field.
func (auo *AccountUpdateOne) SetSymbol(s string) *AccountUpdateOne {
	auo.mutation.SetSymbol(s)
	return auo
}

// SetNillableSymbol sets the "symbol" field if the given value is not nil.
func (auo *AccountUpdateOne) SetNillableSymbol(s *string) *AccountUpdateOne {
	if s != nil {
		auo.SetSymbol(*s)
	}
	return auo
}

// SetSymbolType sets the "symbol_type" field.
func (auo *AccountUpdateOne) SetSymbolType(at account.SymbolType) *AccountUpdateOne {
	auo.mutation.SetSymbolType(at)
	return auo
}

// SetNillableSymbolType sets the "symbol_type" field if the given value is not nil.
func (auo *AccountUpdateOne) SetNillableSymbolType(at *account.SymbolType) *AccountUpdateOne {
	if at != nil {
		auo.SetSymbolType(*at)
	}
	return auo
}

// SetAmount sets the "amount" field.
func (auo *AccountUpdateOne) SetAmount(d decimal.Decimal) *AccountUpdateOne {
	auo.mutation.ResetAmount()
	auo.mutation.SetAmount(d)
	return auo
}

// SetNillableAmount sets the "amount" field if the given value is not nil.
func (auo *AccountUpdateOne) SetNillableAmount(d *decimal.Decimal) *AccountUpdateOne {
	if d != nil {
		auo.SetAmount(*d)
	}
	return auo
}

// AddAmount adds d to the "amount" field.
func (auo *AccountUpdateOne) AddAmount(d decimal.Decimal) *AccountUpdateOne {
	auo.mutation.AddAmount(d)
	return auo
}

// SetValue sets the "value" field.
func (auo *AccountUpdateOne) SetValue(d decimal.Decimal) *AccountUpdateOne {
	auo.mutation.ResetValue()
	auo.mutation.SetValue(d)
	return auo
}

// SetNillableValue sets the "value" field if the given value is not nil.
func (auo *AccountUpdateOne) SetNillableValue(d *decimal.Decimal) *AccountUpdateOne {
	if d != nil {
		auo.SetValue(*d)
	}
	return auo
}

// AddValue adds d to the "value" field.
func (auo *AccountUpdateOne) AddValue(d decimal.Decimal) *AccountUpdateOne {
	auo.mutation.AddValue(d)
	return auo
}

// SetFxRate sets the "fx_rate" field.
func (auo *AccountUpdateOne) SetFxRate(d decimal.Decimal) *AccountUpdateOne {
	auo.mutation.ResetFxRate()
	auo.mutation.SetFxRate(d)
	return auo
}

// SetNillableFxRate sets the "fx_rate" field if the given value is not nil.
func (auo *AccountUpdateOne) SetNillableFxRate(d *decimal.Decimal) *AccountUpdateOne {
	if d != nil {
		auo.SetFxRate(*d)
	}
	return auo
}

// AddFxRate adds d to the "fx_rate" field.
func (auo *AccountUpdateOne) AddFxRate(d decimal.Decimal) *AccountUpdateOne {
	auo.mutation.AddFxRate(d)
	return auo
}

// ClearFxRate clears the value of the "fx_rate" field.
func (auo *AccountUpdateOne) ClearFxRate() *AccountUpdateOne {
	auo.mutation.ClearFxRate()
	return auo
}

// SetBalance sets the "balance" field.
func (auo *AccountUpdateOne) SetBalance(d decimal.Decimal) *AccountUpdateOne {
	auo.mutation.ResetBalance()
	auo.mutation.SetBalance(d)
	return auo
}

// SetNillableBalance sets the "balance" field if the given value is not nil.
func (auo *AccountUpdateOne) SetNillableBalance(d *decimal.Decimal) *AccountUpdateOne {
	if d != nil {
		auo.SetBalance(*d)
	}
	return auo
}

// AddBalance adds d to the "balance" field.
func (auo *AccountUpdateOne) AddBalance(d decimal.Decimal) *AccountUpdateOne {
	auo.mutation.AddBalance(d)
	return auo
}

// SetCreatedAt sets the "created_at" field.
func (auo *AccountUpdateOne) SetCreatedAt(t time.Time) *AccountUpdateOne {
	auo.mutation.SetCreatedAt(t)
	return auo
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (auo *AccountUpdateOne) SetNillableCreatedAt(t *time.Time) *AccountUpdateOne {
	if t != nil {
		auo.SetCreatedAt(*t)
	}
	return auo
}

// SetUpdatedAt sets the "updated_at" field.
func (auo *AccountUpdateOne) SetUpdatedAt(t time.Time) *AccountUpdateOne {
	auo.mutation.SetUpdatedAt(t)
	return auo
}

// SetNillableUpdatedAt sets the "updated_at" field if the given value is not nil.
func (auo *AccountUpdateOne) SetNillableUpdatedAt(t *time.Time) *AccountUpdateOne {
	if t != nil {
		auo.SetUpdatedAt(*t)
	}
	return auo
}

// SetProfileID sets the "profile" edge to the Profile entity by ID.
func (auo *AccountUpdateOne) SetProfileID(id string) *AccountUpdateOne {
	auo.mutation.SetProfileID(id)
	return auo
}

// SetProfile sets the "profile" edge to the Profile entity.
func (auo *AccountUpdateOne) SetProfile(p *Profile) *AccountUpdateOne {
	return auo.SetProfileID(p.ID)
}

// AddTransactionIDs adds the "transaction" edge to the Transaction entity by IDs.
func (auo *AccountUpdateOne) AddTransactionIDs(ids ...string) *AccountUpdateOne {
	auo.mutation.AddTransactionIDs(ids...)
	return auo
}

// AddTransaction adds the "transaction" edges to the Transaction entity.
func (auo *AccountUpdateOne) AddTransaction(t ...*Transaction) *AccountUpdateOne {
	ids := make([]string, len(t))
	for i := range t {
		ids[i] = t[i].ID
	}
	return auo.AddTransactionIDs(ids...)
}

// Mutation returns the AccountMutation object of the builder.
func (auo *AccountUpdateOne) Mutation() *AccountMutation {
	return auo.mutation
}

// ClearProfile clears the "profile" edge to the Profile entity.
func (auo *AccountUpdateOne) ClearProfile() *AccountUpdateOne {
	auo.mutation.ClearProfile()
	return auo
}

// ClearTransaction clears all "transaction" edges to the Transaction entity.
func (auo *AccountUpdateOne) ClearTransaction() *AccountUpdateOne {
	auo.mutation.ClearTransaction()
	return auo
}

// RemoveTransactionIDs removes the "transaction" edge to Transaction entities by IDs.
func (auo *AccountUpdateOne) RemoveTransactionIDs(ids ...string) *AccountUpdateOne {
	auo.mutation.RemoveTransactionIDs(ids...)
	return auo
}

// RemoveTransaction removes "transaction" edges to Transaction entities.
func (auo *AccountUpdateOne) RemoveTransaction(t ...*Transaction) *AccountUpdateOne {
	ids := make([]string, len(t))
	for i := range t {
		ids[i] = t[i].ID
	}
	return auo.RemoveTransactionIDs(ids...)
}

// Where appends a list predicates to the AccountUpdate builder.
func (auo *AccountUpdateOne) Where(ps ...predicate.Account) *AccountUpdateOne {
	auo.mutation.Where(ps...)
	return auo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (auo *AccountUpdateOne) Select(field string, fields ...string) *AccountUpdateOne {
	auo.fields = append([]string{field}, fields...)
	return auo
}

// Save executes the query and returns the updated Account entity.
func (auo *AccountUpdateOne) Save(ctx context.Context) (*Account, error) {
	return withHooks(ctx, auo.sqlSave, auo.mutation, auo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (auo *AccountUpdateOne) SaveX(ctx context.Context) *Account {
	node, err := auo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (auo *AccountUpdateOne) Exec(ctx context.Context) error {
	_, err := auo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (auo *AccountUpdateOne) ExecX(ctx context.Context) {
	if err := auo.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (auo *AccountUpdateOne) check() error {
	if v, ok := auo.mutation.Name(); ok {
		if err := account.NameValidator(v); err != nil {
			return &ValidationError{Name: "name", err: fmt.Errorf(`ent: validator failed for field "Account.name": %w`, err)}
		}
	}
	if v, ok := auo.mutation.AccountType(); ok {
		if err := account.AccountTypeValidator(v); err != nil {
			return &ValidationError{Name: "account_type", err: fmt.Errorf(`ent: validator failed for field "Account.account_type": %w`, err)}
		}
	}
	if v, ok := auo.mutation.Symbol(); ok {
		if err := account.SymbolValidator(v); err != nil {
			return &ValidationError{Name: "symbol", err: fmt.Errorf(`ent: validator failed for field "Account.symbol": %w`, err)}
		}
	}
	if v, ok := auo.mutation.SymbolType(); ok {
		if err := account.SymbolTypeValidator(v); err != nil {
			return &ValidationError{Name: "symbol_type", err: fmt.Errorf(`ent: validator failed for field "Account.symbol_type": %w`, err)}
		}
	}
	if auo.mutation.ProfileCleared() && len(auo.mutation.ProfileIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "Account.profile"`)
	}
	return nil
}

func (auo *AccountUpdateOne) sqlSave(ctx context.Context) (_node *Account, err error) {
	if err := auo.check(); err != nil {
		return _node, err
	}
	_spec := sqlgraph.NewUpdateSpec(account.Table, account.Columns, sqlgraph.NewFieldSpec(account.FieldID, field.TypeString))
	id, ok := auo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "Account.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := auo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, account.FieldID)
		for _, f := range fields {
			if !account.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != account.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := auo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := auo.mutation.Name(); ok {
		_spec.SetField(account.FieldName, field.TypeString, value)
	}
	if value, ok := auo.mutation.AccountType(); ok {
		_spec.SetField(account.FieldAccountType, field.TypeEnum, value)
	}
	if value, ok := auo.mutation.Archived(); ok {
		_spec.SetField(account.FieldArchived, field.TypeBool, value)
	}
	if value, ok := auo.mutation.Symbol(); ok {
		_spec.SetField(account.FieldSymbol, field.TypeString, value)
	}
	if value, ok := auo.mutation.SymbolType(); ok {
		_spec.SetField(account.FieldSymbolType, field.TypeEnum, value)
	}
	if value, ok := auo.mutation.Amount(); ok {
		_spec.SetField(account.FieldAmount, field.TypeFloat64, value)
	}
	if value, ok := auo.mutation.AddedAmount(); ok {
		_spec.AddField(account.FieldAmount, field.TypeFloat64, value)
	}
	if value, ok := auo.mutation.Value(); ok {
		_spec.SetField(account.FieldValue, field.TypeFloat64, value)
	}
	if value, ok := auo.mutation.AddedValue(); ok {
		_spec.AddField(account.FieldValue, field.TypeFloat64, value)
	}
	if value, ok := auo.mutation.FxRate(); ok {
		_spec.SetField(account.FieldFxRate, field.TypeFloat64, value)
	}
	if value, ok := auo.mutation.AddedFxRate(); ok {
		_spec.AddField(account.FieldFxRate, field.TypeFloat64, value)
	}
	if auo.mutation.FxRateCleared() {
		_spec.ClearField(account.FieldFxRate, field.TypeFloat64)
	}
	if value, ok := auo.mutation.Balance(); ok {
		_spec.SetField(account.FieldBalance, field.TypeFloat64, value)
	}
	if value, ok := auo.mutation.AddedBalance(); ok {
		_spec.AddField(account.FieldBalance, field.TypeFloat64, value)
	}
	if value, ok := auo.mutation.CreatedAt(); ok {
		_spec.SetField(account.FieldCreatedAt, field.TypeTime, value)
	}
	if value, ok := auo.mutation.UpdatedAt(); ok {
		_spec.SetField(account.FieldUpdatedAt, field.TypeTime, value)
	}
	if auo.mutation.ProfileCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   account.ProfileTable,
			Columns: []string{account.ProfileColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(profile.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := auo.mutation.ProfileIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   account.ProfileTable,
			Columns: []string{account.ProfileColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(profile.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if auo.mutation.TransactionCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   account.TransactionTable,
			Columns: []string{account.TransactionColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(transaction.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := auo.mutation.RemovedTransactionIDs(); len(nodes) > 0 && !auo.mutation.TransactionCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   account.TransactionTable,
			Columns: []string{account.TransactionColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(transaction.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := auo.mutation.TransactionIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   account.TransactionTable,
			Columns: []string{account.TransactionColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(transaction.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &Account{config: auo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, auo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{account.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	auo.mutation.done = true
	return _node, nil
}
