// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fijoy/ent/predicate"
	"fijoy/ent/user"
	"fijoy/ent/userkey"
	"fmt"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// UserKeyUpdate is the builder for updating UserKey entities.
type UserKeyUpdate struct {
	config
	hooks    []Hook
	mutation *UserKeyMutation
}

// Where appends a list predicates to the UserKeyUpdate builder.
func (uku *UserKeyUpdate) Where(ps ...predicate.UserKey) *UserKeyUpdate {
	uku.mutation.Where(ps...)
	return uku
}

// SetHashedPassword sets the "hashed_password" field.
func (uku *UserKeyUpdate) SetHashedPassword(s string) *UserKeyUpdate {
	uku.mutation.SetHashedPassword(s)
	return uku
}

// SetNillableHashedPassword sets the "hashed_password" field if the given value is not nil.
func (uku *UserKeyUpdate) SetNillableHashedPassword(s *string) *UserKeyUpdate {
	if s != nil {
		uku.SetHashedPassword(*s)
	}
	return uku
}

// AddUserIDs adds the "user" edge to the User entity by IDs.
func (uku *UserKeyUpdate) AddUserIDs(ids ...int) *UserKeyUpdate {
	uku.mutation.AddUserIDs(ids...)
	return uku
}

// AddUser adds the "user" edges to the User entity.
func (uku *UserKeyUpdate) AddUser(u ...*User) *UserKeyUpdate {
	ids := make([]int, len(u))
	for i := range u {
		ids[i] = u[i].ID
	}
	return uku.AddUserIDs(ids...)
}

// Mutation returns the UserKeyMutation object of the builder.
func (uku *UserKeyUpdate) Mutation() *UserKeyMutation {
	return uku.mutation
}

// ClearUser clears all "user" edges to the User entity.
func (uku *UserKeyUpdate) ClearUser() *UserKeyUpdate {
	uku.mutation.ClearUser()
	return uku
}

// RemoveUserIDs removes the "user" edge to User entities by IDs.
func (uku *UserKeyUpdate) RemoveUserIDs(ids ...int) *UserKeyUpdate {
	uku.mutation.RemoveUserIDs(ids...)
	return uku
}

// RemoveUser removes "user" edges to User entities.
func (uku *UserKeyUpdate) RemoveUser(u ...*User) *UserKeyUpdate {
	ids := make([]int, len(u))
	for i := range u {
		ids[i] = u[i].ID
	}
	return uku.RemoveUserIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (uku *UserKeyUpdate) Save(ctx context.Context) (int, error) {
	return withHooks(ctx, uku.sqlSave, uku.mutation, uku.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (uku *UserKeyUpdate) SaveX(ctx context.Context) int {
	affected, err := uku.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (uku *UserKeyUpdate) Exec(ctx context.Context) error {
	_, err := uku.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (uku *UserKeyUpdate) ExecX(ctx context.Context) {
	if err := uku.Exec(ctx); err != nil {
		panic(err)
	}
}

func (uku *UserKeyUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := sqlgraph.NewUpdateSpec(userkey.Table, userkey.Columns, sqlgraph.NewFieldSpec(userkey.FieldID, field.TypeInt))
	if ps := uku.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := uku.mutation.HashedPassword(); ok {
		_spec.SetField(userkey.FieldHashedPassword, field.TypeString, value)
	}
	if uku.mutation.UserCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   userkey.UserTable,
			Columns: userkey.UserPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(user.FieldID, field.TypeInt),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := uku.mutation.RemovedUserIDs(); len(nodes) > 0 && !uku.mutation.UserCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   userkey.UserTable,
			Columns: userkey.UserPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(user.FieldID, field.TypeInt),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := uku.mutation.UserIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   userkey.UserTable,
			Columns: userkey.UserPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(user.FieldID, field.TypeInt),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, uku.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{userkey.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	uku.mutation.done = true
	return n, nil
}

// UserKeyUpdateOne is the builder for updating a single UserKey entity.
type UserKeyUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *UserKeyMutation
}

// SetHashedPassword sets the "hashed_password" field.
func (ukuo *UserKeyUpdateOne) SetHashedPassword(s string) *UserKeyUpdateOne {
	ukuo.mutation.SetHashedPassword(s)
	return ukuo
}

// SetNillableHashedPassword sets the "hashed_password" field if the given value is not nil.
func (ukuo *UserKeyUpdateOne) SetNillableHashedPassword(s *string) *UserKeyUpdateOne {
	if s != nil {
		ukuo.SetHashedPassword(*s)
	}
	return ukuo
}

// AddUserIDs adds the "user" edge to the User entity by IDs.
func (ukuo *UserKeyUpdateOne) AddUserIDs(ids ...int) *UserKeyUpdateOne {
	ukuo.mutation.AddUserIDs(ids...)
	return ukuo
}

// AddUser adds the "user" edges to the User entity.
func (ukuo *UserKeyUpdateOne) AddUser(u ...*User) *UserKeyUpdateOne {
	ids := make([]int, len(u))
	for i := range u {
		ids[i] = u[i].ID
	}
	return ukuo.AddUserIDs(ids...)
}

// Mutation returns the UserKeyMutation object of the builder.
func (ukuo *UserKeyUpdateOne) Mutation() *UserKeyMutation {
	return ukuo.mutation
}

// ClearUser clears all "user" edges to the User entity.
func (ukuo *UserKeyUpdateOne) ClearUser() *UserKeyUpdateOne {
	ukuo.mutation.ClearUser()
	return ukuo
}

// RemoveUserIDs removes the "user" edge to User entities by IDs.
func (ukuo *UserKeyUpdateOne) RemoveUserIDs(ids ...int) *UserKeyUpdateOne {
	ukuo.mutation.RemoveUserIDs(ids...)
	return ukuo
}

// RemoveUser removes "user" edges to User entities.
func (ukuo *UserKeyUpdateOne) RemoveUser(u ...*User) *UserKeyUpdateOne {
	ids := make([]int, len(u))
	for i := range u {
		ids[i] = u[i].ID
	}
	return ukuo.RemoveUserIDs(ids...)
}

// Where appends a list predicates to the UserKeyUpdate builder.
func (ukuo *UserKeyUpdateOne) Where(ps ...predicate.UserKey) *UserKeyUpdateOne {
	ukuo.mutation.Where(ps...)
	return ukuo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (ukuo *UserKeyUpdateOne) Select(field string, fields ...string) *UserKeyUpdateOne {
	ukuo.fields = append([]string{field}, fields...)
	return ukuo
}

// Save executes the query and returns the updated UserKey entity.
func (ukuo *UserKeyUpdateOne) Save(ctx context.Context) (*UserKey, error) {
	return withHooks(ctx, ukuo.sqlSave, ukuo.mutation, ukuo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (ukuo *UserKeyUpdateOne) SaveX(ctx context.Context) *UserKey {
	node, err := ukuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (ukuo *UserKeyUpdateOne) Exec(ctx context.Context) error {
	_, err := ukuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ukuo *UserKeyUpdateOne) ExecX(ctx context.Context) {
	if err := ukuo.Exec(ctx); err != nil {
		panic(err)
	}
}

func (ukuo *UserKeyUpdateOne) sqlSave(ctx context.Context) (_node *UserKey, err error) {
	_spec := sqlgraph.NewUpdateSpec(userkey.Table, userkey.Columns, sqlgraph.NewFieldSpec(userkey.FieldID, field.TypeInt))
	id, ok := ukuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "UserKey.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := ukuo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, userkey.FieldID)
		for _, f := range fields {
			if !userkey.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != userkey.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := ukuo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := ukuo.mutation.HashedPassword(); ok {
		_spec.SetField(userkey.FieldHashedPassword, field.TypeString, value)
	}
	if ukuo.mutation.UserCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   userkey.UserTable,
			Columns: userkey.UserPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(user.FieldID, field.TypeInt),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ukuo.mutation.RemovedUserIDs(); len(nodes) > 0 && !ukuo.mutation.UserCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   userkey.UserTable,
			Columns: userkey.UserPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(user.FieldID, field.TypeInt),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ukuo.mutation.UserIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: true,
			Table:   userkey.UserTable,
			Columns: userkey.UserPrimaryKey,
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(user.FieldID, field.TypeInt),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &UserKey{config: ukuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, ukuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{userkey.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	ukuo.mutation.done = true
	return _node, nil
}
