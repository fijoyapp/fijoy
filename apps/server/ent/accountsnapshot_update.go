// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fijoy/ent/account"
	"fijoy/ent/accountsnapshot"
	"fijoy/ent/predicate"
	"fmt"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/shopspring/decimal"
)

// AccountSnapshotUpdate is the builder for updating AccountSnapshot entities.
type AccountSnapshotUpdate struct {
	config
	hooks    []Hook
	mutation *AccountSnapshotMutation
}

// Where appends a list predicates to the AccountSnapshotUpdate builder.
func (asu *AccountSnapshotUpdate) Where(ps ...predicate.AccountSnapshot) *AccountSnapshotUpdate {
	asu.mutation.Where(ps...)
	return asu
}

// SetDatehour sets the "datehour" field.
func (asu *AccountSnapshotUpdate) SetDatehour(t time.Time) *AccountSnapshotUpdate {
	asu.mutation.SetDatehour(t)
	return asu
}

// SetNillableDatehour sets the "datehour" field if the given value is not nil.
func (asu *AccountSnapshotUpdate) SetNillableDatehour(t *time.Time) *AccountSnapshotUpdate {
	if t != nil {
		asu.SetDatehour(*t)
	}
	return asu
}

// SetBalance sets the "balance" field.
func (asu *AccountSnapshotUpdate) SetBalance(d decimal.Decimal) *AccountSnapshotUpdate {
	asu.mutation.ResetBalance()
	asu.mutation.SetBalance(d)
	return asu
}

// SetNillableBalance sets the "balance" field if the given value is not nil.
func (asu *AccountSnapshotUpdate) SetNillableBalance(d *decimal.Decimal) *AccountSnapshotUpdate {
	if d != nil {
		asu.SetBalance(*d)
	}
	return asu
}

// AddBalance adds d to the "balance" field.
func (asu *AccountSnapshotUpdate) AddBalance(d decimal.Decimal) *AccountSnapshotUpdate {
	asu.mutation.AddBalance(d)
	return asu
}

// AddAccountIDs adds the "account" edge to the Account entity by IDs.
func (asu *AccountSnapshotUpdate) AddAccountIDs(ids ...int) *AccountSnapshotUpdate {
	asu.mutation.AddAccountIDs(ids...)
	return asu
}

// AddAccount adds the "account" edges to the Account entity.
func (asu *AccountSnapshotUpdate) AddAccount(a ...*Account) *AccountSnapshotUpdate {
	ids := make([]int, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return asu.AddAccountIDs(ids...)
}

// Mutation returns the AccountSnapshotMutation object of the builder.
func (asu *AccountSnapshotUpdate) Mutation() *AccountSnapshotMutation {
	return asu.mutation
}

// ClearAccount clears all "account" edges to the Account entity.
func (asu *AccountSnapshotUpdate) ClearAccount() *AccountSnapshotUpdate {
	asu.mutation.ClearAccount()
	return asu
}

// RemoveAccountIDs removes the "account" edge to Account entities by IDs.
func (asu *AccountSnapshotUpdate) RemoveAccountIDs(ids ...int) *AccountSnapshotUpdate {
	asu.mutation.RemoveAccountIDs(ids...)
	return asu
}

// RemoveAccount removes "account" edges to Account entities.
func (asu *AccountSnapshotUpdate) RemoveAccount(a ...*Account) *AccountSnapshotUpdate {
	ids := make([]int, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return asu.RemoveAccountIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (asu *AccountSnapshotUpdate) Save(ctx context.Context) (int, error) {
	return withHooks(ctx, asu.sqlSave, asu.mutation, asu.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (asu *AccountSnapshotUpdate) SaveX(ctx context.Context) int {
	affected, err := asu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (asu *AccountSnapshotUpdate) Exec(ctx context.Context) error {
	_, err := asu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (asu *AccountSnapshotUpdate) ExecX(ctx context.Context) {
	if err := asu.Exec(ctx); err != nil {
		panic(err)
	}
}

func (asu *AccountSnapshotUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := sqlgraph.NewUpdateSpec(accountsnapshot.Table, accountsnapshot.Columns, sqlgraph.NewFieldSpec(accountsnapshot.FieldID, field.TypeInt))
	if ps := asu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := asu.mutation.Datehour(); ok {
		_spec.SetField(accountsnapshot.FieldDatehour, field.TypeTime, value)
	}
	if value, ok := asu.mutation.Balance(); ok {
		_spec.SetField(accountsnapshot.FieldBalance, field.TypeFloat64, value)
	}
	if value, ok := asu.mutation.AddedBalance(); ok {
		_spec.AddField(accountsnapshot.FieldBalance, field.TypeFloat64, value)
	}
	if asu.mutation.AccountCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   accountsnapshot.AccountTable,
			Columns: accountsnapshot.AccountPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(account.FieldID, field.TypeInt),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := asu.mutation.RemovedAccountIDs(); len(nodes) > 0 && !asu.mutation.AccountCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   accountsnapshot.AccountTable,
			Columns: accountsnapshot.AccountPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(account.FieldID, field.TypeInt),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := asu.mutation.AccountIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   accountsnapshot.AccountTable,
			Columns: accountsnapshot.AccountPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(account.FieldID, field.TypeInt),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, asu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{accountsnapshot.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	asu.mutation.done = true
	return n, nil
}

// AccountSnapshotUpdateOne is the builder for updating a single AccountSnapshot entity.
type AccountSnapshotUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *AccountSnapshotMutation
}

// SetDatehour sets the "datehour" field.
func (asuo *AccountSnapshotUpdateOne) SetDatehour(t time.Time) *AccountSnapshotUpdateOne {
	asuo.mutation.SetDatehour(t)
	return asuo
}

// SetNillableDatehour sets the "datehour" field if the given value is not nil.
func (asuo *AccountSnapshotUpdateOne) SetNillableDatehour(t *time.Time) *AccountSnapshotUpdateOne {
	if t != nil {
		asuo.SetDatehour(*t)
	}
	return asuo
}

// SetBalance sets the "balance" field.
func (asuo *AccountSnapshotUpdateOne) SetBalance(d decimal.Decimal) *AccountSnapshotUpdateOne {
	asuo.mutation.ResetBalance()
	asuo.mutation.SetBalance(d)
	return asuo
}

// SetNillableBalance sets the "balance" field if the given value is not nil.
func (asuo *AccountSnapshotUpdateOne) SetNillableBalance(d *decimal.Decimal) *AccountSnapshotUpdateOne {
	if d != nil {
		asuo.SetBalance(*d)
	}
	return asuo
}

// AddBalance adds d to the "balance" field.
func (asuo *AccountSnapshotUpdateOne) AddBalance(d decimal.Decimal) *AccountSnapshotUpdateOne {
	asuo.mutation.AddBalance(d)
	return asuo
}

// AddAccountIDs adds the "account" edge to the Account entity by IDs.
func (asuo *AccountSnapshotUpdateOne) AddAccountIDs(ids ...int) *AccountSnapshotUpdateOne {
	asuo.mutation.AddAccountIDs(ids...)
	return asuo
}

// AddAccount adds the "account" edges to the Account entity.
func (asuo *AccountSnapshotUpdateOne) AddAccount(a ...*Account) *AccountSnapshotUpdateOne {
	ids := make([]int, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return asuo.AddAccountIDs(ids...)
}

// Mutation returns the AccountSnapshotMutation object of the builder.
func (asuo *AccountSnapshotUpdateOne) Mutation() *AccountSnapshotMutation {
	return asuo.mutation
}

// ClearAccount clears all "account" edges to the Account entity.
func (asuo *AccountSnapshotUpdateOne) ClearAccount() *AccountSnapshotUpdateOne {
	asuo.mutation.ClearAccount()
	return asuo
}

// RemoveAccountIDs removes the "account" edge to Account entities by IDs.
func (asuo *AccountSnapshotUpdateOne) RemoveAccountIDs(ids ...int) *AccountSnapshotUpdateOne {
	asuo.mutation.RemoveAccountIDs(ids...)
	return asuo
}

// RemoveAccount removes "account" edges to Account entities.
func (asuo *AccountSnapshotUpdateOne) RemoveAccount(a ...*Account) *AccountSnapshotUpdateOne {
	ids := make([]int, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return asuo.RemoveAccountIDs(ids...)
}

// Where appends a list predicates to the AccountSnapshotUpdate builder.
func (asuo *AccountSnapshotUpdateOne) Where(ps ...predicate.AccountSnapshot) *AccountSnapshotUpdateOne {
	asuo.mutation.Where(ps...)
	return asuo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (asuo *AccountSnapshotUpdateOne) Select(field string, fields ...string) *AccountSnapshotUpdateOne {
	asuo.fields = append([]string{field}, fields...)
	return asuo
}

// Save executes the query and returns the updated AccountSnapshot entity.
func (asuo *AccountSnapshotUpdateOne) Save(ctx context.Context) (*AccountSnapshot, error) {
	return withHooks(ctx, asuo.sqlSave, asuo.mutation, asuo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (asuo *AccountSnapshotUpdateOne) SaveX(ctx context.Context) *AccountSnapshot {
	node, err := asuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (asuo *AccountSnapshotUpdateOne) Exec(ctx context.Context) error {
	_, err := asuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (asuo *AccountSnapshotUpdateOne) ExecX(ctx context.Context) {
	if err := asuo.Exec(ctx); err != nil {
		panic(err)
	}
}

func (asuo *AccountSnapshotUpdateOne) sqlSave(ctx context.Context) (_node *AccountSnapshot, err error) {
	_spec := sqlgraph.NewUpdateSpec(accountsnapshot.Table, accountsnapshot.Columns, sqlgraph.NewFieldSpec(accountsnapshot.FieldID, field.TypeInt))
	id, ok := asuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "AccountSnapshot.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := asuo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, accountsnapshot.FieldID)
		for _, f := range fields {
			if !accountsnapshot.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != accountsnapshot.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := asuo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := asuo.mutation.Datehour(); ok {
		_spec.SetField(accountsnapshot.FieldDatehour, field.TypeTime, value)
	}
	if value, ok := asuo.mutation.Balance(); ok {
		_spec.SetField(accountsnapshot.FieldBalance, field.TypeFloat64, value)
	}
	if value, ok := asuo.mutation.AddedBalance(); ok {
		_spec.AddField(accountsnapshot.FieldBalance, field.TypeFloat64, value)
	}
	if asuo.mutation.AccountCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   accountsnapshot.AccountTable,
			Columns: accountsnapshot.AccountPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(account.FieldID, field.TypeInt),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := asuo.mutation.RemovedAccountIDs(); len(nodes) > 0 && !asuo.mutation.AccountCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   accountsnapshot.AccountTable,
			Columns: accountsnapshot.AccountPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(account.FieldID, field.TypeInt),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := asuo.mutation.AccountIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   accountsnapshot.AccountTable,
			Columns: accountsnapshot.AccountPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(account.FieldID, field.TypeInt),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &AccountSnapshot{config: asuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, asuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{accountsnapshot.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	asuo.mutation.done = true
	return _node, nil
}
