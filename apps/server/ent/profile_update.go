// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fijoy/ent/account"
	"fijoy/ent/overallsnapshot"
	"fijoy/ent/predicate"
	"fijoy/ent/profile"
	"fijoy/ent/transaction"
	"fijoy/ent/user"
	"fmt"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/shopspring/decimal"
)

// ProfileUpdate is the builder for updating Profile entities.
type ProfileUpdate struct {
	config
	hooks    []Hook
	mutation *ProfileMutation
}

// Where appends a list predicates to the ProfileUpdate builder.
func (pu *ProfileUpdate) Where(ps ...predicate.Profile) *ProfileUpdate {
	pu.mutation.Where(ps...)
	return pu
}

// SetLocale sets the "locale" field.
func (pu *ProfileUpdate) SetLocale(s string) *ProfileUpdate {
	pu.mutation.SetLocale(s)
	return pu
}

// SetNillableLocale sets the "locale" field if the given value is not nil.
func (pu *ProfileUpdate) SetNillableLocale(s *string) *ProfileUpdate {
	if s != nil {
		pu.SetLocale(*s)
	}
	return pu
}

// SetCurrencies sets the "currencies" field.
func (pu *ProfileUpdate) SetCurrencies(s string) *ProfileUpdate {
	pu.mutation.SetCurrencies(s)
	return pu
}

// SetNillableCurrencies sets the "currencies" field if the given value is not nil.
func (pu *ProfileUpdate) SetNillableCurrencies(s *string) *ProfileUpdate {
	if s != nil {
		pu.SetCurrencies(*s)
	}
	return pu
}

// SetNetWorthGoal sets the "net_worth_goal" field.
func (pu *ProfileUpdate) SetNetWorthGoal(d decimal.Decimal) *ProfileUpdate {
	pu.mutation.ResetNetWorthGoal()
	pu.mutation.SetNetWorthGoal(d)
	return pu
}

// SetNillableNetWorthGoal sets the "net_worth_goal" field if the given value is not nil.
func (pu *ProfileUpdate) SetNillableNetWorthGoal(d *decimal.Decimal) *ProfileUpdate {
	if d != nil {
		pu.SetNetWorthGoal(*d)
	}
	return pu
}

// AddNetWorthGoal adds d to the "net_worth_goal" field.
func (pu *ProfileUpdate) AddNetWorthGoal(d decimal.Decimal) *ProfileUpdate {
	pu.mutation.AddNetWorthGoal(d)
	return pu
}

// SetCreatedAt sets the "created_at" field.
func (pu *ProfileUpdate) SetCreatedAt(t time.Time) *ProfileUpdate {
	pu.mutation.SetCreatedAt(t)
	return pu
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (pu *ProfileUpdate) SetNillableCreatedAt(t *time.Time) *ProfileUpdate {
	if t != nil {
		pu.SetCreatedAt(*t)
	}
	return pu
}

// SetUserID sets the "user" edge to the User entity by ID.
func (pu *ProfileUpdate) SetUserID(id string) *ProfileUpdate {
	pu.mutation.SetUserID(id)
	return pu
}

// SetUser sets the "user" edge to the User entity.
func (pu *ProfileUpdate) SetUser(u *User) *ProfileUpdate {
	return pu.SetUserID(u.ID)
}

// AddAccountIDs adds the "account" edge to the Account entity by IDs.
func (pu *ProfileUpdate) AddAccountIDs(ids ...string) *ProfileUpdate {
	pu.mutation.AddAccountIDs(ids...)
	return pu
}

// AddAccount adds the "account" edges to the Account entity.
func (pu *ProfileUpdate) AddAccount(a ...*Account) *ProfileUpdate {
	ids := make([]string, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return pu.AddAccountIDs(ids...)
}

// AddTransactionIDs adds the "transaction" edge to the Transaction entity by IDs.
func (pu *ProfileUpdate) AddTransactionIDs(ids ...string) *ProfileUpdate {
	pu.mutation.AddTransactionIDs(ids...)
	return pu
}

// AddTransaction adds the "transaction" edges to the Transaction entity.
func (pu *ProfileUpdate) AddTransaction(t ...*Transaction) *ProfileUpdate {
	ids := make([]string, len(t))
	for i := range t {
		ids[i] = t[i].ID
	}
	return pu.AddTransactionIDs(ids...)
}

// AddOverallSnapshotIDs adds the "overall_snapshot" edge to the OverallSnapshot entity by IDs.
func (pu *ProfileUpdate) AddOverallSnapshotIDs(ids ...string) *ProfileUpdate {
	pu.mutation.AddOverallSnapshotIDs(ids...)
	return pu
}

// AddOverallSnapshot adds the "overall_snapshot" edges to the OverallSnapshot entity.
func (pu *ProfileUpdate) AddOverallSnapshot(o ...*OverallSnapshot) *ProfileUpdate {
	ids := make([]string, len(o))
	for i := range o {
		ids[i] = o[i].ID
	}
	return pu.AddOverallSnapshotIDs(ids...)
}

// Mutation returns the ProfileMutation object of the builder.
func (pu *ProfileUpdate) Mutation() *ProfileMutation {
	return pu.mutation
}

// ClearUser clears the "user" edge to the User entity.
func (pu *ProfileUpdate) ClearUser() *ProfileUpdate {
	pu.mutation.ClearUser()
	return pu
}

// ClearAccount clears all "account" edges to the Account entity.
func (pu *ProfileUpdate) ClearAccount() *ProfileUpdate {
	pu.mutation.ClearAccount()
	return pu
}

// RemoveAccountIDs removes the "account" edge to Account entities by IDs.
func (pu *ProfileUpdate) RemoveAccountIDs(ids ...string) *ProfileUpdate {
	pu.mutation.RemoveAccountIDs(ids...)
	return pu
}

// RemoveAccount removes "account" edges to Account entities.
func (pu *ProfileUpdate) RemoveAccount(a ...*Account) *ProfileUpdate {
	ids := make([]string, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return pu.RemoveAccountIDs(ids...)
}

// ClearTransaction clears all "transaction" edges to the Transaction entity.
func (pu *ProfileUpdate) ClearTransaction() *ProfileUpdate {
	pu.mutation.ClearTransaction()
	return pu
}

// RemoveTransactionIDs removes the "transaction" edge to Transaction entities by IDs.
func (pu *ProfileUpdate) RemoveTransactionIDs(ids ...string) *ProfileUpdate {
	pu.mutation.RemoveTransactionIDs(ids...)
	return pu
}

// RemoveTransaction removes "transaction" edges to Transaction entities.
func (pu *ProfileUpdate) RemoveTransaction(t ...*Transaction) *ProfileUpdate {
	ids := make([]string, len(t))
	for i := range t {
		ids[i] = t[i].ID
	}
	return pu.RemoveTransactionIDs(ids...)
}

// ClearOverallSnapshot clears all "overall_snapshot" edges to the OverallSnapshot entity.
func (pu *ProfileUpdate) ClearOverallSnapshot() *ProfileUpdate {
	pu.mutation.ClearOverallSnapshot()
	return pu
}

// RemoveOverallSnapshotIDs removes the "overall_snapshot" edge to OverallSnapshot entities by IDs.
func (pu *ProfileUpdate) RemoveOverallSnapshotIDs(ids ...string) *ProfileUpdate {
	pu.mutation.RemoveOverallSnapshotIDs(ids...)
	return pu
}

// RemoveOverallSnapshot removes "overall_snapshot" edges to OverallSnapshot entities.
func (pu *ProfileUpdate) RemoveOverallSnapshot(o ...*OverallSnapshot) *ProfileUpdate {
	ids := make([]string, len(o))
	for i := range o {
		ids[i] = o[i].ID
	}
	return pu.RemoveOverallSnapshotIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (pu *ProfileUpdate) Save(ctx context.Context) (int, error) {
	return withHooks(ctx, pu.sqlSave, pu.mutation, pu.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (pu *ProfileUpdate) SaveX(ctx context.Context) int {
	affected, err := pu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (pu *ProfileUpdate) Exec(ctx context.Context) error {
	_, err := pu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (pu *ProfileUpdate) ExecX(ctx context.Context) {
	if err := pu.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (pu *ProfileUpdate) check() error {
	if pu.mutation.UserCleared() && len(pu.mutation.UserIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "Profile.user"`)
	}
	return nil
}

func (pu *ProfileUpdate) sqlSave(ctx context.Context) (n int, err error) {
	if err := pu.check(); err != nil {
		return n, err
	}
	_spec := sqlgraph.NewUpdateSpec(profile.Table, profile.Columns, sqlgraph.NewFieldSpec(profile.FieldID, field.TypeString))
	if ps := pu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := pu.mutation.Locale(); ok {
		_spec.SetField(profile.FieldLocale, field.TypeString, value)
	}
	if value, ok := pu.mutation.Currencies(); ok {
		_spec.SetField(profile.FieldCurrencies, field.TypeString, value)
	}
	if value, ok := pu.mutation.NetWorthGoal(); ok {
		_spec.SetField(profile.FieldNetWorthGoal, field.TypeFloat64, value)
	}
	if value, ok := pu.mutation.AddedNetWorthGoal(); ok {
		_spec.AddField(profile.FieldNetWorthGoal, field.TypeFloat64, value)
	}
	if value, ok := pu.mutation.CreatedAt(); ok {
		_spec.SetField(profile.FieldCreatedAt, field.TypeTime, value)
	}
	if pu.mutation.UserCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   profile.UserTable,
			Columns: []string{profile.UserColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(user.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := pu.mutation.UserIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   profile.UserTable,
			Columns: []string{profile.UserColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(user.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if pu.mutation.AccountCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   profile.AccountTable,
			Columns: []string{profile.AccountColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(account.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := pu.mutation.RemovedAccountIDs(); len(nodes) > 0 && !pu.mutation.AccountCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   profile.AccountTable,
			Columns: []string{profile.AccountColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(account.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := pu.mutation.AccountIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   profile.AccountTable,
			Columns: []string{profile.AccountColumn},
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
	if pu.mutation.TransactionCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   profile.TransactionTable,
			Columns: []string{profile.TransactionColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(transaction.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := pu.mutation.RemovedTransactionIDs(); len(nodes) > 0 && !pu.mutation.TransactionCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   profile.TransactionTable,
			Columns: []string{profile.TransactionColumn},
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
	if nodes := pu.mutation.TransactionIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   profile.TransactionTable,
			Columns: []string{profile.TransactionColumn},
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
	if pu.mutation.OverallSnapshotCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   profile.OverallSnapshotTable,
			Columns: []string{profile.OverallSnapshotColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(overallsnapshot.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := pu.mutation.RemovedOverallSnapshotIDs(); len(nodes) > 0 && !pu.mutation.OverallSnapshotCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   profile.OverallSnapshotTable,
			Columns: []string{profile.OverallSnapshotColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(overallsnapshot.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := pu.mutation.OverallSnapshotIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   profile.OverallSnapshotTable,
			Columns: []string{profile.OverallSnapshotColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(overallsnapshot.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, pu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{profile.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	pu.mutation.done = true
	return n, nil
}

// ProfileUpdateOne is the builder for updating a single Profile entity.
type ProfileUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *ProfileMutation
}

// SetLocale sets the "locale" field.
func (puo *ProfileUpdateOne) SetLocale(s string) *ProfileUpdateOne {
	puo.mutation.SetLocale(s)
	return puo
}

// SetNillableLocale sets the "locale" field if the given value is not nil.
func (puo *ProfileUpdateOne) SetNillableLocale(s *string) *ProfileUpdateOne {
	if s != nil {
		puo.SetLocale(*s)
	}
	return puo
}

// SetCurrencies sets the "currencies" field.
func (puo *ProfileUpdateOne) SetCurrencies(s string) *ProfileUpdateOne {
	puo.mutation.SetCurrencies(s)
	return puo
}

// SetNillableCurrencies sets the "currencies" field if the given value is not nil.
func (puo *ProfileUpdateOne) SetNillableCurrencies(s *string) *ProfileUpdateOne {
	if s != nil {
		puo.SetCurrencies(*s)
	}
	return puo
}

// SetNetWorthGoal sets the "net_worth_goal" field.
func (puo *ProfileUpdateOne) SetNetWorthGoal(d decimal.Decimal) *ProfileUpdateOne {
	puo.mutation.ResetNetWorthGoal()
	puo.mutation.SetNetWorthGoal(d)
	return puo
}

// SetNillableNetWorthGoal sets the "net_worth_goal" field if the given value is not nil.
func (puo *ProfileUpdateOne) SetNillableNetWorthGoal(d *decimal.Decimal) *ProfileUpdateOne {
	if d != nil {
		puo.SetNetWorthGoal(*d)
	}
	return puo
}

// AddNetWorthGoal adds d to the "net_worth_goal" field.
func (puo *ProfileUpdateOne) AddNetWorthGoal(d decimal.Decimal) *ProfileUpdateOne {
	puo.mutation.AddNetWorthGoal(d)
	return puo
}

// SetCreatedAt sets the "created_at" field.
func (puo *ProfileUpdateOne) SetCreatedAt(t time.Time) *ProfileUpdateOne {
	puo.mutation.SetCreatedAt(t)
	return puo
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (puo *ProfileUpdateOne) SetNillableCreatedAt(t *time.Time) *ProfileUpdateOne {
	if t != nil {
		puo.SetCreatedAt(*t)
	}
	return puo
}

// SetUserID sets the "user" edge to the User entity by ID.
func (puo *ProfileUpdateOne) SetUserID(id string) *ProfileUpdateOne {
	puo.mutation.SetUserID(id)
	return puo
}

// SetUser sets the "user" edge to the User entity.
func (puo *ProfileUpdateOne) SetUser(u *User) *ProfileUpdateOne {
	return puo.SetUserID(u.ID)
}

// AddAccountIDs adds the "account" edge to the Account entity by IDs.
func (puo *ProfileUpdateOne) AddAccountIDs(ids ...string) *ProfileUpdateOne {
	puo.mutation.AddAccountIDs(ids...)
	return puo
}

// AddAccount adds the "account" edges to the Account entity.
func (puo *ProfileUpdateOne) AddAccount(a ...*Account) *ProfileUpdateOne {
	ids := make([]string, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return puo.AddAccountIDs(ids...)
}

// AddTransactionIDs adds the "transaction" edge to the Transaction entity by IDs.
func (puo *ProfileUpdateOne) AddTransactionIDs(ids ...string) *ProfileUpdateOne {
	puo.mutation.AddTransactionIDs(ids...)
	return puo
}

// AddTransaction adds the "transaction" edges to the Transaction entity.
func (puo *ProfileUpdateOne) AddTransaction(t ...*Transaction) *ProfileUpdateOne {
	ids := make([]string, len(t))
	for i := range t {
		ids[i] = t[i].ID
	}
	return puo.AddTransactionIDs(ids...)
}

// AddOverallSnapshotIDs adds the "overall_snapshot" edge to the OverallSnapshot entity by IDs.
func (puo *ProfileUpdateOne) AddOverallSnapshotIDs(ids ...string) *ProfileUpdateOne {
	puo.mutation.AddOverallSnapshotIDs(ids...)
	return puo
}

// AddOverallSnapshot adds the "overall_snapshot" edges to the OverallSnapshot entity.
func (puo *ProfileUpdateOne) AddOverallSnapshot(o ...*OverallSnapshot) *ProfileUpdateOne {
	ids := make([]string, len(o))
	for i := range o {
		ids[i] = o[i].ID
	}
	return puo.AddOverallSnapshotIDs(ids...)
}

// Mutation returns the ProfileMutation object of the builder.
func (puo *ProfileUpdateOne) Mutation() *ProfileMutation {
	return puo.mutation
}

// ClearUser clears the "user" edge to the User entity.
func (puo *ProfileUpdateOne) ClearUser() *ProfileUpdateOne {
	puo.mutation.ClearUser()
	return puo
}

// ClearAccount clears all "account" edges to the Account entity.
func (puo *ProfileUpdateOne) ClearAccount() *ProfileUpdateOne {
	puo.mutation.ClearAccount()
	return puo
}

// RemoveAccountIDs removes the "account" edge to Account entities by IDs.
func (puo *ProfileUpdateOne) RemoveAccountIDs(ids ...string) *ProfileUpdateOne {
	puo.mutation.RemoveAccountIDs(ids...)
	return puo
}

// RemoveAccount removes "account" edges to Account entities.
func (puo *ProfileUpdateOne) RemoveAccount(a ...*Account) *ProfileUpdateOne {
	ids := make([]string, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return puo.RemoveAccountIDs(ids...)
}

// ClearTransaction clears all "transaction" edges to the Transaction entity.
func (puo *ProfileUpdateOne) ClearTransaction() *ProfileUpdateOne {
	puo.mutation.ClearTransaction()
	return puo
}

// RemoveTransactionIDs removes the "transaction" edge to Transaction entities by IDs.
func (puo *ProfileUpdateOne) RemoveTransactionIDs(ids ...string) *ProfileUpdateOne {
	puo.mutation.RemoveTransactionIDs(ids...)
	return puo
}

// RemoveTransaction removes "transaction" edges to Transaction entities.
func (puo *ProfileUpdateOne) RemoveTransaction(t ...*Transaction) *ProfileUpdateOne {
	ids := make([]string, len(t))
	for i := range t {
		ids[i] = t[i].ID
	}
	return puo.RemoveTransactionIDs(ids...)
}

// ClearOverallSnapshot clears all "overall_snapshot" edges to the OverallSnapshot entity.
func (puo *ProfileUpdateOne) ClearOverallSnapshot() *ProfileUpdateOne {
	puo.mutation.ClearOverallSnapshot()
	return puo
}

// RemoveOverallSnapshotIDs removes the "overall_snapshot" edge to OverallSnapshot entities by IDs.
func (puo *ProfileUpdateOne) RemoveOverallSnapshotIDs(ids ...string) *ProfileUpdateOne {
	puo.mutation.RemoveOverallSnapshotIDs(ids...)
	return puo
}

// RemoveOverallSnapshot removes "overall_snapshot" edges to OverallSnapshot entities.
func (puo *ProfileUpdateOne) RemoveOverallSnapshot(o ...*OverallSnapshot) *ProfileUpdateOne {
	ids := make([]string, len(o))
	for i := range o {
		ids[i] = o[i].ID
	}
	return puo.RemoveOverallSnapshotIDs(ids...)
}

// Where appends a list predicates to the ProfileUpdate builder.
func (puo *ProfileUpdateOne) Where(ps ...predicate.Profile) *ProfileUpdateOne {
	puo.mutation.Where(ps...)
	return puo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (puo *ProfileUpdateOne) Select(field string, fields ...string) *ProfileUpdateOne {
	puo.fields = append([]string{field}, fields...)
	return puo
}

// Save executes the query and returns the updated Profile entity.
func (puo *ProfileUpdateOne) Save(ctx context.Context) (*Profile, error) {
	return withHooks(ctx, puo.sqlSave, puo.mutation, puo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (puo *ProfileUpdateOne) SaveX(ctx context.Context) *Profile {
	node, err := puo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (puo *ProfileUpdateOne) Exec(ctx context.Context) error {
	_, err := puo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (puo *ProfileUpdateOne) ExecX(ctx context.Context) {
	if err := puo.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (puo *ProfileUpdateOne) check() error {
	if puo.mutation.UserCleared() && len(puo.mutation.UserIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "Profile.user"`)
	}
	return nil
}

func (puo *ProfileUpdateOne) sqlSave(ctx context.Context) (_node *Profile, err error) {
	if err := puo.check(); err != nil {
		return _node, err
	}
	_spec := sqlgraph.NewUpdateSpec(profile.Table, profile.Columns, sqlgraph.NewFieldSpec(profile.FieldID, field.TypeString))
	id, ok := puo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "Profile.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := puo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, profile.FieldID)
		for _, f := range fields {
			if !profile.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != profile.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := puo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := puo.mutation.Locale(); ok {
		_spec.SetField(profile.FieldLocale, field.TypeString, value)
	}
	if value, ok := puo.mutation.Currencies(); ok {
		_spec.SetField(profile.FieldCurrencies, field.TypeString, value)
	}
	if value, ok := puo.mutation.NetWorthGoal(); ok {
		_spec.SetField(profile.FieldNetWorthGoal, field.TypeFloat64, value)
	}
	if value, ok := puo.mutation.AddedNetWorthGoal(); ok {
		_spec.AddField(profile.FieldNetWorthGoal, field.TypeFloat64, value)
	}
	if value, ok := puo.mutation.CreatedAt(); ok {
		_spec.SetField(profile.FieldCreatedAt, field.TypeTime, value)
	}
	if puo.mutation.UserCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   profile.UserTable,
			Columns: []string{profile.UserColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(user.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := puo.mutation.UserIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   profile.UserTable,
			Columns: []string{profile.UserColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(user.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if puo.mutation.AccountCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   profile.AccountTable,
			Columns: []string{profile.AccountColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(account.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := puo.mutation.RemovedAccountIDs(); len(nodes) > 0 && !puo.mutation.AccountCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   profile.AccountTable,
			Columns: []string{profile.AccountColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(account.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := puo.mutation.AccountIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   profile.AccountTable,
			Columns: []string{profile.AccountColumn},
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
	if puo.mutation.TransactionCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   profile.TransactionTable,
			Columns: []string{profile.TransactionColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(transaction.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := puo.mutation.RemovedTransactionIDs(); len(nodes) > 0 && !puo.mutation.TransactionCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   profile.TransactionTable,
			Columns: []string{profile.TransactionColumn},
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
	if nodes := puo.mutation.TransactionIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   profile.TransactionTable,
			Columns: []string{profile.TransactionColumn},
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
	if puo.mutation.OverallSnapshotCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   profile.OverallSnapshotTable,
			Columns: []string{profile.OverallSnapshotColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(overallsnapshot.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := puo.mutation.RemovedOverallSnapshotIDs(); len(nodes) > 0 && !puo.mutation.OverallSnapshotCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   profile.OverallSnapshotTable,
			Columns: []string{profile.OverallSnapshotColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(overallsnapshot.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := puo.mutation.OverallSnapshotIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   profile.OverallSnapshotTable,
			Columns: []string{profile.OverallSnapshotColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(overallsnapshot.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &Profile{config: puo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, puo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{profile.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	puo.mutation.done = true
	return _node, nil
}
