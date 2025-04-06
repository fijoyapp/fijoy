// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"fijoy/ent/account"
	"fijoy/ent/profile"
	"fijoy/ent/transaction"
	"fijoy/ent/user"
	"fijoy/ent/userkey"

	"github.com/99designs/gqlgen/graphql"
)

// CollectFields tells the query-builder to eagerly load connected nodes by resolver context.
func (aq *AccountQuery) CollectFields(ctx context.Context, satisfies ...string) (*AccountQuery, error) {
	fc := graphql.GetFieldContext(ctx)
	if fc == nil {
		return aq, nil
	}
	if err := aq.collectField(ctx, false, graphql.GetOperationContext(ctx), fc.Field, nil, satisfies...); err != nil {
		return nil, err
	}
	return aq, nil
}

func (aq *AccountQuery) collectField(ctx context.Context, oneNode bool, opCtx *graphql.OperationContext, collected graphql.CollectedField, path []string, satisfies ...string) error {
	path = append([]string(nil), path...)
	var (
		unknownSeen    bool
		fieldSeen      = make(map[string]struct{}, len(account.Columns))
		selectedFields = []string{account.FieldID}
	)
	for _, field := range graphql.CollectFields(opCtx, collected.Selections, satisfies) {
		switch field.Name {

		case "profile":
			var (
				alias = field.Alias
				path  = append(path, alias)
				query = (&ProfileClient{config: aq.config}).Query()
			)
			if err := query.collectField(ctx, oneNode, opCtx, field, path, mayAddCondition(satisfies, profileImplementors)...); err != nil {
				return err
			}
			aq.withProfile = query

		case "transaction":
			var (
				alias = field.Alias
				path  = append(path, alias)
				query = (&TransactionClient{config: aq.config}).Query()
			)
			if err := query.collectField(ctx, false, opCtx, field, path, mayAddCondition(satisfies, transactionImplementors)...); err != nil {
				return err
			}
			aq.WithNamedTransaction(alias, func(wq *TransactionQuery) {
				*wq = *query
			})
		case "name":
			if _, ok := fieldSeen[account.FieldName]; !ok {
				selectedFields = append(selectedFields, account.FieldName)
				fieldSeen[account.FieldName] = struct{}{}
			}
		case "accountType":
			if _, ok := fieldSeen[account.FieldAccountType]; !ok {
				selectedFields = append(selectedFields, account.FieldAccountType)
				fieldSeen[account.FieldAccountType] = struct{}{}
			}
		case "symbol":
			if _, ok := fieldSeen[account.FieldSymbol]; !ok {
				selectedFields = append(selectedFields, account.FieldSymbol)
				fieldSeen[account.FieldSymbol] = struct{}{}
			}
		case "symbolType":
			if _, ok := fieldSeen[account.FieldSymbolType]; !ok {
				selectedFields = append(selectedFields, account.FieldSymbolType)
				fieldSeen[account.FieldSymbolType] = struct{}{}
			}
		case "amount":
			if _, ok := fieldSeen[account.FieldAmount]; !ok {
				selectedFields = append(selectedFields, account.FieldAmount)
				fieldSeen[account.FieldAmount] = struct{}{}
			}
		case "value":
			if _, ok := fieldSeen[account.FieldValue]; !ok {
				selectedFields = append(selectedFields, account.FieldValue)
				fieldSeen[account.FieldValue] = struct{}{}
			}
		case "fxRate":
			if _, ok := fieldSeen[account.FieldFxRate]; !ok {
				selectedFields = append(selectedFields, account.FieldFxRate)
				fieldSeen[account.FieldFxRate] = struct{}{}
			}
		case "balance":
			if _, ok := fieldSeen[account.FieldBalance]; !ok {
				selectedFields = append(selectedFields, account.FieldBalance)
				fieldSeen[account.FieldBalance] = struct{}{}
			}
		case "archived":
			if _, ok := fieldSeen[account.FieldArchived]; !ok {
				selectedFields = append(selectedFields, account.FieldArchived)
				fieldSeen[account.FieldArchived] = struct{}{}
			}
		case "createdAt":
			if _, ok := fieldSeen[account.FieldCreatedAt]; !ok {
				selectedFields = append(selectedFields, account.FieldCreatedAt)
				fieldSeen[account.FieldCreatedAt] = struct{}{}
			}
		case "updatedAt":
			if _, ok := fieldSeen[account.FieldUpdatedAt]; !ok {
				selectedFields = append(selectedFields, account.FieldUpdatedAt)
				fieldSeen[account.FieldUpdatedAt] = struct{}{}
			}
		case "id":
		case "__typename":
		default:
			unknownSeen = true
		}
	}
	if !unknownSeen {
		aq.Select(selectedFields...)
	}
	return nil
}

type accountPaginateArgs struct {
	first, last   *int
	after, before *Cursor
	opts          []AccountPaginateOption
}

func newAccountPaginateArgs(rv map[string]any) *accountPaginateArgs {
	args := &accountPaginateArgs{}
	if rv == nil {
		return args
	}
	if v := rv[firstField]; v != nil {
		args.first = v.(*int)
	}
	if v := rv[lastField]; v != nil {
		args.last = v.(*int)
	}
	if v := rv[afterField]; v != nil {
		args.after = v.(*Cursor)
	}
	if v := rv[beforeField]; v != nil {
		args.before = v.(*Cursor)
	}
	return args
}

// CollectFields tells the query-builder to eagerly load connected nodes by resolver context.
func (pq *ProfileQuery) CollectFields(ctx context.Context, satisfies ...string) (*ProfileQuery, error) {
	fc := graphql.GetFieldContext(ctx)
	if fc == nil {
		return pq, nil
	}
	if err := pq.collectField(ctx, false, graphql.GetOperationContext(ctx), fc.Field, nil, satisfies...); err != nil {
		return nil, err
	}
	return pq, nil
}

func (pq *ProfileQuery) collectField(ctx context.Context, oneNode bool, opCtx *graphql.OperationContext, collected graphql.CollectedField, path []string, satisfies ...string) error {
	path = append([]string(nil), path...)
	var (
		unknownSeen    bool
		fieldSeen      = make(map[string]struct{}, len(profile.Columns))
		selectedFields = []string{profile.FieldID}
	)
	for _, field := range graphql.CollectFields(opCtx, collected.Selections, satisfies) {
		switch field.Name {

		case "user":
			var (
				alias = field.Alias
				path  = append(path, alias)
				query = (&UserClient{config: pq.config}).Query()
			)
			if err := query.collectField(ctx, oneNode, opCtx, field, path, mayAddCondition(satisfies, userImplementors)...); err != nil {
				return err
			}
			pq.withUser = query

		case "account":
			var (
				alias = field.Alias
				path  = append(path, alias)
				query = (&AccountClient{config: pq.config}).Query()
			)
			if err := query.collectField(ctx, false, opCtx, field, path, mayAddCondition(satisfies, accountImplementors)...); err != nil {
				return err
			}
			pq.WithNamedAccount(alias, func(wq *AccountQuery) {
				*wq = *query
			})

		case "transaction":
			var (
				alias = field.Alias
				path  = append(path, alias)
				query = (&TransactionClient{config: pq.config}).Query()
			)
			if err := query.collectField(ctx, false, opCtx, field, path, mayAddCondition(satisfies, transactionImplementors)...); err != nil {
				return err
			}
			pq.WithNamedTransaction(alias, func(wq *TransactionQuery) {
				*wq = *query
			})
		case "locale":
			if _, ok := fieldSeen[profile.FieldLocale]; !ok {
				selectedFields = append(selectedFields, profile.FieldLocale)
				fieldSeen[profile.FieldLocale] = struct{}{}
			}
		case "currencies":
			if _, ok := fieldSeen[profile.FieldCurrencies]; !ok {
				selectedFields = append(selectedFields, profile.FieldCurrencies)
				fieldSeen[profile.FieldCurrencies] = struct{}{}
			}
		case "netWorthGoal":
			if _, ok := fieldSeen[profile.FieldNetWorthGoal]; !ok {
				selectedFields = append(selectedFields, profile.FieldNetWorthGoal)
				fieldSeen[profile.FieldNetWorthGoal] = struct{}{}
			}
		case "createdAt":
			if _, ok := fieldSeen[profile.FieldCreatedAt]; !ok {
				selectedFields = append(selectedFields, profile.FieldCreatedAt)
				fieldSeen[profile.FieldCreatedAt] = struct{}{}
			}
		case "updatedAt":
			if _, ok := fieldSeen[profile.FieldUpdatedAt]; !ok {
				selectedFields = append(selectedFields, profile.FieldUpdatedAt)
				fieldSeen[profile.FieldUpdatedAt] = struct{}{}
			}
		case "id":
		case "__typename":
		default:
			unknownSeen = true
		}
	}
	if !unknownSeen {
		pq.Select(selectedFields...)
	}
	return nil
}

type profilePaginateArgs struct {
	first, last   *int
	after, before *Cursor
	opts          []ProfilePaginateOption
}

func newProfilePaginateArgs(rv map[string]any) *profilePaginateArgs {
	args := &profilePaginateArgs{}
	if rv == nil {
		return args
	}
	if v := rv[firstField]; v != nil {
		args.first = v.(*int)
	}
	if v := rv[lastField]; v != nil {
		args.last = v.(*int)
	}
	if v := rv[afterField]; v != nil {
		args.after = v.(*Cursor)
	}
	if v := rv[beforeField]; v != nil {
		args.before = v.(*Cursor)
	}
	return args
}

// CollectFields tells the query-builder to eagerly load connected nodes by resolver context.
func (tq *TransactionQuery) CollectFields(ctx context.Context, satisfies ...string) (*TransactionQuery, error) {
	fc := graphql.GetFieldContext(ctx)
	if fc == nil {
		return tq, nil
	}
	if err := tq.collectField(ctx, false, graphql.GetOperationContext(ctx), fc.Field, nil, satisfies...); err != nil {
		return nil, err
	}
	return tq, nil
}

func (tq *TransactionQuery) collectField(ctx context.Context, oneNode bool, opCtx *graphql.OperationContext, collected graphql.CollectedField, path []string, satisfies ...string) error {
	path = append([]string(nil), path...)
	var (
		unknownSeen    bool
		fieldSeen      = make(map[string]struct{}, len(transaction.Columns))
		selectedFields = []string{transaction.FieldID}
	)
	for _, field := range graphql.CollectFields(opCtx, collected.Selections, satisfies) {
		switch field.Name {

		case "profile":
			var (
				alias = field.Alias
				path  = append(path, alias)
				query = (&ProfileClient{config: tq.config}).Query()
			)
			if err := query.collectField(ctx, oneNode, opCtx, field, path, mayAddCondition(satisfies, profileImplementors)...); err != nil {
				return err
			}
			tq.withProfile = query

		case "account":
			var (
				alias = field.Alias
				path  = append(path, alias)
				query = (&AccountClient{config: tq.config}).Query()
			)
			if err := query.collectField(ctx, oneNode, opCtx, field, path, mayAddCondition(satisfies, accountImplementors)...); err != nil {
				return err
			}
			tq.withAccount = query
		case "amount":
			if _, ok := fieldSeen[transaction.FieldAmount]; !ok {
				selectedFields = append(selectedFields, transaction.FieldAmount)
				fieldSeen[transaction.FieldAmount] = struct{}{}
			}
		case "note":
			if _, ok := fieldSeen[transaction.FieldNote]; !ok {
				selectedFields = append(selectedFields, transaction.FieldNote)
				fieldSeen[transaction.FieldNote] = struct{}{}
			}
		case "datetime":
			if _, ok := fieldSeen[transaction.FieldDatetime]; !ok {
				selectedFields = append(selectedFields, transaction.FieldDatetime)
				fieldSeen[transaction.FieldDatetime] = struct{}{}
			}
		case "createdAt":
			if _, ok := fieldSeen[transaction.FieldCreatedAt]; !ok {
				selectedFields = append(selectedFields, transaction.FieldCreatedAt)
				fieldSeen[transaction.FieldCreatedAt] = struct{}{}
			}
		case "updatedAt":
			if _, ok := fieldSeen[transaction.FieldUpdatedAt]; !ok {
				selectedFields = append(selectedFields, transaction.FieldUpdatedAt)
				fieldSeen[transaction.FieldUpdatedAt] = struct{}{}
			}
		case "id":
		case "__typename":
		default:
			unknownSeen = true
		}
	}
	if !unknownSeen {
		tq.Select(selectedFields...)
	}
	return nil
}

type transactionPaginateArgs struct {
	first, last   *int
	after, before *Cursor
	opts          []TransactionPaginateOption
}

func newTransactionPaginateArgs(rv map[string]any) *transactionPaginateArgs {
	args := &transactionPaginateArgs{}
	if rv == nil {
		return args
	}
	if v := rv[firstField]; v != nil {
		args.first = v.(*int)
	}
	if v := rv[lastField]; v != nil {
		args.last = v.(*int)
	}
	if v := rv[afterField]; v != nil {
		args.after = v.(*Cursor)
	}
	if v := rv[beforeField]; v != nil {
		args.before = v.(*Cursor)
	}
	return args
}

// CollectFields tells the query-builder to eagerly load connected nodes by resolver context.
func (uq *UserQuery) CollectFields(ctx context.Context, satisfies ...string) (*UserQuery, error) {
	fc := graphql.GetFieldContext(ctx)
	if fc == nil {
		return uq, nil
	}
	if err := uq.collectField(ctx, false, graphql.GetOperationContext(ctx), fc.Field, nil, satisfies...); err != nil {
		return nil, err
	}
	return uq, nil
}

func (uq *UserQuery) collectField(ctx context.Context, oneNode bool, opCtx *graphql.OperationContext, collected graphql.CollectedField, path []string, satisfies ...string) error {
	path = append([]string(nil), path...)
	var (
		unknownSeen    bool
		fieldSeen      = make(map[string]struct{}, len(user.Columns))
		selectedFields = []string{user.FieldID}
	)
	for _, field := range graphql.CollectFields(opCtx, collected.Selections, satisfies) {
		switch field.Name {

		case "userKey":
			var (
				alias = field.Alias
				path  = append(path, alias)
				query = (&UserKeyClient{config: uq.config}).Query()
			)
			if err := query.collectField(ctx, false, opCtx, field, path, mayAddCondition(satisfies, userkeyImplementors)...); err != nil {
				return err
			}
			uq.WithNamedUserKey(alias, func(wq *UserKeyQuery) {
				*wq = *query
			})

		case "profile":
			var (
				alias = field.Alias
				path  = append(path, alias)
				query = (&ProfileClient{config: uq.config}).Query()
			)
			if err := query.collectField(ctx, false, opCtx, field, path, mayAddCondition(satisfies, profileImplementors)...); err != nil {
				return err
			}
			uq.WithNamedProfile(alias, func(wq *ProfileQuery) {
				*wq = *query
			})
		case "email":
			if _, ok := fieldSeen[user.FieldEmail]; !ok {
				selectedFields = append(selectedFields, user.FieldEmail)
				fieldSeen[user.FieldEmail] = struct{}{}
			}
		case "createdAt":
			if _, ok := fieldSeen[user.FieldCreatedAt]; !ok {
				selectedFields = append(selectedFields, user.FieldCreatedAt)
				fieldSeen[user.FieldCreatedAt] = struct{}{}
			}
		case "updatedAt":
			if _, ok := fieldSeen[user.FieldUpdatedAt]; !ok {
				selectedFields = append(selectedFields, user.FieldUpdatedAt)
				fieldSeen[user.FieldUpdatedAt] = struct{}{}
			}
		case "id":
		case "__typename":
		default:
			unknownSeen = true
		}
	}
	if !unknownSeen {
		uq.Select(selectedFields...)
	}
	return nil
}

type userPaginateArgs struct {
	first, last   *int
	after, before *Cursor
	opts          []UserPaginateOption
}

func newUserPaginateArgs(rv map[string]any) *userPaginateArgs {
	args := &userPaginateArgs{}
	if rv == nil {
		return args
	}
	if v := rv[firstField]; v != nil {
		args.first = v.(*int)
	}
	if v := rv[lastField]; v != nil {
		args.last = v.(*int)
	}
	if v := rv[afterField]; v != nil {
		args.after = v.(*Cursor)
	}
	if v := rv[beforeField]; v != nil {
		args.before = v.(*Cursor)
	}
	return args
}

// CollectFields tells the query-builder to eagerly load connected nodes by resolver context.
func (ukq *UserKeyQuery) CollectFields(ctx context.Context, satisfies ...string) (*UserKeyQuery, error) {
	fc := graphql.GetFieldContext(ctx)
	if fc == nil {
		return ukq, nil
	}
	if err := ukq.collectField(ctx, false, graphql.GetOperationContext(ctx), fc.Field, nil, satisfies...); err != nil {
		return nil, err
	}
	return ukq, nil
}

func (ukq *UserKeyQuery) collectField(ctx context.Context, oneNode bool, opCtx *graphql.OperationContext, collected graphql.CollectedField, path []string, satisfies ...string) error {
	path = append([]string(nil), path...)
	var (
		unknownSeen    bool
		fieldSeen      = make(map[string]struct{}, len(userkey.Columns))
		selectedFields = []string{userkey.FieldID}
	)
	for _, field := range graphql.CollectFields(opCtx, collected.Selections, satisfies) {
		switch field.Name {

		case "user":
			var (
				alias = field.Alias
				path  = append(path, alias)
				query = (&UserClient{config: ukq.config}).Query()
			)
			if err := query.collectField(ctx, oneNode, opCtx, field, path, mayAddCondition(satisfies, userImplementors)...); err != nil {
				return err
			}
			ukq.withUser = query
		case "hashedPassword":
			if _, ok := fieldSeen[userkey.FieldHashedPassword]; !ok {
				selectedFields = append(selectedFields, userkey.FieldHashedPassword)
				fieldSeen[userkey.FieldHashedPassword] = struct{}{}
			}
		case "id":
		case "__typename":
		default:
			unknownSeen = true
		}
	}
	if !unknownSeen {
		ukq.Select(selectedFields...)
	}
	return nil
}

type userkeyPaginateArgs struct {
	first, last   *int
	after, before *Cursor
	opts          []UserKeyPaginateOption
}

func newUserKeyPaginateArgs(rv map[string]any) *userkeyPaginateArgs {
	args := &userkeyPaginateArgs{}
	if rv == nil {
		return args
	}
	if v := rv[firstField]; v != nil {
		args.first = v.(*int)
	}
	if v := rv[lastField]; v != nil {
		args.last = v.(*int)
	}
	if v := rv[afterField]; v != nil {
		args.after = v.(*Cursor)
	}
	if v := rv[beforeField]; v != nil {
		args.before = v.(*Cursor)
	}
	return args
}

const (
	afterField     = "after"
	firstField     = "first"
	beforeField    = "before"
	lastField      = "last"
	orderByField   = "orderBy"
	directionField = "direction"
	fieldField     = "field"
	whereField     = "where"
)

func fieldArgs(ctx context.Context, whereInput any, path ...string) map[string]any {
	field := collectedField(ctx, path...)
	if field == nil || field.Arguments == nil {
		return nil
	}
	oc := graphql.GetOperationContext(ctx)
	args := field.ArgumentMap(oc.Variables)
	return unmarshalArgs(ctx, whereInput, args)
}

// unmarshalArgs allows extracting the field arguments from their raw representation.
func unmarshalArgs(ctx context.Context, whereInput any, args map[string]any) map[string]any {
	for _, k := range []string{firstField, lastField} {
		v, ok := args[k]
		if !ok || v == nil {
			continue
		}
		i, err := graphql.UnmarshalInt(v)
		if err == nil {
			args[k] = &i
		}
	}
	for _, k := range []string{beforeField, afterField} {
		v, ok := args[k]
		if !ok {
			continue
		}
		c := &Cursor{}
		if c.UnmarshalGQL(v) == nil {
			args[k] = c
		}
	}
	if v, ok := args[whereField]; ok && whereInput != nil {
		if err := graphql.UnmarshalInputFromContext(ctx, v, whereInput); err == nil {
			args[whereField] = whereInput
		}
	}

	return args
}

// mayAddCondition appends another type condition to the satisfies list
// if it does not exist in the list.
func mayAddCondition(satisfies []string, typeCond []string) []string {
Cond:
	for _, c := range typeCond {
		for _, s := range satisfies {
			if c == s {
				continue Cond
			}
		}
		satisfies = append(satisfies, c)
	}
	return satisfies
}
