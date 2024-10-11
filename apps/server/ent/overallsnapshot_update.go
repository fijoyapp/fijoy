// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fijoy/ent/overallsnapshot"
	"fijoy/ent/predicate"
	"fijoy/ent/profile"
	"fmt"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/shopspring/decimal"
)

// OverallSnapshotUpdate is the builder for updating OverallSnapshot entities.
type OverallSnapshotUpdate struct {
	config
	hooks    []Hook
	mutation *OverallSnapshotMutation
}

// Where appends a list predicates to the OverallSnapshotUpdate builder.
func (osu *OverallSnapshotUpdate) Where(ps ...predicate.OverallSnapshot) *OverallSnapshotUpdate {
	osu.mutation.Where(ps...)
	return osu
}

// SetDatehour sets the "datehour" field.
func (osu *OverallSnapshotUpdate) SetDatehour(t time.Time) *OverallSnapshotUpdate {
	osu.mutation.SetDatehour(t)
	return osu
}

// SetNillableDatehour sets the "datehour" field if the given value is not nil.
func (osu *OverallSnapshotUpdate) SetNillableDatehour(t *time.Time) *OverallSnapshotUpdate {
	if t != nil {
		osu.SetDatehour(*t)
	}
	return osu
}

// SetLiquidity sets the "liquidity" field.
func (osu *OverallSnapshotUpdate) SetLiquidity(d decimal.Decimal) *OverallSnapshotUpdate {
	osu.mutation.ResetLiquidity()
	osu.mutation.SetLiquidity(d)
	return osu
}

// SetNillableLiquidity sets the "liquidity" field if the given value is not nil.
func (osu *OverallSnapshotUpdate) SetNillableLiquidity(d *decimal.Decimal) *OverallSnapshotUpdate {
	if d != nil {
		osu.SetLiquidity(*d)
	}
	return osu
}

// AddLiquidity adds d to the "liquidity" field.
func (osu *OverallSnapshotUpdate) AddLiquidity(d decimal.Decimal) *OverallSnapshotUpdate {
	osu.mutation.AddLiquidity(d)
	return osu
}

// SetInvestment sets the "investment" field.
func (osu *OverallSnapshotUpdate) SetInvestment(d decimal.Decimal) *OverallSnapshotUpdate {
	osu.mutation.ResetInvestment()
	osu.mutation.SetInvestment(d)
	return osu
}

// SetNillableInvestment sets the "investment" field if the given value is not nil.
func (osu *OverallSnapshotUpdate) SetNillableInvestment(d *decimal.Decimal) *OverallSnapshotUpdate {
	if d != nil {
		osu.SetInvestment(*d)
	}
	return osu
}

// AddInvestment adds d to the "investment" field.
func (osu *OverallSnapshotUpdate) AddInvestment(d decimal.Decimal) *OverallSnapshotUpdate {
	osu.mutation.AddInvestment(d)
	return osu
}

// SetProperty sets the "property" field.
func (osu *OverallSnapshotUpdate) SetProperty(d decimal.Decimal) *OverallSnapshotUpdate {
	osu.mutation.ResetProperty()
	osu.mutation.SetProperty(d)
	return osu
}

// SetNillableProperty sets the "property" field if the given value is not nil.
func (osu *OverallSnapshotUpdate) SetNillableProperty(d *decimal.Decimal) *OverallSnapshotUpdate {
	if d != nil {
		osu.SetProperty(*d)
	}
	return osu
}

// AddProperty adds d to the "property" field.
func (osu *OverallSnapshotUpdate) AddProperty(d decimal.Decimal) *OverallSnapshotUpdate {
	osu.mutation.AddProperty(d)
	return osu
}

// SetReceivable sets the "receivable" field.
func (osu *OverallSnapshotUpdate) SetReceivable(d decimal.Decimal) *OverallSnapshotUpdate {
	osu.mutation.ResetReceivable()
	osu.mutation.SetReceivable(d)
	return osu
}

// SetNillableReceivable sets the "receivable" field if the given value is not nil.
func (osu *OverallSnapshotUpdate) SetNillableReceivable(d *decimal.Decimal) *OverallSnapshotUpdate {
	if d != nil {
		osu.SetReceivable(*d)
	}
	return osu
}

// AddReceivable adds d to the "receivable" field.
func (osu *OverallSnapshotUpdate) AddReceivable(d decimal.Decimal) *OverallSnapshotUpdate {
	osu.mutation.AddReceivable(d)
	return osu
}

// SetLiablity sets the "liablity" field.
func (osu *OverallSnapshotUpdate) SetLiablity(d decimal.Decimal) *OverallSnapshotUpdate {
	osu.mutation.ResetLiablity()
	osu.mutation.SetLiablity(d)
	return osu
}

// SetNillableLiablity sets the "liablity" field if the given value is not nil.
func (osu *OverallSnapshotUpdate) SetNillableLiablity(d *decimal.Decimal) *OverallSnapshotUpdate {
	if d != nil {
		osu.SetLiablity(*d)
	}
	return osu
}

// AddLiablity adds d to the "liablity" field.
func (osu *OverallSnapshotUpdate) AddLiablity(d decimal.Decimal) *OverallSnapshotUpdate {
	osu.mutation.AddLiablity(d)
	return osu
}

// SetProfileID sets the "profile" edge to the Profile entity by ID.
func (osu *OverallSnapshotUpdate) SetProfileID(id string) *OverallSnapshotUpdate {
	osu.mutation.SetProfileID(id)
	return osu
}

// SetProfile sets the "profile" edge to the Profile entity.
func (osu *OverallSnapshotUpdate) SetProfile(p *Profile) *OverallSnapshotUpdate {
	return osu.SetProfileID(p.ID)
}

// Mutation returns the OverallSnapshotMutation object of the builder.
func (osu *OverallSnapshotUpdate) Mutation() *OverallSnapshotMutation {
	return osu.mutation
}

// ClearProfile clears the "profile" edge to the Profile entity.
func (osu *OverallSnapshotUpdate) ClearProfile() *OverallSnapshotUpdate {
	osu.mutation.ClearProfile()
	return osu
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (osu *OverallSnapshotUpdate) Save(ctx context.Context) (int, error) {
	return withHooks(ctx, osu.sqlSave, osu.mutation, osu.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (osu *OverallSnapshotUpdate) SaveX(ctx context.Context) int {
	affected, err := osu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (osu *OverallSnapshotUpdate) Exec(ctx context.Context) error {
	_, err := osu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (osu *OverallSnapshotUpdate) ExecX(ctx context.Context) {
	if err := osu.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (osu *OverallSnapshotUpdate) check() error {
	if osu.mutation.ProfileCleared() && len(osu.mutation.ProfileIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "OverallSnapshot.profile"`)
	}
	return nil
}

func (osu *OverallSnapshotUpdate) sqlSave(ctx context.Context) (n int, err error) {
	if err := osu.check(); err != nil {
		return n, err
	}
	_spec := sqlgraph.NewUpdateSpec(overallsnapshot.Table, overallsnapshot.Columns, sqlgraph.NewFieldSpec(overallsnapshot.FieldID, field.TypeString))
	if ps := osu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := osu.mutation.Datehour(); ok {
		_spec.SetField(overallsnapshot.FieldDatehour, field.TypeTime, value)
	}
	if value, ok := osu.mutation.Liquidity(); ok {
		_spec.SetField(overallsnapshot.FieldLiquidity, field.TypeFloat64, value)
	}
	if value, ok := osu.mutation.AddedLiquidity(); ok {
		_spec.AddField(overallsnapshot.FieldLiquidity, field.TypeFloat64, value)
	}
	if value, ok := osu.mutation.Investment(); ok {
		_spec.SetField(overallsnapshot.FieldInvestment, field.TypeFloat64, value)
	}
	if value, ok := osu.mutation.AddedInvestment(); ok {
		_spec.AddField(overallsnapshot.FieldInvestment, field.TypeFloat64, value)
	}
	if value, ok := osu.mutation.Property(); ok {
		_spec.SetField(overallsnapshot.FieldProperty, field.TypeFloat64, value)
	}
	if value, ok := osu.mutation.AddedProperty(); ok {
		_spec.AddField(overallsnapshot.FieldProperty, field.TypeFloat64, value)
	}
	if value, ok := osu.mutation.Receivable(); ok {
		_spec.SetField(overallsnapshot.FieldReceivable, field.TypeFloat64, value)
	}
	if value, ok := osu.mutation.AddedReceivable(); ok {
		_spec.AddField(overallsnapshot.FieldReceivable, field.TypeFloat64, value)
	}
	if value, ok := osu.mutation.Liablity(); ok {
		_spec.SetField(overallsnapshot.FieldLiablity, field.TypeFloat64, value)
	}
	if value, ok := osu.mutation.AddedLiablity(); ok {
		_spec.AddField(overallsnapshot.FieldLiablity, field.TypeFloat64, value)
	}
	if osu.mutation.ProfileCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   overallsnapshot.ProfileTable,
			Columns: []string{overallsnapshot.ProfileColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(profile.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := osu.mutation.ProfileIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   overallsnapshot.ProfileTable,
			Columns: []string{overallsnapshot.ProfileColumn},
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
	if n, err = sqlgraph.UpdateNodes(ctx, osu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{overallsnapshot.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	osu.mutation.done = true
	return n, nil
}

// OverallSnapshotUpdateOne is the builder for updating a single OverallSnapshot entity.
type OverallSnapshotUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *OverallSnapshotMutation
}

// SetDatehour sets the "datehour" field.
func (osuo *OverallSnapshotUpdateOne) SetDatehour(t time.Time) *OverallSnapshotUpdateOne {
	osuo.mutation.SetDatehour(t)
	return osuo
}

// SetNillableDatehour sets the "datehour" field if the given value is not nil.
func (osuo *OverallSnapshotUpdateOne) SetNillableDatehour(t *time.Time) *OverallSnapshotUpdateOne {
	if t != nil {
		osuo.SetDatehour(*t)
	}
	return osuo
}

// SetLiquidity sets the "liquidity" field.
func (osuo *OverallSnapshotUpdateOne) SetLiquidity(d decimal.Decimal) *OverallSnapshotUpdateOne {
	osuo.mutation.ResetLiquidity()
	osuo.mutation.SetLiquidity(d)
	return osuo
}

// SetNillableLiquidity sets the "liquidity" field if the given value is not nil.
func (osuo *OverallSnapshotUpdateOne) SetNillableLiquidity(d *decimal.Decimal) *OverallSnapshotUpdateOne {
	if d != nil {
		osuo.SetLiquidity(*d)
	}
	return osuo
}

// AddLiquidity adds d to the "liquidity" field.
func (osuo *OverallSnapshotUpdateOne) AddLiquidity(d decimal.Decimal) *OverallSnapshotUpdateOne {
	osuo.mutation.AddLiquidity(d)
	return osuo
}

// SetInvestment sets the "investment" field.
func (osuo *OverallSnapshotUpdateOne) SetInvestment(d decimal.Decimal) *OverallSnapshotUpdateOne {
	osuo.mutation.ResetInvestment()
	osuo.mutation.SetInvestment(d)
	return osuo
}

// SetNillableInvestment sets the "investment" field if the given value is not nil.
func (osuo *OverallSnapshotUpdateOne) SetNillableInvestment(d *decimal.Decimal) *OverallSnapshotUpdateOne {
	if d != nil {
		osuo.SetInvestment(*d)
	}
	return osuo
}

// AddInvestment adds d to the "investment" field.
func (osuo *OverallSnapshotUpdateOne) AddInvestment(d decimal.Decimal) *OverallSnapshotUpdateOne {
	osuo.mutation.AddInvestment(d)
	return osuo
}

// SetProperty sets the "property" field.
func (osuo *OverallSnapshotUpdateOne) SetProperty(d decimal.Decimal) *OverallSnapshotUpdateOne {
	osuo.mutation.ResetProperty()
	osuo.mutation.SetProperty(d)
	return osuo
}

// SetNillableProperty sets the "property" field if the given value is not nil.
func (osuo *OverallSnapshotUpdateOne) SetNillableProperty(d *decimal.Decimal) *OverallSnapshotUpdateOne {
	if d != nil {
		osuo.SetProperty(*d)
	}
	return osuo
}

// AddProperty adds d to the "property" field.
func (osuo *OverallSnapshotUpdateOne) AddProperty(d decimal.Decimal) *OverallSnapshotUpdateOne {
	osuo.mutation.AddProperty(d)
	return osuo
}

// SetReceivable sets the "receivable" field.
func (osuo *OverallSnapshotUpdateOne) SetReceivable(d decimal.Decimal) *OverallSnapshotUpdateOne {
	osuo.mutation.ResetReceivable()
	osuo.mutation.SetReceivable(d)
	return osuo
}

// SetNillableReceivable sets the "receivable" field if the given value is not nil.
func (osuo *OverallSnapshotUpdateOne) SetNillableReceivable(d *decimal.Decimal) *OverallSnapshotUpdateOne {
	if d != nil {
		osuo.SetReceivable(*d)
	}
	return osuo
}

// AddReceivable adds d to the "receivable" field.
func (osuo *OverallSnapshotUpdateOne) AddReceivable(d decimal.Decimal) *OverallSnapshotUpdateOne {
	osuo.mutation.AddReceivable(d)
	return osuo
}

// SetLiablity sets the "liablity" field.
func (osuo *OverallSnapshotUpdateOne) SetLiablity(d decimal.Decimal) *OverallSnapshotUpdateOne {
	osuo.mutation.ResetLiablity()
	osuo.mutation.SetLiablity(d)
	return osuo
}

// SetNillableLiablity sets the "liablity" field if the given value is not nil.
func (osuo *OverallSnapshotUpdateOne) SetNillableLiablity(d *decimal.Decimal) *OverallSnapshotUpdateOne {
	if d != nil {
		osuo.SetLiablity(*d)
	}
	return osuo
}

// AddLiablity adds d to the "liablity" field.
func (osuo *OverallSnapshotUpdateOne) AddLiablity(d decimal.Decimal) *OverallSnapshotUpdateOne {
	osuo.mutation.AddLiablity(d)
	return osuo
}

// SetProfileID sets the "profile" edge to the Profile entity by ID.
func (osuo *OverallSnapshotUpdateOne) SetProfileID(id string) *OverallSnapshotUpdateOne {
	osuo.mutation.SetProfileID(id)
	return osuo
}

// SetProfile sets the "profile" edge to the Profile entity.
func (osuo *OverallSnapshotUpdateOne) SetProfile(p *Profile) *OverallSnapshotUpdateOne {
	return osuo.SetProfileID(p.ID)
}

// Mutation returns the OverallSnapshotMutation object of the builder.
func (osuo *OverallSnapshotUpdateOne) Mutation() *OverallSnapshotMutation {
	return osuo.mutation
}

// ClearProfile clears the "profile" edge to the Profile entity.
func (osuo *OverallSnapshotUpdateOne) ClearProfile() *OverallSnapshotUpdateOne {
	osuo.mutation.ClearProfile()
	return osuo
}

// Where appends a list predicates to the OverallSnapshotUpdate builder.
func (osuo *OverallSnapshotUpdateOne) Where(ps ...predicate.OverallSnapshot) *OverallSnapshotUpdateOne {
	osuo.mutation.Where(ps...)
	return osuo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (osuo *OverallSnapshotUpdateOne) Select(field string, fields ...string) *OverallSnapshotUpdateOne {
	osuo.fields = append([]string{field}, fields...)
	return osuo
}

// Save executes the query and returns the updated OverallSnapshot entity.
func (osuo *OverallSnapshotUpdateOne) Save(ctx context.Context) (*OverallSnapshot, error) {
	return withHooks(ctx, osuo.sqlSave, osuo.mutation, osuo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (osuo *OverallSnapshotUpdateOne) SaveX(ctx context.Context) *OverallSnapshot {
	node, err := osuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (osuo *OverallSnapshotUpdateOne) Exec(ctx context.Context) error {
	_, err := osuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (osuo *OverallSnapshotUpdateOne) ExecX(ctx context.Context) {
	if err := osuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (osuo *OverallSnapshotUpdateOne) check() error {
	if osuo.mutation.ProfileCleared() && len(osuo.mutation.ProfileIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "OverallSnapshot.profile"`)
	}
	return nil
}

func (osuo *OverallSnapshotUpdateOne) sqlSave(ctx context.Context) (_node *OverallSnapshot, err error) {
	if err := osuo.check(); err != nil {
		return _node, err
	}
	_spec := sqlgraph.NewUpdateSpec(overallsnapshot.Table, overallsnapshot.Columns, sqlgraph.NewFieldSpec(overallsnapshot.FieldID, field.TypeString))
	id, ok := osuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "OverallSnapshot.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := osuo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, overallsnapshot.FieldID)
		for _, f := range fields {
			if !overallsnapshot.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != overallsnapshot.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := osuo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := osuo.mutation.Datehour(); ok {
		_spec.SetField(overallsnapshot.FieldDatehour, field.TypeTime, value)
	}
	if value, ok := osuo.mutation.Liquidity(); ok {
		_spec.SetField(overallsnapshot.FieldLiquidity, field.TypeFloat64, value)
	}
	if value, ok := osuo.mutation.AddedLiquidity(); ok {
		_spec.AddField(overallsnapshot.FieldLiquidity, field.TypeFloat64, value)
	}
	if value, ok := osuo.mutation.Investment(); ok {
		_spec.SetField(overallsnapshot.FieldInvestment, field.TypeFloat64, value)
	}
	if value, ok := osuo.mutation.AddedInvestment(); ok {
		_spec.AddField(overallsnapshot.FieldInvestment, field.TypeFloat64, value)
	}
	if value, ok := osuo.mutation.Property(); ok {
		_spec.SetField(overallsnapshot.FieldProperty, field.TypeFloat64, value)
	}
	if value, ok := osuo.mutation.AddedProperty(); ok {
		_spec.AddField(overallsnapshot.FieldProperty, field.TypeFloat64, value)
	}
	if value, ok := osuo.mutation.Receivable(); ok {
		_spec.SetField(overallsnapshot.FieldReceivable, field.TypeFloat64, value)
	}
	if value, ok := osuo.mutation.AddedReceivable(); ok {
		_spec.AddField(overallsnapshot.FieldReceivable, field.TypeFloat64, value)
	}
	if value, ok := osuo.mutation.Liablity(); ok {
		_spec.SetField(overallsnapshot.FieldLiablity, field.TypeFloat64, value)
	}
	if value, ok := osuo.mutation.AddedLiablity(); ok {
		_spec.AddField(overallsnapshot.FieldLiablity, field.TypeFloat64, value)
	}
	if osuo.mutation.ProfileCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   overallsnapshot.ProfileTable,
			Columns: []string{overallsnapshot.ProfileColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(profile.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := osuo.mutation.ProfileIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   overallsnapshot.ProfileTable,
			Columns: []string{overallsnapshot.ProfileColumn},
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
	_node = &OverallSnapshot{config: osuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, osuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{overallsnapshot.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	osuo.mutation.done = true
	return _node, nil
}
