// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"fijoy/ent/predicate"
	"fijoy/ent/profile"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// ProfileDelete is the builder for deleting a Profile entity.
type ProfileDelete struct {
	config
	hooks    []Hook
	mutation *ProfileMutation
}

// Where appends a list predicates to the ProfileDelete builder.
func (pd *ProfileDelete) Where(ps ...predicate.Profile) *ProfileDelete {
	pd.mutation.Where(ps...)
	return pd
}

// Exec executes the deletion query and returns how many vertices were deleted.
func (pd *ProfileDelete) Exec(ctx context.Context) (int, error) {
	return withHooks(ctx, pd.sqlExec, pd.mutation, pd.hooks)
}

// ExecX is like Exec, but panics if an error occurs.
func (pd *ProfileDelete) ExecX(ctx context.Context) int {
	n, err := pd.Exec(ctx)
	if err != nil {
		panic(err)
	}
	return n
}

func (pd *ProfileDelete) sqlExec(ctx context.Context) (int, error) {
	_spec := sqlgraph.NewDeleteSpec(profile.Table, sqlgraph.NewFieldSpec(profile.FieldID, field.TypeString))
	if ps := pd.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	affected, err := sqlgraph.DeleteNodes(ctx, pd.driver, _spec)
	if err != nil && sqlgraph.IsConstraintError(err) {
		err = &ConstraintError{msg: err.Error(), wrap: err}
	}
	pd.mutation.done = true
	return affected, err
}

// ProfileDeleteOne is the builder for deleting a single Profile entity.
type ProfileDeleteOne struct {
	pd *ProfileDelete
}

// Where appends a list predicates to the ProfileDelete builder.
func (pdo *ProfileDeleteOne) Where(ps ...predicate.Profile) *ProfileDeleteOne {
	pdo.pd.mutation.Where(ps...)
	return pdo
}

// Exec executes the deletion query.
func (pdo *ProfileDeleteOne) Exec(ctx context.Context) error {
	n, err := pdo.pd.Exec(ctx)
	switch {
	case err != nil:
		return err
	case n == 0:
		return &NotFoundError{profile.Label}
	default:
		return nil
	}
}

// ExecX is like Exec, but panics if an error occurs.
func (pdo *ProfileDeleteOne) ExecX(ctx context.Context) {
	if err := pdo.Exec(ctx); err != nil {
		panic(err)
	}
}
