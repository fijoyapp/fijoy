// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"fijoy/ent/account"
	"fijoy/ent/profile"
	"fijoy/ent/transaction"
	"fijoy/ent/user"
	"fijoy/ent/userkey"
	"fmt"

	"entgo.io/contrib/entgql"
	"github.com/99designs/gqlgen/graphql"
	"github.com/hashicorp/go-multierror"
)

// Noder wraps the basic Node method.
type Noder interface {
	IsNode()
}

var accountImplementors = []string{"Account", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*Account) IsNode() {}

var profileImplementors = []string{"Profile", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*Profile) IsNode() {}

var transactionImplementors = []string{"Transaction", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*Transaction) IsNode() {}

var userImplementors = []string{"User", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*User) IsNode() {}

var userkeyImplementors = []string{"UserKey", "Node"}

// IsNode implements the Node interface check for GQLGen.
func (*UserKey) IsNode() {}

var errNodeInvalidID = &NotFoundError{"node"}

// NodeOption allows configuring the Noder execution using functional options.
type NodeOption func(*nodeOptions)

// WithNodeType sets the node Type resolver function (i.e. the table to query).
// If was not provided, the table will be derived from the universal-id
// configuration as described in: https://entgo.io/docs/migrate/#universal-ids.
func WithNodeType(f func(context.Context, string) (string, error)) NodeOption {
	return func(o *nodeOptions) {
		o.nodeType = f
	}
}

// WithFixedNodeType sets the Type of the node to a fixed value.
func WithFixedNodeType(t string) NodeOption {
	return WithNodeType(func(context.Context, string) (string, error) {
		return t, nil
	})
}

type nodeOptions struct {
	nodeType func(context.Context, string) (string, error)
}

func (c *Client) newNodeOpts(opts []NodeOption) *nodeOptions {
	nopts := &nodeOptions{}
	for _, opt := range opts {
		opt(nopts)
	}
	if nopts.nodeType == nil {
		nopts.nodeType = func(ctx context.Context, id string) (string, error) {
			return "", fmt.Errorf("cannot resolve noder (%v) without its type", id)
		}
	}
	return nopts
}

// Noder returns a Node by its id. If the NodeType was not provided, it will
// be derived from the id value according to the universal-id configuration.
//
//	c.Noder(ctx, id)
//	c.Noder(ctx, id, ent.WithNodeType(typeResolver))
func (c *Client) Noder(ctx context.Context, id string, opts ...NodeOption) (_ Noder, err error) {
	defer func() {
		if IsNotFound(err) {
			err = multierror.Append(err, entgql.ErrNodeNotFound(id))
		}
	}()
	table, err := c.newNodeOpts(opts).nodeType(ctx, id)
	if err != nil {
		return nil, err
	}
	return c.noder(ctx, table, id)
}

func (c *Client) noder(ctx context.Context, table string, id string) (Noder, error) {
	switch table {
	case account.Table:
		query := c.Account.Query().
			Where(account.ID(id))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, accountImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case profile.Table:
		query := c.Profile.Query().
			Where(profile.ID(id))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, profileImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case transaction.Table:
		query := c.Transaction.Query().
			Where(transaction.ID(id))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, transactionImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case user.Table:
		query := c.User.Query().
			Where(user.ID(id))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, userImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	case userkey.Table:
		query := c.UserKey.Query().
			Where(userkey.ID(id))
		if fc := graphql.GetFieldContext(ctx); fc != nil {
			if err := query.collectField(ctx, true, graphql.GetOperationContext(ctx), fc.Field, nil, userkeyImplementors...); err != nil {
				return nil, err
			}
		}
		return query.Only(ctx)
	default:
		return nil, fmt.Errorf("cannot resolve noder from table %q: %w", table, errNodeInvalidID)
	}
}

func (c *Client) Noders(ctx context.Context, ids []string, opts ...NodeOption) ([]Noder, error) {
	switch len(ids) {
	case 1:
		noder, err := c.Noder(ctx, ids[0], opts...)
		if err != nil {
			return nil, err
		}
		return []Noder{noder}, nil
	case 0:
		return []Noder{}, nil
	}

	noders := make([]Noder, len(ids))
	errors := make([]error, len(ids))
	tables := make(map[string][]string)
	id2idx := make(map[string][]int, len(ids))
	nopts := c.newNodeOpts(opts)
	for i, id := range ids {
		table, err := nopts.nodeType(ctx, id)
		if err != nil {
			errors[i] = err
			continue
		}
		tables[table] = append(tables[table], id)
		id2idx[id] = append(id2idx[id], i)
	}

	for table, ids := range tables {
		nodes, err := c.noders(ctx, table, ids)
		if err != nil {
			for _, id := range ids {
				for _, idx := range id2idx[id] {
					errors[idx] = err
				}
			}
		} else {
			for i, id := range ids {
				for _, idx := range id2idx[id] {
					noders[idx] = nodes[i]
				}
			}
		}
	}

	for i, id := range ids {
		if errors[i] == nil {
			if noders[i] != nil {
				continue
			}
			errors[i] = entgql.ErrNodeNotFound(id)
		} else if IsNotFound(errors[i]) {
			errors[i] = multierror.Append(errors[i], entgql.ErrNodeNotFound(id))
		}
		ctx := graphql.WithPathContext(ctx,
			graphql.NewPathWithIndex(i),
		)
		graphql.AddError(ctx, errors[i])
	}
	return noders, nil
}

func (c *Client) noders(ctx context.Context, table string, ids []string) ([]Noder, error) {
	noders := make([]Noder, len(ids))
	idmap := make(map[string][]*Noder, len(ids))
	for i, id := range ids {
		idmap[id] = append(idmap[id], &noders[i])
	}
	switch table {
	case account.Table:
		query := c.Account.Query().
			Where(account.IDIn(ids...))
		query, err := query.CollectFields(ctx, accountImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case profile.Table:
		query := c.Profile.Query().
			Where(profile.IDIn(ids...))
		query, err := query.CollectFields(ctx, profileImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case transaction.Table:
		query := c.Transaction.Query().
			Where(transaction.IDIn(ids...))
		query, err := query.CollectFields(ctx, transactionImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case user.Table:
		query := c.User.Query().
			Where(user.IDIn(ids...))
		query, err := query.CollectFields(ctx, userImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case userkey.Table:
		query := c.UserKey.Query().
			Where(userkey.IDIn(ids...))
		query, err := query.CollectFields(ctx, userkeyImplementors...)
		if err != nil {
			return nil, err
		}
		nodes, err := query.All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	default:
		return nil, fmt.Errorf("cannot resolve noders from table %q: %w", table, errNodeInvalidID)
	}
	return noders, nil
}
