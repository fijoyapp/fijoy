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

// TransactionUpdate is the builder for updating Transaction entities.
type TransactionUpdate struct {
	config
	hooks    []Hook
	mutation *TransactionMutation
}

// Where appends a list predicates to the TransactionUpdate builder.
func (tu *TransactionUpdate) Where(ps ...predicate.Transaction) *TransactionUpdate {
	tu.mutation.Where(ps...)
	return tu
}

// SetAmount sets the "amount" field.
func (tu *TransactionUpdate) SetAmount(d decimal.Decimal) *TransactionUpdate {
	tu.mutation.ResetAmount()
	tu.mutation.SetAmount(d)
	return tu
}

// SetNillableAmount sets the "amount" field if the given value is not nil.
func (tu *TransactionUpdate) SetNillableAmount(d *decimal.Decimal) *TransactionUpdate {
	if d != nil {
		tu.SetAmount(*d)
	}
	return tu
}

// AddAmount adds d to the "amount" field.
func (tu *TransactionUpdate) AddAmount(d decimal.Decimal) *TransactionUpdate {
	tu.mutation.AddAmount(d)
	return tu
}

// SetAmountDelta sets the "amount_delta" field.
func (tu *TransactionUpdate) SetAmountDelta(d decimal.Decimal) *TransactionUpdate {
	tu.mutation.ResetAmountDelta()
	tu.mutation.SetAmountDelta(d)
	return tu
}

// SetNillableAmountDelta sets the "amount_delta" field if the given value is not nil.
func (tu *TransactionUpdate) SetNillableAmountDelta(d *decimal.Decimal) *TransactionUpdate {
	if d != nil {
		tu.SetAmountDelta(*d)
	}
	return tu
}

// AddAmountDelta adds d to the "amount_delta" field.
func (tu *TransactionUpdate) AddAmountDelta(d decimal.Decimal) *TransactionUpdate {
	tu.mutation.AddAmountDelta(d)
	return tu
}

// SetValue sets the "value" field.
func (tu *TransactionUpdate) SetValue(d decimal.Decimal) *TransactionUpdate {
	tu.mutation.ResetValue()
	tu.mutation.SetValue(d)
	return tu
}

// SetNillableValue sets the "value" field if the given value is not nil.
func (tu *TransactionUpdate) SetNillableValue(d *decimal.Decimal) *TransactionUpdate {
	if d != nil {
		tu.SetValue(*d)
	}
	return tu
}

// AddValue adds d to the "value" field.
func (tu *TransactionUpdate) AddValue(d decimal.Decimal) *TransactionUpdate {
	tu.mutation.AddValue(d)
	return tu
}

// SetFxRate sets the "fx_rate" field.
func (tu *TransactionUpdate) SetFxRate(d decimal.Decimal) *TransactionUpdate {
	tu.mutation.ResetFxRate()
	tu.mutation.SetFxRate(d)
	return tu
}

// SetNillableFxRate sets the "fx_rate" field if the given value is not nil.
func (tu *TransactionUpdate) SetNillableFxRate(d *decimal.Decimal) *TransactionUpdate {
	if d != nil {
		tu.SetFxRate(*d)
	}
	return tu
}

// AddFxRate adds d to the "fx_rate" field.
func (tu *TransactionUpdate) AddFxRate(d decimal.Decimal) *TransactionUpdate {
	tu.mutation.AddFxRate(d)
	return tu
}

// ClearFxRate clears the value of the "fx_rate" field.
func (tu *TransactionUpdate) ClearFxRate() *TransactionUpdate {
	tu.mutation.ClearFxRate()
	return tu
}

// SetBalance sets the "balance" field.
func (tu *TransactionUpdate) SetBalance(d decimal.Decimal) *TransactionUpdate {
	tu.mutation.ResetBalance()
	tu.mutation.SetBalance(d)
	return tu
}

// SetNillableBalance sets the "balance" field if the given value is not nil.
func (tu *TransactionUpdate) SetNillableBalance(d *decimal.Decimal) *TransactionUpdate {
	if d != nil {
		tu.SetBalance(*d)
	}
	return tu
}

// AddBalance adds d to the "balance" field.
func (tu *TransactionUpdate) AddBalance(d decimal.Decimal) *TransactionUpdate {
	tu.mutation.AddBalance(d)
	return tu
}

// SetBalanceDelta sets the "balance_delta" field.
func (tu *TransactionUpdate) SetBalanceDelta(d decimal.Decimal) *TransactionUpdate {
	tu.mutation.ResetBalanceDelta()
	tu.mutation.SetBalanceDelta(d)
	return tu
}

// SetNillableBalanceDelta sets the "balance_delta" field if the given value is not nil.
func (tu *TransactionUpdate) SetNillableBalanceDelta(d *decimal.Decimal) *TransactionUpdate {
	if d != nil {
		tu.SetBalanceDelta(*d)
	}
	return tu
}

// AddBalanceDelta adds d to the "balance_delta" field.
func (tu *TransactionUpdate) AddBalanceDelta(d decimal.Decimal) *TransactionUpdate {
	tu.mutation.AddBalanceDelta(d)
	return tu
}

// SetNote sets the "note" field.
func (tu *TransactionUpdate) SetNote(s string) *TransactionUpdate {
	tu.mutation.SetNote(s)
	return tu
}

// SetNillableNote sets the "note" field if the given value is not nil.
func (tu *TransactionUpdate) SetNillableNote(s *string) *TransactionUpdate {
	if s != nil {
		tu.SetNote(*s)
	}
	return tu
}

// ClearNote clears the value of the "note" field.
func (tu *TransactionUpdate) ClearNote() *TransactionUpdate {
	tu.mutation.ClearNote()
	return tu
}

// SetCreatedAt sets the "created_at" field.
func (tu *TransactionUpdate) SetCreatedAt(t time.Time) *TransactionUpdate {
	tu.mutation.SetCreatedAt(t)
	return tu
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (tu *TransactionUpdate) SetNillableCreatedAt(t *time.Time) *TransactionUpdate {
	if t != nil {
		tu.SetCreatedAt(*t)
	}
	return tu
}

// SetUpdatedAt sets the "updated_at" field.
func (tu *TransactionUpdate) SetUpdatedAt(t time.Time) *TransactionUpdate {
	tu.mutation.SetUpdatedAt(t)
	return tu
}

// SetNillableUpdatedAt sets the "updated_at" field if the given value is not nil.
func (tu *TransactionUpdate) SetNillableUpdatedAt(t *time.Time) *TransactionUpdate {
	if t != nil {
		tu.SetUpdatedAt(*t)
	}
	return tu
}

// SetProfileID sets the "profile" edge to the Profile entity by ID.
func (tu *TransactionUpdate) SetProfileID(id string) *TransactionUpdate {
	tu.mutation.SetProfileID(id)
	return tu
}

// SetProfile sets the "profile" edge to the Profile entity.
func (tu *TransactionUpdate) SetProfile(p *Profile) *TransactionUpdate {
	return tu.SetProfileID(p.ID)
}

// SetAccountID sets the "account" edge to the Account entity by ID.
func (tu *TransactionUpdate) SetAccountID(id string) *TransactionUpdate {
	tu.mutation.SetAccountID(id)
	return tu
}

// SetAccount sets the "account" edge to the Account entity.
func (tu *TransactionUpdate) SetAccount(a *Account) *TransactionUpdate {
	return tu.SetAccountID(a.ID)
}

// Mutation returns the TransactionMutation object of the builder.
func (tu *TransactionUpdate) Mutation() *TransactionMutation {
	return tu.mutation
}

// ClearProfile clears the "profile" edge to the Profile entity.
func (tu *TransactionUpdate) ClearProfile() *TransactionUpdate {
	tu.mutation.ClearProfile()
	return tu
}

// ClearAccount clears the "account" edge to the Account entity.
func (tu *TransactionUpdate) ClearAccount() *TransactionUpdate {
	tu.mutation.ClearAccount()
	return tu
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (tu *TransactionUpdate) Save(ctx context.Context) (int, error) {
	return withHooks(ctx, tu.sqlSave, tu.mutation, tu.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (tu *TransactionUpdate) SaveX(ctx context.Context) int {
	affected, err := tu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (tu *TransactionUpdate) Exec(ctx context.Context) error {
	_, err := tu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (tu *TransactionUpdate) ExecX(ctx context.Context) {
	if err := tu.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (tu *TransactionUpdate) check() error {
	if tu.mutation.ProfileCleared() && len(tu.mutation.ProfileIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "Transaction.profile"`)
	}
	if tu.mutation.AccountCleared() && len(tu.mutation.AccountIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "Transaction.account"`)
	}
	return nil
}

func (tu *TransactionUpdate) sqlSave(ctx context.Context) (n int, err error) {
	if err := tu.check(); err != nil {
		return n, err
	}
	_spec := sqlgraph.NewUpdateSpec(transaction.Table, transaction.Columns, sqlgraph.NewFieldSpec(transaction.FieldID, field.TypeString))
	if ps := tu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := tu.mutation.Amount(); ok {
		_spec.SetField(transaction.FieldAmount, field.TypeFloat64, value)
	}
	if value, ok := tu.mutation.AddedAmount(); ok {
		_spec.AddField(transaction.FieldAmount, field.TypeFloat64, value)
	}
	if value, ok := tu.mutation.AmountDelta(); ok {
		_spec.SetField(transaction.FieldAmountDelta, field.TypeFloat64, value)
	}
	if value, ok := tu.mutation.AddedAmountDelta(); ok {
		_spec.AddField(transaction.FieldAmountDelta, field.TypeFloat64, value)
	}
	if value, ok := tu.mutation.Value(); ok {
		_spec.SetField(transaction.FieldValue, field.TypeFloat64, value)
	}
	if value, ok := tu.mutation.AddedValue(); ok {
		_spec.AddField(transaction.FieldValue, field.TypeFloat64, value)
	}
	if value, ok := tu.mutation.FxRate(); ok {
		_spec.SetField(transaction.FieldFxRate, field.TypeFloat64, value)
	}
	if value, ok := tu.mutation.AddedFxRate(); ok {
		_spec.AddField(transaction.FieldFxRate, field.TypeFloat64, value)
	}
	if tu.mutation.FxRateCleared() {
		_spec.ClearField(transaction.FieldFxRate, field.TypeFloat64)
	}
	if value, ok := tu.mutation.Balance(); ok {
		_spec.SetField(transaction.FieldBalance, field.TypeFloat64, value)
	}
	if value, ok := tu.mutation.AddedBalance(); ok {
		_spec.AddField(transaction.FieldBalance, field.TypeFloat64, value)
	}
	if value, ok := tu.mutation.BalanceDelta(); ok {
		_spec.SetField(transaction.FieldBalanceDelta, field.TypeFloat64, value)
	}
	if value, ok := tu.mutation.AddedBalanceDelta(); ok {
		_spec.AddField(transaction.FieldBalanceDelta, field.TypeFloat64, value)
	}
	if value, ok := tu.mutation.Note(); ok {
		_spec.SetField(transaction.FieldNote, field.TypeString, value)
	}
	if tu.mutation.NoteCleared() {
		_spec.ClearField(transaction.FieldNote, field.TypeString)
	}
	if value, ok := tu.mutation.CreatedAt(); ok {
		_spec.SetField(transaction.FieldCreatedAt, field.TypeTime, value)
	}
	if value, ok := tu.mutation.UpdatedAt(); ok {
		_spec.SetField(transaction.FieldUpdatedAt, field.TypeTime, value)
	}
	if tu.mutation.ProfileCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   transaction.ProfileTable,
			Columns: []string{transaction.ProfileColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(profile.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := tu.mutation.ProfileIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   transaction.ProfileTable,
			Columns: []string{transaction.ProfileColumn},
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
	if tu.mutation.AccountCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   transaction.AccountTable,
			Columns: []string{transaction.AccountColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(account.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := tu.mutation.AccountIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   transaction.AccountTable,
			Columns: []string{transaction.AccountColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(account.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, tu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{transaction.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	tu.mutation.done = true
	return n, nil
}

// TransactionUpdateOne is the builder for updating a single Transaction entity.
type TransactionUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *TransactionMutation
}

// SetAmount sets the "amount" field.
func (tuo *TransactionUpdateOne) SetAmount(d decimal.Decimal) *TransactionUpdateOne {
	tuo.mutation.ResetAmount()
	tuo.mutation.SetAmount(d)
	return tuo
}

// SetNillableAmount sets the "amount" field if the given value is not nil.
func (tuo *TransactionUpdateOne) SetNillableAmount(d *decimal.Decimal) *TransactionUpdateOne {
	if d != nil {
		tuo.SetAmount(*d)
	}
	return tuo
}

// AddAmount adds d to the "amount" field.
func (tuo *TransactionUpdateOne) AddAmount(d decimal.Decimal) *TransactionUpdateOne {
	tuo.mutation.AddAmount(d)
	return tuo
}

// SetAmountDelta sets the "amount_delta" field.
func (tuo *TransactionUpdateOne) SetAmountDelta(d decimal.Decimal) *TransactionUpdateOne {
	tuo.mutation.ResetAmountDelta()
	tuo.mutation.SetAmountDelta(d)
	return tuo
}

// SetNillableAmountDelta sets the "amount_delta" field if the given value is not nil.
func (tuo *TransactionUpdateOne) SetNillableAmountDelta(d *decimal.Decimal) *TransactionUpdateOne {
	if d != nil {
		tuo.SetAmountDelta(*d)
	}
	return tuo
}

// AddAmountDelta adds d to the "amount_delta" field.
func (tuo *TransactionUpdateOne) AddAmountDelta(d decimal.Decimal) *TransactionUpdateOne {
	tuo.mutation.AddAmountDelta(d)
	return tuo
}

// SetValue sets the "value" field.
func (tuo *TransactionUpdateOne) SetValue(d decimal.Decimal) *TransactionUpdateOne {
	tuo.mutation.ResetValue()
	tuo.mutation.SetValue(d)
	return tuo
}

// SetNillableValue sets the "value" field if the given value is not nil.
func (tuo *TransactionUpdateOne) SetNillableValue(d *decimal.Decimal) *TransactionUpdateOne {
	if d != nil {
		tuo.SetValue(*d)
	}
	return tuo
}

// AddValue adds d to the "value" field.
func (tuo *TransactionUpdateOne) AddValue(d decimal.Decimal) *TransactionUpdateOne {
	tuo.mutation.AddValue(d)
	return tuo
}

// SetFxRate sets the "fx_rate" field.
func (tuo *TransactionUpdateOne) SetFxRate(d decimal.Decimal) *TransactionUpdateOne {
	tuo.mutation.ResetFxRate()
	tuo.mutation.SetFxRate(d)
	return tuo
}

// SetNillableFxRate sets the "fx_rate" field if the given value is not nil.
func (tuo *TransactionUpdateOne) SetNillableFxRate(d *decimal.Decimal) *TransactionUpdateOne {
	if d != nil {
		tuo.SetFxRate(*d)
	}
	return tuo
}

// AddFxRate adds d to the "fx_rate" field.
func (tuo *TransactionUpdateOne) AddFxRate(d decimal.Decimal) *TransactionUpdateOne {
	tuo.mutation.AddFxRate(d)
	return tuo
}

// ClearFxRate clears the value of the "fx_rate" field.
func (tuo *TransactionUpdateOne) ClearFxRate() *TransactionUpdateOne {
	tuo.mutation.ClearFxRate()
	return tuo
}

// SetBalance sets the "balance" field.
func (tuo *TransactionUpdateOne) SetBalance(d decimal.Decimal) *TransactionUpdateOne {
	tuo.mutation.ResetBalance()
	tuo.mutation.SetBalance(d)
	return tuo
}

// SetNillableBalance sets the "balance" field if the given value is not nil.
func (tuo *TransactionUpdateOne) SetNillableBalance(d *decimal.Decimal) *TransactionUpdateOne {
	if d != nil {
		tuo.SetBalance(*d)
	}
	return tuo
}

// AddBalance adds d to the "balance" field.
func (tuo *TransactionUpdateOne) AddBalance(d decimal.Decimal) *TransactionUpdateOne {
	tuo.mutation.AddBalance(d)
	return tuo
}

// SetBalanceDelta sets the "balance_delta" field.
func (tuo *TransactionUpdateOne) SetBalanceDelta(d decimal.Decimal) *TransactionUpdateOne {
	tuo.mutation.ResetBalanceDelta()
	tuo.mutation.SetBalanceDelta(d)
	return tuo
}

// SetNillableBalanceDelta sets the "balance_delta" field if the given value is not nil.
func (tuo *TransactionUpdateOne) SetNillableBalanceDelta(d *decimal.Decimal) *TransactionUpdateOne {
	if d != nil {
		tuo.SetBalanceDelta(*d)
	}
	return tuo
}

// AddBalanceDelta adds d to the "balance_delta" field.
func (tuo *TransactionUpdateOne) AddBalanceDelta(d decimal.Decimal) *TransactionUpdateOne {
	tuo.mutation.AddBalanceDelta(d)
	return tuo
}

// SetNote sets the "note" field.
func (tuo *TransactionUpdateOne) SetNote(s string) *TransactionUpdateOne {
	tuo.mutation.SetNote(s)
	return tuo
}

// SetNillableNote sets the "note" field if the given value is not nil.
func (tuo *TransactionUpdateOne) SetNillableNote(s *string) *TransactionUpdateOne {
	if s != nil {
		tuo.SetNote(*s)
	}
	return tuo
}

// ClearNote clears the value of the "note" field.
func (tuo *TransactionUpdateOne) ClearNote() *TransactionUpdateOne {
	tuo.mutation.ClearNote()
	return tuo
}

// SetCreatedAt sets the "created_at" field.
func (tuo *TransactionUpdateOne) SetCreatedAt(t time.Time) *TransactionUpdateOne {
	tuo.mutation.SetCreatedAt(t)
	return tuo
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (tuo *TransactionUpdateOne) SetNillableCreatedAt(t *time.Time) *TransactionUpdateOne {
	if t != nil {
		tuo.SetCreatedAt(*t)
	}
	return tuo
}

// SetUpdatedAt sets the "updated_at" field.
func (tuo *TransactionUpdateOne) SetUpdatedAt(t time.Time) *TransactionUpdateOne {
	tuo.mutation.SetUpdatedAt(t)
	return tuo
}

// SetNillableUpdatedAt sets the "updated_at" field if the given value is not nil.
func (tuo *TransactionUpdateOne) SetNillableUpdatedAt(t *time.Time) *TransactionUpdateOne {
	if t != nil {
		tuo.SetUpdatedAt(*t)
	}
	return tuo
}

// SetProfileID sets the "profile" edge to the Profile entity by ID.
func (tuo *TransactionUpdateOne) SetProfileID(id string) *TransactionUpdateOne {
	tuo.mutation.SetProfileID(id)
	return tuo
}

// SetProfile sets the "profile" edge to the Profile entity.
func (tuo *TransactionUpdateOne) SetProfile(p *Profile) *TransactionUpdateOne {
	return tuo.SetProfileID(p.ID)
}

// SetAccountID sets the "account" edge to the Account entity by ID.
func (tuo *TransactionUpdateOne) SetAccountID(id string) *TransactionUpdateOne {
	tuo.mutation.SetAccountID(id)
	return tuo
}

// SetAccount sets the "account" edge to the Account entity.
func (tuo *TransactionUpdateOne) SetAccount(a *Account) *TransactionUpdateOne {
	return tuo.SetAccountID(a.ID)
}

// Mutation returns the TransactionMutation object of the builder.
func (tuo *TransactionUpdateOne) Mutation() *TransactionMutation {
	return tuo.mutation
}

// ClearProfile clears the "profile" edge to the Profile entity.
func (tuo *TransactionUpdateOne) ClearProfile() *TransactionUpdateOne {
	tuo.mutation.ClearProfile()
	return tuo
}

// ClearAccount clears the "account" edge to the Account entity.
func (tuo *TransactionUpdateOne) ClearAccount() *TransactionUpdateOne {
	tuo.mutation.ClearAccount()
	return tuo
}

// Where appends a list predicates to the TransactionUpdate builder.
func (tuo *TransactionUpdateOne) Where(ps ...predicate.Transaction) *TransactionUpdateOne {
	tuo.mutation.Where(ps...)
	return tuo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (tuo *TransactionUpdateOne) Select(field string, fields ...string) *TransactionUpdateOne {
	tuo.fields = append([]string{field}, fields...)
	return tuo
}

// Save executes the query and returns the updated Transaction entity.
func (tuo *TransactionUpdateOne) Save(ctx context.Context) (*Transaction, error) {
	return withHooks(ctx, tuo.sqlSave, tuo.mutation, tuo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (tuo *TransactionUpdateOne) SaveX(ctx context.Context) *Transaction {
	node, err := tuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (tuo *TransactionUpdateOne) Exec(ctx context.Context) error {
	_, err := tuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (tuo *TransactionUpdateOne) ExecX(ctx context.Context) {
	if err := tuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (tuo *TransactionUpdateOne) check() error {
	if tuo.mutation.ProfileCleared() && len(tuo.mutation.ProfileIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "Transaction.profile"`)
	}
	if tuo.mutation.AccountCleared() && len(tuo.mutation.AccountIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "Transaction.account"`)
	}
	return nil
}

func (tuo *TransactionUpdateOne) sqlSave(ctx context.Context) (_node *Transaction, err error) {
	if err := tuo.check(); err != nil {
		return _node, err
	}
	_spec := sqlgraph.NewUpdateSpec(transaction.Table, transaction.Columns, sqlgraph.NewFieldSpec(transaction.FieldID, field.TypeString))
	id, ok := tuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "Transaction.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := tuo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, transaction.FieldID)
		for _, f := range fields {
			if !transaction.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != transaction.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := tuo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := tuo.mutation.Amount(); ok {
		_spec.SetField(transaction.FieldAmount, field.TypeFloat64, value)
	}
	if value, ok := tuo.mutation.AddedAmount(); ok {
		_spec.AddField(transaction.FieldAmount, field.TypeFloat64, value)
	}
	if value, ok := tuo.mutation.AmountDelta(); ok {
		_spec.SetField(transaction.FieldAmountDelta, field.TypeFloat64, value)
	}
	if value, ok := tuo.mutation.AddedAmountDelta(); ok {
		_spec.AddField(transaction.FieldAmountDelta, field.TypeFloat64, value)
	}
	if value, ok := tuo.mutation.Value(); ok {
		_spec.SetField(transaction.FieldValue, field.TypeFloat64, value)
	}
	if value, ok := tuo.mutation.AddedValue(); ok {
		_spec.AddField(transaction.FieldValue, field.TypeFloat64, value)
	}
	if value, ok := tuo.mutation.FxRate(); ok {
		_spec.SetField(transaction.FieldFxRate, field.TypeFloat64, value)
	}
	if value, ok := tuo.mutation.AddedFxRate(); ok {
		_spec.AddField(transaction.FieldFxRate, field.TypeFloat64, value)
	}
	if tuo.mutation.FxRateCleared() {
		_spec.ClearField(transaction.FieldFxRate, field.TypeFloat64)
	}
	if value, ok := tuo.mutation.Balance(); ok {
		_spec.SetField(transaction.FieldBalance, field.TypeFloat64, value)
	}
	if value, ok := tuo.mutation.AddedBalance(); ok {
		_spec.AddField(transaction.FieldBalance, field.TypeFloat64, value)
	}
	if value, ok := tuo.mutation.BalanceDelta(); ok {
		_spec.SetField(transaction.FieldBalanceDelta, field.TypeFloat64, value)
	}
	if value, ok := tuo.mutation.AddedBalanceDelta(); ok {
		_spec.AddField(transaction.FieldBalanceDelta, field.TypeFloat64, value)
	}
	if value, ok := tuo.mutation.Note(); ok {
		_spec.SetField(transaction.FieldNote, field.TypeString, value)
	}
	if tuo.mutation.NoteCleared() {
		_spec.ClearField(transaction.FieldNote, field.TypeString)
	}
	if value, ok := tuo.mutation.CreatedAt(); ok {
		_spec.SetField(transaction.FieldCreatedAt, field.TypeTime, value)
	}
	if value, ok := tuo.mutation.UpdatedAt(); ok {
		_spec.SetField(transaction.FieldUpdatedAt, field.TypeTime, value)
	}
	if tuo.mutation.ProfileCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   transaction.ProfileTable,
			Columns: []string{transaction.ProfileColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(profile.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := tuo.mutation.ProfileIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   transaction.ProfileTable,
			Columns: []string{transaction.ProfileColumn},
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
	if tuo.mutation.AccountCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   transaction.AccountTable,
			Columns: []string{transaction.AccountColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(account.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := tuo.mutation.AccountIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   transaction.AccountTable,
			Columns: []string{transaction.AccountColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(account.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &Transaction{config: tuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, tuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{transaction.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	tuo.mutation.done = true
	return _node, nil
}
