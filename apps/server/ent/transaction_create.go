// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fijoy/ent/account"
	"fijoy/ent/profile"
	"fijoy/ent/transaction"
	"fmt"
	"time"

	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/shopspring/decimal"
)

// TransactionCreate is the builder for creating a Transaction entity.
type TransactionCreate struct {
	config
	mutation *TransactionMutation
	hooks    []Hook
}

// SetAmount sets the "amount" field.
func (tc *TransactionCreate) SetAmount(d decimal.Decimal) *TransactionCreate {
	tc.mutation.SetAmount(d)
	return tc
}

// SetNote sets the "note" field.
func (tc *TransactionCreate) SetNote(s string) *TransactionCreate {
	tc.mutation.SetNote(s)
	return tc
}

// SetNillableNote sets the "note" field if the given value is not nil.
func (tc *TransactionCreate) SetNillableNote(s *string) *TransactionCreate {
	if s != nil {
		tc.SetNote(*s)
	}
	return tc
}

// SetDatetime sets the "datetime" field.
func (tc *TransactionCreate) SetDatetime(t time.Time) *TransactionCreate {
	tc.mutation.SetDatetime(t)
	return tc
}

// SetNillableDatetime sets the "datetime" field if the given value is not nil.
func (tc *TransactionCreate) SetNillableDatetime(t *time.Time) *TransactionCreate {
	if t != nil {
		tc.SetDatetime(*t)
	}
	return tc
}

// SetCreatedAt sets the "created_at" field.
func (tc *TransactionCreate) SetCreatedAt(t time.Time) *TransactionCreate {
	tc.mutation.SetCreatedAt(t)
	return tc
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (tc *TransactionCreate) SetNillableCreatedAt(t *time.Time) *TransactionCreate {
	if t != nil {
		tc.SetCreatedAt(*t)
	}
	return tc
}

// SetUpdatedAt sets the "updated_at" field.
func (tc *TransactionCreate) SetUpdatedAt(t time.Time) *TransactionCreate {
	tc.mutation.SetUpdatedAt(t)
	return tc
}

// SetNillableUpdatedAt sets the "updated_at" field if the given value is not nil.
func (tc *TransactionCreate) SetNillableUpdatedAt(t *time.Time) *TransactionCreate {
	if t != nil {
		tc.SetUpdatedAt(*t)
	}
	return tc
}

// SetID sets the "id" field.
func (tc *TransactionCreate) SetID(s string) *TransactionCreate {
	tc.mutation.SetID(s)
	return tc
}

// SetNillableID sets the "id" field if the given value is not nil.
func (tc *TransactionCreate) SetNillableID(s *string) *TransactionCreate {
	if s != nil {
		tc.SetID(*s)
	}
	return tc
}

// SetProfileID sets the "profile" edge to the Profile entity by ID.
func (tc *TransactionCreate) SetProfileID(id string) *TransactionCreate {
	tc.mutation.SetProfileID(id)
	return tc
}

// SetProfile sets the "profile" edge to the Profile entity.
func (tc *TransactionCreate) SetProfile(p *Profile) *TransactionCreate {
	return tc.SetProfileID(p.ID)
}

// SetAccountID sets the "account" edge to the Account entity by ID.
func (tc *TransactionCreate) SetAccountID(id string) *TransactionCreate {
	tc.mutation.SetAccountID(id)
	return tc
}

// SetAccount sets the "account" edge to the Account entity.
func (tc *TransactionCreate) SetAccount(a *Account) *TransactionCreate {
	return tc.SetAccountID(a.ID)
}

// Mutation returns the TransactionMutation object of the builder.
func (tc *TransactionCreate) Mutation() *TransactionMutation {
	return tc.mutation
}

// Save creates the Transaction in the database.
func (tc *TransactionCreate) Save(ctx context.Context) (*Transaction, error) {
	tc.defaults()
	return withHooks(ctx, tc.sqlSave, tc.mutation, tc.hooks)
}

// SaveX calls Save and panics if Save returns an error.
func (tc *TransactionCreate) SaveX(ctx context.Context) *Transaction {
	v, err := tc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (tc *TransactionCreate) Exec(ctx context.Context) error {
	_, err := tc.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (tc *TransactionCreate) ExecX(ctx context.Context) {
	if err := tc.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (tc *TransactionCreate) defaults() {
	if _, ok := tc.mutation.Datetime(); !ok {
		v := transaction.DefaultDatetime()
		tc.mutation.SetDatetime(v)
	}
	if _, ok := tc.mutation.CreatedAt(); !ok {
		v := transaction.DefaultCreatedAt()
		tc.mutation.SetCreatedAt(v)
	}
	if _, ok := tc.mutation.UpdatedAt(); !ok {
		v := transaction.DefaultUpdatedAt()
		tc.mutation.SetUpdatedAt(v)
	}
	if _, ok := tc.mutation.ID(); !ok {
		v := transaction.DefaultID()
		tc.mutation.SetID(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (tc *TransactionCreate) check() error {
	if _, ok := tc.mutation.Amount(); !ok {
		return &ValidationError{Name: "amount", err: errors.New(`ent: missing required field "Transaction.amount"`)}
	}
	if _, ok := tc.mutation.Datetime(); !ok {
		return &ValidationError{Name: "datetime", err: errors.New(`ent: missing required field "Transaction.datetime"`)}
	}
	if _, ok := tc.mutation.CreatedAt(); !ok {
		return &ValidationError{Name: "created_at", err: errors.New(`ent: missing required field "Transaction.created_at"`)}
	}
	if _, ok := tc.mutation.UpdatedAt(); !ok {
		return &ValidationError{Name: "updated_at", err: errors.New(`ent: missing required field "Transaction.updated_at"`)}
	}
	if len(tc.mutation.ProfileIDs()) == 0 {
		return &ValidationError{Name: "profile", err: errors.New(`ent: missing required edge "Transaction.profile"`)}
	}
	if len(tc.mutation.AccountIDs()) == 0 {
		return &ValidationError{Name: "account", err: errors.New(`ent: missing required edge "Transaction.account"`)}
	}
	return nil
}

func (tc *TransactionCreate) sqlSave(ctx context.Context) (*Transaction, error) {
	if err := tc.check(); err != nil {
		return nil, err
	}
	_node, _spec := tc.createSpec()
	if err := sqlgraph.CreateNode(ctx, tc.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	if _spec.ID.Value != nil {
		if id, ok := _spec.ID.Value.(string); ok {
			_node.ID = id
		} else {
			return nil, fmt.Errorf("unexpected Transaction.ID type: %T", _spec.ID.Value)
		}
	}
	tc.mutation.id = &_node.ID
	tc.mutation.done = true
	return _node, nil
}

func (tc *TransactionCreate) createSpec() (*Transaction, *sqlgraph.CreateSpec) {
	var (
		_node = &Transaction{config: tc.config}
		_spec = sqlgraph.NewCreateSpec(transaction.Table, sqlgraph.NewFieldSpec(transaction.FieldID, field.TypeString))
	)
	if id, ok := tc.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = id
	}
	if value, ok := tc.mutation.Amount(); ok {
		_spec.SetField(transaction.FieldAmount, field.TypeFloat64, value)
		_node.Amount = value
	}
	if value, ok := tc.mutation.Note(); ok {
		_spec.SetField(transaction.FieldNote, field.TypeString, value)
		_node.Note = value
	}
	if value, ok := tc.mutation.Datetime(); ok {
		_spec.SetField(transaction.FieldDatetime, field.TypeTime, value)
		_node.Datetime = value
	}
	if value, ok := tc.mutation.CreatedAt(); ok {
		_spec.SetField(transaction.FieldCreatedAt, field.TypeTime, value)
		_node.CreatedAt = value
	}
	if value, ok := tc.mutation.UpdatedAt(); ok {
		_spec.SetField(transaction.FieldUpdatedAt, field.TypeTime, value)
		_node.UpdatedAt = value
	}
	if nodes := tc.mutation.ProfileIDs(); len(nodes) > 0 {
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
		_node.profile_transaction = &nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := tc.mutation.AccountIDs(); len(nodes) > 0 {
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
		_node.account_transaction = &nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// TransactionCreateBulk is the builder for creating many Transaction entities in bulk.
type TransactionCreateBulk struct {
	config
	err      error
	builders []*TransactionCreate
}

// Save creates the Transaction entities in the database.
func (tcb *TransactionCreateBulk) Save(ctx context.Context) ([]*Transaction, error) {
	if tcb.err != nil {
		return nil, tcb.err
	}
	specs := make([]*sqlgraph.CreateSpec, len(tcb.builders))
	nodes := make([]*Transaction, len(tcb.builders))
	mutators := make([]Mutator, len(tcb.builders))
	for i := range tcb.builders {
		func(i int, root context.Context) {
			builder := tcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*TransactionMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				if err := builder.check(); err != nil {
					return nil, err
				}
				builder.mutation = mutation
				var err error
				nodes[i], specs[i] = builder.createSpec()
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, tcb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, tcb.driver, spec); err != nil {
						if sqlgraph.IsConstraintError(err) {
							err = &ConstraintError{msg: err.Error(), wrap: err}
						}
					}
				}
				if err != nil {
					return nil, err
				}
				mutation.id = &nodes[i].ID
				mutation.done = true
				return nodes[i], nil
			})
			for i := len(builder.hooks) - 1; i >= 0; i-- {
				mut = builder.hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if len(mutators) > 0 {
		if _, err := mutators[0].Mutate(ctx, tcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (tcb *TransactionCreateBulk) SaveX(ctx context.Context) []*Transaction {
	v, err := tcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (tcb *TransactionCreateBulk) Exec(ctx context.Context) error {
	_, err := tcb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (tcb *TransactionCreateBulk) ExecX(ctx context.Context) {
	if err := tcb.Exec(ctx); err != nil {
		panic(err)
	}
}
