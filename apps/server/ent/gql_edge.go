// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"

	"github.com/99designs/gqlgen/graphql"
)

func (a *Account) Profile(ctx context.Context) (*Profile, error) {
	result, err := a.Edges.ProfileOrErr()
	if IsNotLoaded(err) {
		result, err = a.QueryProfile().Only(ctx)
	}
	return result, err
}

func (a *Account) TransactionEntry(ctx context.Context) (result []*TransactionEntry, err error) {
	if fc := graphql.GetFieldContext(ctx); fc != nil && fc.Field.Alias != "" {
		result, err = a.NamedTransactionEntry(graphql.GetFieldContext(ctx).Field.Alias)
	} else {
		result, err = a.Edges.TransactionEntryOrErr()
	}
	if IsNotLoaded(err) {
		result, err = a.QueryTransactionEntry().All(ctx)
	}
	return result, err
}

func (pr *Profile) User(ctx context.Context) (*User, error) {
	result, err := pr.Edges.UserOrErr()
	if IsNotLoaded(err) {
		result, err = pr.QueryUser().Only(ctx)
	}
	return result, err
}

func (pr *Profile) Account(ctx context.Context) (result []*Account, err error) {
	if fc := graphql.GetFieldContext(ctx); fc != nil && fc.Field.Alias != "" {
		result, err = pr.NamedAccount(graphql.GetFieldContext(ctx).Field.Alias)
	} else {
		result, err = pr.Edges.AccountOrErr()
	}
	if IsNotLoaded(err) {
		result, err = pr.QueryAccount().All(ctx)
	}
	return result, err
}

func (pr *Profile) Transaction(ctx context.Context) (result []*Transaction, err error) {
	if fc := graphql.GetFieldContext(ctx); fc != nil && fc.Field.Alias != "" {
		result, err = pr.NamedTransaction(graphql.GetFieldContext(ctx).Field.Alias)
	} else {
		result, err = pr.Edges.TransactionOrErr()
	}
	if IsNotLoaded(err) {
		result, err = pr.QueryTransaction().All(ctx)
	}
	return result, err
}

func (t *Transaction) Profile(ctx context.Context) (*Profile, error) {
	result, err := t.Edges.ProfileOrErr()
	if IsNotLoaded(err) {
		result, err = t.QueryProfile().Only(ctx)
	}
	return result, err
}

func (t *Transaction) TransactionEntries(ctx context.Context) (result []*TransactionEntry, err error) {
	if fc := graphql.GetFieldContext(ctx); fc != nil && fc.Field.Alias != "" {
		result, err = t.NamedTransactionEntries(graphql.GetFieldContext(ctx).Field.Alias)
	} else {
		result, err = t.Edges.TransactionEntriesOrErr()
	}
	if IsNotLoaded(err) {
		result, err = t.QueryTransactionEntries().All(ctx)
	}
	return result, err
}

func (te *TransactionEntry) Account(ctx context.Context) (*Account, error) {
	result, err := te.Edges.AccountOrErr()
	if IsNotLoaded(err) {
		result, err = te.QueryAccount().Only(ctx)
	}
	return result, err
}

func (te *TransactionEntry) Transaction(ctx context.Context) (*Transaction, error) {
	result, err := te.Edges.TransactionOrErr()
	if IsNotLoaded(err) {
		result, err = te.QueryTransaction().Only(ctx)
	}
	return result, err
}

func (u *User) UserKey(ctx context.Context) (result []*UserKey, err error) {
	if fc := graphql.GetFieldContext(ctx); fc != nil && fc.Field.Alias != "" {
		result, err = u.NamedUserKey(graphql.GetFieldContext(ctx).Field.Alias)
	} else {
		result, err = u.Edges.UserKeyOrErr()
	}
	if IsNotLoaded(err) {
		result, err = u.QueryUserKey().All(ctx)
	}
	return result, err
}

func (u *User) Profile(ctx context.Context) (result []*Profile, err error) {
	if fc := graphql.GetFieldContext(ctx); fc != nil && fc.Field.Alias != "" {
		result, err = u.NamedProfile(graphql.GetFieldContext(ctx).Field.Alias)
	} else {
		result, err = u.Edges.ProfileOrErr()
	}
	if IsNotLoaded(err) {
		result, err = u.QueryProfile().All(ctx)
	}
	return result, err
}

func (uk *UserKey) User(ctx context.Context) (*User, error) {
	result, err := uk.Edges.UserOrErr()
	if IsNotLoaded(err) {
		result, err = uk.QueryUser().Only(ctx)
	}
	return result, err
}
