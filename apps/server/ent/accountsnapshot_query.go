// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"database/sql/driver"
	"fijoy/ent/account"
	"fijoy/ent/accountsnapshot"
	"fijoy/ent/predicate"
	"fmt"
	"math"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// AccountSnapshotQuery is the builder for querying AccountSnapshot entities.
type AccountSnapshotQuery struct {
	config
	ctx         *QueryContext
	order       []accountsnapshot.OrderOption
	inters      []Interceptor
	predicates  []predicate.AccountSnapshot
	withAccount *AccountQuery
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the AccountSnapshotQuery builder.
func (asq *AccountSnapshotQuery) Where(ps ...predicate.AccountSnapshot) *AccountSnapshotQuery {
	asq.predicates = append(asq.predicates, ps...)
	return asq
}

// Limit the number of records to be returned by this query.
func (asq *AccountSnapshotQuery) Limit(limit int) *AccountSnapshotQuery {
	asq.ctx.Limit = &limit
	return asq
}

// Offset to start from.
func (asq *AccountSnapshotQuery) Offset(offset int) *AccountSnapshotQuery {
	asq.ctx.Offset = &offset
	return asq
}

// Unique configures the query builder to filter duplicate records on query.
// By default, unique is set to true, and can be disabled using this method.
func (asq *AccountSnapshotQuery) Unique(unique bool) *AccountSnapshotQuery {
	asq.ctx.Unique = &unique
	return asq
}

// Order specifies how the records should be ordered.
func (asq *AccountSnapshotQuery) Order(o ...accountsnapshot.OrderOption) *AccountSnapshotQuery {
	asq.order = append(asq.order, o...)
	return asq
}

// QueryAccount chains the current query on the "account" edge.
func (asq *AccountSnapshotQuery) QueryAccount() *AccountQuery {
	query := (&AccountClient{config: asq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := asq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := asq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(accountsnapshot.Table, accountsnapshot.FieldID, selector),
			sqlgraph.To(account.Table, account.FieldID),
			sqlgraph.Edge(sqlgraph.M2M, true, accountsnapshot.AccountTable, accountsnapshot.AccountPrimaryKey...),
		)
		fromU = sqlgraph.SetNeighbors(asq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first AccountSnapshot entity from the query.
// Returns a *NotFoundError when no AccountSnapshot was found.
func (asq *AccountSnapshotQuery) First(ctx context.Context) (*AccountSnapshot, error) {
	nodes, err := asq.Limit(1).All(setContextOp(ctx, asq.ctx, ent.OpQueryFirst))
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{accountsnapshot.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (asq *AccountSnapshotQuery) FirstX(ctx context.Context) *AccountSnapshot {
	node, err := asq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first AccountSnapshot ID from the query.
// Returns a *NotFoundError when no AccountSnapshot ID was found.
func (asq *AccountSnapshotQuery) FirstID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = asq.Limit(1).IDs(setContextOp(ctx, asq.ctx, ent.OpQueryFirstID)); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{accountsnapshot.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (asq *AccountSnapshotQuery) FirstIDX(ctx context.Context) int {
	id, err := asq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns a single AccountSnapshot entity found by the query, ensuring it only returns one.
// Returns a *NotSingularError when more than one AccountSnapshot entity is found.
// Returns a *NotFoundError when no AccountSnapshot entities are found.
func (asq *AccountSnapshotQuery) Only(ctx context.Context) (*AccountSnapshot, error) {
	nodes, err := asq.Limit(2).All(setContextOp(ctx, asq.ctx, ent.OpQueryOnly))
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{accountsnapshot.Label}
	default:
		return nil, &NotSingularError{accountsnapshot.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (asq *AccountSnapshotQuery) OnlyX(ctx context.Context) *AccountSnapshot {
	node, err := asq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID is like Only, but returns the only AccountSnapshot ID in the query.
// Returns a *NotSingularError when more than one AccountSnapshot ID is found.
// Returns a *NotFoundError when no entities are found.
func (asq *AccountSnapshotQuery) OnlyID(ctx context.Context) (id int, err error) {
	var ids []int
	if ids, err = asq.Limit(2).IDs(setContextOp(ctx, asq.ctx, ent.OpQueryOnlyID)); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{accountsnapshot.Label}
	default:
		err = &NotSingularError{accountsnapshot.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (asq *AccountSnapshotQuery) OnlyIDX(ctx context.Context) int {
	id, err := asq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of AccountSnapshots.
func (asq *AccountSnapshotQuery) All(ctx context.Context) ([]*AccountSnapshot, error) {
	ctx = setContextOp(ctx, asq.ctx, ent.OpQueryAll)
	if err := asq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	qr := querierAll[[]*AccountSnapshot, *AccountSnapshotQuery]()
	return withInterceptors[[]*AccountSnapshot](ctx, asq, qr, asq.inters)
}

// AllX is like All, but panics if an error occurs.
func (asq *AccountSnapshotQuery) AllX(ctx context.Context) []*AccountSnapshot {
	nodes, err := asq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of AccountSnapshot IDs.
func (asq *AccountSnapshotQuery) IDs(ctx context.Context) (ids []int, err error) {
	if asq.ctx.Unique == nil && asq.path != nil {
		asq.Unique(true)
	}
	ctx = setContextOp(ctx, asq.ctx, ent.OpQueryIDs)
	if err = asq.Select(accountsnapshot.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (asq *AccountSnapshotQuery) IDsX(ctx context.Context) []int {
	ids, err := asq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (asq *AccountSnapshotQuery) Count(ctx context.Context) (int, error) {
	ctx = setContextOp(ctx, asq.ctx, ent.OpQueryCount)
	if err := asq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return withInterceptors[int](ctx, asq, querierCount[*AccountSnapshotQuery](), asq.inters)
}

// CountX is like Count, but panics if an error occurs.
func (asq *AccountSnapshotQuery) CountX(ctx context.Context) int {
	count, err := asq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (asq *AccountSnapshotQuery) Exist(ctx context.Context) (bool, error) {
	ctx = setContextOp(ctx, asq.ctx, ent.OpQueryExist)
	switch _, err := asq.FirstID(ctx); {
	case IsNotFound(err):
		return false, nil
	case err != nil:
		return false, fmt.Errorf("ent: check existence: %w", err)
	default:
		return true, nil
	}
}

// ExistX is like Exist, but panics if an error occurs.
func (asq *AccountSnapshotQuery) ExistX(ctx context.Context) bool {
	exist, err := asq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the AccountSnapshotQuery builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (asq *AccountSnapshotQuery) Clone() *AccountSnapshotQuery {
	if asq == nil {
		return nil
	}
	return &AccountSnapshotQuery{
		config:      asq.config,
		ctx:         asq.ctx.Clone(),
		order:       append([]accountsnapshot.OrderOption{}, asq.order...),
		inters:      append([]Interceptor{}, asq.inters...),
		predicates:  append([]predicate.AccountSnapshot{}, asq.predicates...),
		withAccount: asq.withAccount.Clone(),
		// clone intermediate query.
		sql:  asq.sql.Clone(),
		path: asq.path,
	}
}

// WithAccount tells the query-builder to eager-load the nodes that are connected to
// the "account" edge. The optional arguments are used to configure the query builder of the edge.
func (asq *AccountSnapshotQuery) WithAccount(opts ...func(*AccountQuery)) *AccountSnapshotQuery {
	query := (&AccountClient{config: asq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	asq.withAccount = query
	return asq
}

// GroupBy is used to group vertices by one or more fields/columns.
// It is often used with aggregate functions, like: count, max, mean, min, sum.
//
// Example:
//
//	var v []struct {
//		Datehour time.Time `json:"datehour,omitempty"`
//		Count int `json:"count,omitempty"`
//	}
//
//	client.AccountSnapshot.Query().
//		GroupBy(accountsnapshot.FieldDatehour).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
func (asq *AccountSnapshotQuery) GroupBy(field string, fields ...string) *AccountSnapshotGroupBy {
	asq.ctx.Fields = append([]string{field}, fields...)
	grbuild := &AccountSnapshotGroupBy{build: asq}
	grbuild.flds = &asq.ctx.Fields
	grbuild.label = accountsnapshot.Label
	grbuild.scan = grbuild.Scan
	return grbuild
}

// Select allows the selection one or more fields/columns for the given query,
// instead of selecting all fields in the entity.
//
// Example:
//
//	var v []struct {
//		Datehour time.Time `json:"datehour,omitempty"`
//	}
//
//	client.AccountSnapshot.Query().
//		Select(accountsnapshot.FieldDatehour).
//		Scan(ctx, &v)
func (asq *AccountSnapshotQuery) Select(fields ...string) *AccountSnapshotSelect {
	asq.ctx.Fields = append(asq.ctx.Fields, fields...)
	sbuild := &AccountSnapshotSelect{AccountSnapshotQuery: asq}
	sbuild.label = accountsnapshot.Label
	sbuild.flds, sbuild.scan = &asq.ctx.Fields, sbuild.Scan
	return sbuild
}

// Aggregate returns a AccountSnapshotSelect configured with the given aggregations.
func (asq *AccountSnapshotQuery) Aggregate(fns ...AggregateFunc) *AccountSnapshotSelect {
	return asq.Select().Aggregate(fns...)
}

func (asq *AccountSnapshotQuery) prepareQuery(ctx context.Context) error {
	for _, inter := range asq.inters {
		if inter == nil {
			return fmt.Errorf("ent: uninitialized interceptor (forgotten import ent/runtime?)")
		}
		if trv, ok := inter.(Traverser); ok {
			if err := trv.Traverse(ctx, asq); err != nil {
				return err
			}
		}
	}
	for _, f := range asq.ctx.Fields {
		if !accountsnapshot.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
		}
	}
	if asq.path != nil {
		prev, err := asq.path(ctx)
		if err != nil {
			return err
		}
		asq.sql = prev
	}
	return nil
}

func (asq *AccountSnapshotQuery) sqlAll(ctx context.Context, hooks ...queryHook) ([]*AccountSnapshot, error) {
	var (
		nodes       = []*AccountSnapshot{}
		_spec       = asq.querySpec()
		loadedTypes = [1]bool{
			asq.withAccount != nil,
		}
	)
	_spec.ScanValues = func(columns []string) ([]any, error) {
		return (*AccountSnapshot).scanValues(nil, columns)
	}
	_spec.Assign = func(columns []string, values []any) error {
		node := &AccountSnapshot{config: asq.config}
		nodes = append(nodes, node)
		node.Edges.loadedTypes = loadedTypes
		return node.assignValues(columns, values)
	}
	for i := range hooks {
		hooks[i](ctx, _spec)
	}
	if err := sqlgraph.QueryNodes(ctx, asq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}
	if query := asq.withAccount; query != nil {
		if err := asq.loadAccount(ctx, query, nodes,
			func(n *AccountSnapshot) { n.Edges.Account = []*Account{} },
			func(n *AccountSnapshot, e *Account) { n.Edges.Account = append(n.Edges.Account, e) }); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

func (asq *AccountSnapshotQuery) loadAccount(ctx context.Context, query *AccountQuery, nodes []*AccountSnapshot, init func(*AccountSnapshot), assign func(*AccountSnapshot, *Account)) error {
	edgeIDs := make([]driver.Value, len(nodes))
	byID := make(map[int]*AccountSnapshot)
	nids := make(map[int]map[*AccountSnapshot]struct{})
	for i, node := range nodes {
		edgeIDs[i] = node.ID
		byID[node.ID] = node
		if init != nil {
			init(node)
		}
	}
	query.Where(func(s *sql.Selector) {
		joinT := sql.Table(accountsnapshot.AccountTable)
		s.Join(joinT).On(s.C(account.FieldID), joinT.C(accountsnapshot.AccountPrimaryKey[0]))
		s.Where(sql.InValues(joinT.C(accountsnapshot.AccountPrimaryKey[1]), edgeIDs...))
		columns := s.SelectedColumns()
		s.Select(joinT.C(accountsnapshot.AccountPrimaryKey[1]))
		s.AppendSelect(columns...)
		s.SetDistinct(false)
	})
	if err := query.prepareQuery(ctx); err != nil {
		return err
	}
	qr := QuerierFunc(func(ctx context.Context, q Query) (Value, error) {
		return query.sqlAll(ctx, func(_ context.Context, spec *sqlgraph.QuerySpec) {
			assign := spec.Assign
			values := spec.ScanValues
			spec.ScanValues = func(columns []string) ([]any, error) {
				values, err := values(columns[1:])
				if err != nil {
					return nil, err
				}
				return append([]any{new(sql.NullInt64)}, values...), nil
			}
			spec.Assign = func(columns []string, values []any) error {
				outValue := int(values[0].(*sql.NullInt64).Int64)
				inValue := int(values[1].(*sql.NullInt64).Int64)
				if nids[inValue] == nil {
					nids[inValue] = map[*AccountSnapshot]struct{}{byID[outValue]: {}}
					return assign(columns[1:], values[1:])
				}
				nids[inValue][byID[outValue]] = struct{}{}
				return nil
			}
		})
	})
	neighbors, err := withInterceptors[[]*Account](ctx, query, qr, query.inters)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		nodes, ok := nids[n.ID]
		if !ok {
			return fmt.Errorf(`unexpected "account" node returned %v`, n.ID)
		}
		for kn := range nodes {
			assign(kn, n)
		}
	}
	return nil
}

func (asq *AccountSnapshotQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := asq.querySpec()
	_spec.Node.Columns = asq.ctx.Fields
	if len(asq.ctx.Fields) > 0 {
		_spec.Unique = asq.ctx.Unique != nil && *asq.ctx.Unique
	}
	return sqlgraph.CountNodes(ctx, asq.driver, _spec)
}

func (asq *AccountSnapshotQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := sqlgraph.NewQuerySpec(accountsnapshot.Table, accountsnapshot.Columns, sqlgraph.NewFieldSpec(accountsnapshot.FieldID, field.TypeInt))
	_spec.From = asq.sql
	if unique := asq.ctx.Unique; unique != nil {
		_spec.Unique = *unique
	} else if asq.path != nil {
		_spec.Unique = true
	}
	if fields := asq.ctx.Fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, accountsnapshot.FieldID)
		for i := range fields {
			if fields[i] != accountsnapshot.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, fields[i])
			}
		}
	}
	if ps := asq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := asq.ctx.Limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := asq.ctx.Offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := asq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}

func (asq *AccountSnapshotQuery) sqlQuery(ctx context.Context) *sql.Selector {
	builder := sql.Dialect(asq.driver.Dialect())
	t1 := builder.Table(accountsnapshot.Table)
	columns := asq.ctx.Fields
	if len(columns) == 0 {
		columns = accountsnapshot.Columns
	}
	selector := builder.Select(t1.Columns(columns...)...).From(t1)
	if asq.sql != nil {
		selector = asq.sql
		selector.Select(selector.Columns(columns...)...)
	}
	if asq.ctx.Unique != nil && *asq.ctx.Unique {
		selector.Distinct()
	}
	for _, p := range asq.predicates {
		p(selector)
	}
	for _, p := range asq.order {
		p(selector)
	}
	if offset := asq.ctx.Offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := asq.ctx.Limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// AccountSnapshotGroupBy is the group-by builder for AccountSnapshot entities.
type AccountSnapshotGroupBy struct {
	selector
	build *AccountSnapshotQuery
}

// Aggregate adds the given aggregation functions to the group-by query.
func (asgb *AccountSnapshotGroupBy) Aggregate(fns ...AggregateFunc) *AccountSnapshotGroupBy {
	asgb.fns = append(asgb.fns, fns...)
	return asgb
}

// Scan applies the selector query and scans the result into the given value.
func (asgb *AccountSnapshotGroupBy) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, asgb.build.ctx, ent.OpQueryGroupBy)
	if err := asgb.build.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*AccountSnapshotQuery, *AccountSnapshotGroupBy](ctx, asgb.build, asgb, asgb.build.inters, v)
}

func (asgb *AccountSnapshotGroupBy) sqlScan(ctx context.Context, root *AccountSnapshotQuery, v any) error {
	selector := root.sqlQuery(ctx).Select()
	aggregation := make([]string, 0, len(asgb.fns))
	for _, fn := range asgb.fns {
		aggregation = append(aggregation, fn(selector))
	}
	if len(selector.SelectedColumns()) == 0 {
		columns := make([]string, 0, len(*asgb.flds)+len(asgb.fns))
		for _, f := range *asgb.flds {
			columns = append(columns, selector.C(f))
		}
		columns = append(columns, aggregation...)
		selector.Select(columns...)
	}
	selector.GroupBy(selector.Columns(*asgb.flds...)...)
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := asgb.build.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

// AccountSnapshotSelect is the builder for selecting fields of AccountSnapshot entities.
type AccountSnapshotSelect struct {
	*AccountSnapshotQuery
	selector
}

// Aggregate adds the given aggregation functions to the selector query.
func (ass *AccountSnapshotSelect) Aggregate(fns ...AggregateFunc) *AccountSnapshotSelect {
	ass.fns = append(ass.fns, fns...)
	return ass
}

// Scan applies the selector query and scans the result into the given value.
func (ass *AccountSnapshotSelect) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, ass.ctx, ent.OpQuerySelect)
	if err := ass.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*AccountSnapshotQuery, *AccountSnapshotSelect](ctx, ass.AccountSnapshotQuery, ass, ass.inters, v)
}

func (ass *AccountSnapshotSelect) sqlScan(ctx context.Context, root *AccountSnapshotQuery, v any) error {
	selector := root.sqlQuery(ctx)
	aggregation := make([]string, 0, len(ass.fns))
	for _, fn := range ass.fns {
		aggregation = append(aggregation, fn(selector))
	}
	switch n := len(*ass.selector.flds); {
	case n == 0 && len(aggregation) > 0:
		selector.Select(aggregation...)
	case n != 0 && len(aggregation) > 0:
		selector.AppendSelect(aggregation...)
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := ass.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}
