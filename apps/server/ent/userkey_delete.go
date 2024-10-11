// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"fijoy/ent/predicate"
	"fijoy/ent/userkey"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// UserKeyDelete is the builder for deleting a UserKey entity.
type UserKeyDelete struct {
	config
	hooks    []Hook
	mutation *UserKeyMutation
}

// Where appends a list predicates to the UserKeyDelete builder.
func (ukd *UserKeyDelete) Where(ps ...predicate.UserKey) *UserKeyDelete {
	ukd.mutation.Where(ps...)
	return ukd
}

// Exec executes the deletion query and returns how many vertices were deleted.
func (ukd *UserKeyDelete) Exec(ctx context.Context) (int, error) {
	return withHooks(ctx, ukd.sqlExec, ukd.mutation, ukd.hooks)
}

// ExecX is like Exec, but panics if an error occurs.
func (ukd *UserKeyDelete) ExecX(ctx context.Context) int {
	n, err := ukd.Exec(ctx)
	if err != nil {
		panic(err)
	}
	return n
}

func (ukd *UserKeyDelete) sqlExec(ctx context.Context) (int, error) {
	_spec := sqlgraph.NewDeleteSpec(userkey.Table, sqlgraph.NewFieldSpec(userkey.FieldID, field.TypeString))
	if ps := ukd.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	affected, err := sqlgraph.DeleteNodes(ctx, ukd.driver, _spec)
	if err != nil && sqlgraph.IsConstraintError(err) {
		err = &ConstraintError{msg: err.Error(), wrap: err}
	}
	ukd.mutation.done = true
	return affected, err
}

// UserKeyDeleteOne is the builder for deleting a single UserKey entity.
type UserKeyDeleteOne struct {
	ukd *UserKeyDelete
}

// Where appends a list predicates to the UserKeyDelete builder.
func (ukdo *UserKeyDeleteOne) Where(ps ...predicate.UserKey) *UserKeyDeleteOne {
	ukdo.ukd.mutation.Where(ps...)
	return ukdo
}

// Exec executes the deletion query.
func (ukdo *UserKeyDeleteOne) Exec(ctx context.Context) error {
	n, err := ukdo.ukd.Exec(ctx)
	switch {
	case err != nil:
		return err
	case n == 0:
		return &NotFoundError{userkey.Label}
	default:
		return nil
	}
}

// ExecX is like Exec, but panics if an error occurs.
func (ukdo *UserKeyDeleteOne) ExecX(ctx context.Context) {
	if err := ukdo.Exec(ctx); err != nil {
		panic(err)
	}
}
