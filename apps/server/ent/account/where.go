// Code generated by ent, DO NOT EDIT.

package account

import (
	"fijoy/ent/predicate"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/shopspring/decimal"
)

// ID filters vertices based on their ID field.
func ID(id int) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id int) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id int) predicate.Account {
	return predicate.Account(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...int) predicate.Account {
	return predicate.Account(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...int) predicate.Account {
	return predicate.Account(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id int) predicate.Account {
	return predicate.Account(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id int) predicate.Account {
	return predicate.Account(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id int) predicate.Account {
	return predicate.Account(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id int) predicate.Account {
	return predicate.Account(sql.FieldLTE(FieldID, id))
}

// Name applies equality check predicate on the "name" field. It's identical to NameEQ.
func Name(v string) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldName, v))
}

// Archived applies equality check predicate on the "archived" field. It's identical to ArchivedEQ.
func Archived(v bool) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldArchived, v))
}

// IncludeInNetWorth applies equality check predicate on the "include_in_net_worth" field. It's identical to IncludeInNetWorthEQ.
func IncludeInNetWorth(v bool) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldIncludeInNetWorth, v))
}

// Symbol applies equality check predicate on the "symbol" field. It's identical to SymbolEQ.
func Symbol(v string) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldSymbol, v))
}

// Amount applies equality check predicate on the "amount" field. It's identical to AmountEQ.
func Amount(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldAmount, v))
}

// Value applies equality check predicate on the "value" field. It's identical to ValueEQ.
func Value(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldValue, v))
}

// FxRate applies equality check predicate on the "fx_rate" field. It's identical to FxRateEQ.
func FxRate(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldFxRate, v))
}

// Balance applies equality check predicate on the "balance" field. It's identical to BalanceEQ.
func Balance(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldBalance, v))
}

// CreatedAt applies equality check predicate on the "created_at" field. It's identical to CreatedAtEQ.
func CreatedAt(v time.Time) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldCreatedAt, v))
}

// UpdatedAt applies equality check predicate on the "updated_at" field. It's identical to UpdatedAtEQ.
func UpdatedAt(v time.Time) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldUpdatedAt, v))
}

// NameEQ applies the EQ predicate on the "name" field.
func NameEQ(v string) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldName, v))
}

// NameNEQ applies the NEQ predicate on the "name" field.
func NameNEQ(v string) predicate.Account {
	return predicate.Account(sql.FieldNEQ(FieldName, v))
}

// NameIn applies the In predicate on the "name" field.
func NameIn(vs ...string) predicate.Account {
	return predicate.Account(sql.FieldIn(FieldName, vs...))
}

// NameNotIn applies the NotIn predicate on the "name" field.
func NameNotIn(vs ...string) predicate.Account {
	return predicate.Account(sql.FieldNotIn(FieldName, vs...))
}

// NameGT applies the GT predicate on the "name" field.
func NameGT(v string) predicate.Account {
	return predicate.Account(sql.FieldGT(FieldName, v))
}

// NameGTE applies the GTE predicate on the "name" field.
func NameGTE(v string) predicate.Account {
	return predicate.Account(sql.FieldGTE(FieldName, v))
}

// NameLT applies the LT predicate on the "name" field.
func NameLT(v string) predicate.Account {
	return predicate.Account(sql.FieldLT(FieldName, v))
}

// NameLTE applies the LTE predicate on the "name" field.
func NameLTE(v string) predicate.Account {
	return predicate.Account(sql.FieldLTE(FieldName, v))
}

// NameContains applies the Contains predicate on the "name" field.
func NameContains(v string) predicate.Account {
	return predicate.Account(sql.FieldContains(FieldName, v))
}

// NameHasPrefix applies the HasPrefix predicate on the "name" field.
func NameHasPrefix(v string) predicate.Account {
	return predicate.Account(sql.FieldHasPrefix(FieldName, v))
}

// NameHasSuffix applies the HasSuffix predicate on the "name" field.
func NameHasSuffix(v string) predicate.Account {
	return predicate.Account(sql.FieldHasSuffix(FieldName, v))
}

// NameEqualFold applies the EqualFold predicate on the "name" field.
func NameEqualFold(v string) predicate.Account {
	return predicate.Account(sql.FieldEqualFold(FieldName, v))
}

// NameContainsFold applies the ContainsFold predicate on the "name" field.
func NameContainsFold(v string) predicate.Account {
	return predicate.Account(sql.FieldContainsFold(FieldName, v))
}

// AccountTypeEQ applies the EQ predicate on the "account_type" field.
func AccountTypeEQ(v AccountType) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldAccountType, v))
}

// AccountTypeNEQ applies the NEQ predicate on the "account_type" field.
func AccountTypeNEQ(v AccountType) predicate.Account {
	return predicate.Account(sql.FieldNEQ(FieldAccountType, v))
}

// AccountTypeIn applies the In predicate on the "account_type" field.
func AccountTypeIn(vs ...AccountType) predicate.Account {
	return predicate.Account(sql.FieldIn(FieldAccountType, vs...))
}

// AccountTypeNotIn applies the NotIn predicate on the "account_type" field.
func AccountTypeNotIn(vs ...AccountType) predicate.Account {
	return predicate.Account(sql.FieldNotIn(FieldAccountType, vs...))
}

// ArchivedEQ applies the EQ predicate on the "archived" field.
func ArchivedEQ(v bool) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldArchived, v))
}

// ArchivedNEQ applies the NEQ predicate on the "archived" field.
func ArchivedNEQ(v bool) predicate.Account {
	return predicate.Account(sql.FieldNEQ(FieldArchived, v))
}

// IncludeInNetWorthEQ applies the EQ predicate on the "include_in_net_worth" field.
func IncludeInNetWorthEQ(v bool) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldIncludeInNetWorth, v))
}

// IncludeInNetWorthNEQ applies the NEQ predicate on the "include_in_net_worth" field.
func IncludeInNetWorthNEQ(v bool) predicate.Account {
	return predicate.Account(sql.FieldNEQ(FieldIncludeInNetWorth, v))
}

// SymbolEQ applies the EQ predicate on the "symbol" field.
func SymbolEQ(v string) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldSymbol, v))
}

// SymbolNEQ applies the NEQ predicate on the "symbol" field.
func SymbolNEQ(v string) predicate.Account {
	return predicate.Account(sql.FieldNEQ(FieldSymbol, v))
}

// SymbolIn applies the In predicate on the "symbol" field.
func SymbolIn(vs ...string) predicate.Account {
	return predicate.Account(sql.FieldIn(FieldSymbol, vs...))
}

// SymbolNotIn applies the NotIn predicate on the "symbol" field.
func SymbolNotIn(vs ...string) predicate.Account {
	return predicate.Account(sql.FieldNotIn(FieldSymbol, vs...))
}

// SymbolGT applies the GT predicate on the "symbol" field.
func SymbolGT(v string) predicate.Account {
	return predicate.Account(sql.FieldGT(FieldSymbol, v))
}

// SymbolGTE applies the GTE predicate on the "symbol" field.
func SymbolGTE(v string) predicate.Account {
	return predicate.Account(sql.FieldGTE(FieldSymbol, v))
}

// SymbolLT applies the LT predicate on the "symbol" field.
func SymbolLT(v string) predicate.Account {
	return predicate.Account(sql.FieldLT(FieldSymbol, v))
}

// SymbolLTE applies the LTE predicate on the "symbol" field.
func SymbolLTE(v string) predicate.Account {
	return predicate.Account(sql.FieldLTE(FieldSymbol, v))
}

// SymbolContains applies the Contains predicate on the "symbol" field.
func SymbolContains(v string) predicate.Account {
	return predicate.Account(sql.FieldContains(FieldSymbol, v))
}

// SymbolHasPrefix applies the HasPrefix predicate on the "symbol" field.
func SymbolHasPrefix(v string) predicate.Account {
	return predicate.Account(sql.FieldHasPrefix(FieldSymbol, v))
}

// SymbolHasSuffix applies the HasSuffix predicate on the "symbol" field.
func SymbolHasSuffix(v string) predicate.Account {
	return predicate.Account(sql.FieldHasSuffix(FieldSymbol, v))
}

// SymbolEqualFold applies the EqualFold predicate on the "symbol" field.
func SymbolEqualFold(v string) predicate.Account {
	return predicate.Account(sql.FieldEqualFold(FieldSymbol, v))
}

// SymbolContainsFold applies the ContainsFold predicate on the "symbol" field.
func SymbolContainsFold(v string) predicate.Account {
	return predicate.Account(sql.FieldContainsFold(FieldSymbol, v))
}

// SymbolTypeEQ applies the EQ predicate on the "symbol_type" field.
func SymbolTypeEQ(v SymbolType) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldSymbolType, v))
}

// SymbolTypeNEQ applies the NEQ predicate on the "symbol_type" field.
func SymbolTypeNEQ(v SymbolType) predicate.Account {
	return predicate.Account(sql.FieldNEQ(FieldSymbolType, v))
}

// SymbolTypeIn applies the In predicate on the "symbol_type" field.
func SymbolTypeIn(vs ...SymbolType) predicate.Account {
	return predicate.Account(sql.FieldIn(FieldSymbolType, vs...))
}

// SymbolTypeNotIn applies the NotIn predicate on the "symbol_type" field.
func SymbolTypeNotIn(vs ...SymbolType) predicate.Account {
	return predicate.Account(sql.FieldNotIn(FieldSymbolType, vs...))
}

// AmountEQ applies the EQ predicate on the "amount" field.
func AmountEQ(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldAmount, v))
}

// AmountNEQ applies the NEQ predicate on the "amount" field.
func AmountNEQ(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldNEQ(FieldAmount, v))
}

// AmountIn applies the In predicate on the "amount" field.
func AmountIn(vs ...decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldIn(FieldAmount, vs...))
}

// AmountNotIn applies the NotIn predicate on the "amount" field.
func AmountNotIn(vs ...decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldNotIn(FieldAmount, vs...))
}

// AmountGT applies the GT predicate on the "amount" field.
func AmountGT(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldGT(FieldAmount, v))
}

// AmountGTE applies the GTE predicate on the "amount" field.
func AmountGTE(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldGTE(FieldAmount, v))
}

// AmountLT applies the LT predicate on the "amount" field.
func AmountLT(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldLT(FieldAmount, v))
}

// AmountLTE applies the LTE predicate on the "amount" field.
func AmountLTE(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldLTE(FieldAmount, v))
}

// ValueEQ applies the EQ predicate on the "value" field.
func ValueEQ(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldValue, v))
}

// ValueNEQ applies the NEQ predicate on the "value" field.
func ValueNEQ(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldNEQ(FieldValue, v))
}

// ValueIn applies the In predicate on the "value" field.
func ValueIn(vs ...decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldIn(FieldValue, vs...))
}

// ValueNotIn applies the NotIn predicate on the "value" field.
func ValueNotIn(vs ...decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldNotIn(FieldValue, vs...))
}

// ValueGT applies the GT predicate on the "value" field.
func ValueGT(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldGT(FieldValue, v))
}

// ValueGTE applies the GTE predicate on the "value" field.
func ValueGTE(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldGTE(FieldValue, v))
}

// ValueLT applies the LT predicate on the "value" field.
func ValueLT(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldLT(FieldValue, v))
}

// ValueLTE applies the LTE predicate on the "value" field.
func ValueLTE(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldLTE(FieldValue, v))
}

// FxRateEQ applies the EQ predicate on the "fx_rate" field.
func FxRateEQ(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldFxRate, v))
}

// FxRateNEQ applies the NEQ predicate on the "fx_rate" field.
func FxRateNEQ(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldNEQ(FieldFxRate, v))
}

// FxRateIn applies the In predicate on the "fx_rate" field.
func FxRateIn(vs ...decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldIn(FieldFxRate, vs...))
}

// FxRateNotIn applies the NotIn predicate on the "fx_rate" field.
func FxRateNotIn(vs ...decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldNotIn(FieldFxRate, vs...))
}

// FxRateGT applies the GT predicate on the "fx_rate" field.
func FxRateGT(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldGT(FieldFxRate, v))
}

// FxRateGTE applies the GTE predicate on the "fx_rate" field.
func FxRateGTE(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldGTE(FieldFxRate, v))
}

// FxRateLT applies the LT predicate on the "fx_rate" field.
func FxRateLT(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldLT(FieldFxRate, v))
}

// FxRateLTE applies the LTE predicate on the "fx_rate" field.
func FxRateLTE(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldLTE(FieldFxRate, v))
}

// FxRateIsNil applies the IsNil predicate on the "fx_rate" field.
func FxRateIsNil() predicate.Account {
	return predicate.Account(sql.FieldIsNull(FieldFxRate))
}

// FxRateNotNil applies the NotNil predicate on the "fx_rate" field.
func FxRateNotNil() predicate.Account {
	return predicate.Account(sql.FieldNotNull(FieldFxRate))
}

// BalanceEQ applies the EQ predicate on the "balance" field.
func BalanceEQ(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldBalance, v))
}

// BalanceNEQ applies the NEQ predicate on the "balance" field.
func BalanceNEQ(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldNEQ(FieldBalance, v))
}

// BalanceIn applies the In predicate on the "balance" field.
func BalanceIn(vs ...decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldIn(FieldBalance, vs...))
}

// BalanceNotIn applies the NotIn predicate on the "balance" field.
func BalanceNotIn(vs ...decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldNotIn(FieldBalance, vs...))
}

// BalanceGT applies the GT predicate on the "balance" field.
func BalanceGT(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldGT(FieldBalance, v))
}

// BalanceGTE applies the GTE predicate on the "balance" field.
func BalanceGTE(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldGTE(FieldBalance, v))
}

// BalanceLT applies the LT predicate on the "balance" field.
func BalanceLT(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldLT(FieldBalance, v))
}

// BalanceLTE applies the LTE predicate on the "balance" field.
func BalanceLTE(v decimal.Decimal) predicate.Account {
	return predicate.Account(sql.FieldLTE(FieldBalance, v))
}

// CreatedAtEQ applies the EQ predicate on the "created_at" field.
func CreatedAtEQ(v time.Time) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldCreatedAt, v))
}

// CreatedAtNEQ applies the NEQ predicate on the "created_at" field.
func CreatedAtNEQ(v time.Time) predicate.Account {
	return predicate.Account(sql.FieldNEQ(FieldCreatedAt, v))
}

// CreatedAtIn applies the In predicate on the "created_at" field.
func CreatedAtIn(vs ...time.Time) predicate.Account {
	return predicate.Account(sql.FieldIn(FieldCreatedAt, vs...))
}

// CreatedAtNotIn applies the NotIn predicate on the "created_at" field.
func CreatedAtNotIn(vs ...time.Time) predicate.Account {
	return predicate.Account(sql.FieldNotIn(FieldCreatedAt, vs...))
}

// CreatedAtGT applies the GT predicate on the "created_at" field.
func CreatedAtGT(v time.Time) predicate.Account {
	return predicate.Account(sql.FieldGT(FieldCreatedAt, v))
}

// CreatedAtGTE applies the GTE predicate on the "created_at" field.
func CreatedAtGTE(v time.Time) predicate.Account {
	return predicate.Account(sql.FieldGTE(FieldCreatedAt, v))
}

// CreatedAtLT applies the LT predicate on the "created_at" field.
func CreatedAtLT(v time.Time) predicate.Account {
	return predicate.Account(sql.FieldLT(FieldCreatedAt, v))
}

// CreatedAtLTE applies the LTE predicate on the "created_at" field.
func CreatedAtLTE(v time.Time) predicate.Account {
	return predicate.Account(sql.FieldLTE(FieldCreatedAt, v))
}

// UpdatedAtEQ applies the EQ predicate on the "updated_at" field.
func UpdatedAtEQ(v time.Time) predicate.Account {
	return predicate.Account(sql.FieldEQ(FieldUpdatedAt, v))
}

// UpdatedAtNEQ applies the NEQ predicate on the "updated_at" field.
func UpdatedAtNEQ(v time.Time) predicate.Account {
	return predicate.Account(sql.FieldNEQ(FieldUpdatedAt, v))
}

// UpdatedAtIn applies the In predicate on the "updated_at" field.
func UpdatedAtIn(vs ...time.Time) predicate.Account {
	return predicate.Account(sql.FieldIn(FieldUpdatedAt, vs...))
}

// UpdatedAtNotIn applies the NotIn predicate on the "updated_at" field.
func UpdatedAtNotIn(vs ...time.Time) predicate.Account {
	return predicate.Account(sql.FieldNotIn(FieldUpdatedAt, vs...))
}

// UpdatedAtGT applies the GT predicate on the "updated_at" field.
func UpdatedAtGT(v time.Time) predicate.Account {
	return predicate.Account(sql.FieldGT(FieldUpdatedAt, v))
}

// UpdatedAtGTE applies the GTE predicate on the "updated_at" field.
func UpdatedAtGTE(v time.Time) predicate.Account {
	return predicate.Account(sql.FieldGTE(FieldUpdatedAt, v))
}

// UpdatedAtLT applies the LT predicate on the "updated_at" field.
func UpdatedAtLT(v time.Time) predicate.Account {
	return predicate.Account(sql.FieldLT(FieldUpdatedAt, v))
}

// UpdatedAtLTE applies the LTE predicate on the "updated_at" field.
func UpdatedAtLTE(v time.Time) predicate.Account {
	return predicate.Account(sql.FieldLTE(FieldUpdatedAt, v))
}

// HasProfile applies the HasEdge predicate on the "profile" edge.
func HasProfile() predicate.Account {
	return predicate.Account(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.M2M, true, ProfileTable, ProfilePrimaryKey...),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasProfileWith applies the HasEdge predicate on the "profile" edge with a given conditions (other predicates).
func HasProfileWith(preds ...predicate.Profile) predicate.Account {
	return predicate.Account(func(s *sql.Selector) {
		step := newProfileStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasAccountSnapshot applies the HasEdge predicate on the "account_snapshot" edge.
func HasAccountSnapshot() predicate.Account {
	return predicate.Account(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.M2M, false, AccountSnapshotTable, AccountSnapshotPrimaryKey...),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasAccountSnapshotWith applies the HasEdge predicate on the "account_snapshot" edge with a given conditions (other predicates).
func HasAccountSnapshotWith(preds ...predicate.AccountSnapshot) predicate.Account {
	return predicate.Account(func(s *sql.Selector) {
		step := newAccountSnapshotStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasTransaction applies the HasEdge predicate on the "transaction" edge.
func HasTransaction() predicate.Account {
	return predicate.Account(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.M2M, false, TransactionTable, TransactionPrimaryKey...),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasTransactionWith applies the HasEdge predicate on the "transaction" edge with a given conditions (other predicates).
func HasTransactionWith(preds ...predicate.Transaction) predicate.Account {
	return predicate.Account(func(s *sql.Selector) {
		step := newTransactionStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.Account) predicate.Account {
	return predicate.Account(sql.AndPredicates(predicates...))
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.Account) predicate.Account {
	return predicate.Account(sql.OrPredicates(predicates...))
}

// Not applies the not operator on the given predicate.
func Not(p predicate.Account) predicate.Account {
	return predicate.Account(sql.NotPredicates(p))
}
