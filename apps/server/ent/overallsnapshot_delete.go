// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"fijoy/ent/overallsnapshot"
	"fijoy/ent/predicate"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// OverallSnapshotDelete is the builder for deleting a OverallSnapshot entity.
type OverallSnapshotDelete struct {
	config
	hooks    []Hook
	mutation *OverallSnapshotMutation
}

// Where appends a list predicates to the OverallSnapshotDelete builder.
func (osd *OverallSnapshotDelete) Where(ps ...predicate.OverallSnapshot) *OverallSnapshotDelete {
	osd.mutation.Where(ps...)
	return osd
}

// Exec executes the deletion query and returns how many vertices were deleted.
func (osd *OverallSnapshotDelete) Exec(ctx context.Context) (int, error) {
	return withHooks(ctx, osd.sqlExec, osd.mutation, osd.hooks)
}

// ExecX is like Exec, but panics if an error occurs.
func (osd *OverallSnapshotDelete) ExecX(ctx context.Context) int {
	n, err := osd.Exec(ctx)
	if err != nil {
		panic(err)
	}
	return n
}

func (osd *OverallSnapshotDelete) sqlExec(ctx context.Context) (int, error) {
	_spec := sqlgraph.NewDeleteSpec(overallsnapshot.Table, sqlgraph.NewFieldSpec(overallsnapshot.FieldID, field.TypeString))
	if ps := osd.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	affected, err := sqlgraph.DeleteNodes(ctx, osd.driver, _spec)
	if err != nil && sqlgraph.IsConstraintError(err) {
		err = &ConstraintError{msg: err.Error(), wrap: err}
	}
	osd.mutation.done = true
	return affected, err
}

// OverallSnapshotDeleteOne is the builder for deleting a single OverallSnapshot entity.
type OverallSnapshotDeleteOne struct {
	osd *OverallSnapshotDelete
}

// Where appends a list predicates to the OverallSnapshotDelete builder.
func (osdo *OverallSnapshotDeleteOne) Where(ps ...predicate.OverallSnapshot) *OverallSnapshotDeleteOne {
	osdo.osd.mutation.Where(ps...)
	return osdo
}

// Exec executes the deletion query.
func (osdo *OverallSnapshotDeleteOne) Exec(ctx context.Context) error {
	n, err := osdo.osd.Exec(ctx)
	switch {
	case err != nil:
		return err
	case n == 0:
		return &NotFoundError{overallsnapshot.Label}
	default:
		return nil
	}
}

// ExecX is like Exec, but panics if an error occurs.
func (osdo *OverallSnapshotDeleteOne) ExecX(ctx context.Context) {
	if err := osdo.Exec(ctx); err != nil {
		panic(err)
	}
}
