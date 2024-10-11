// Code generated by ent, DO NOT EDIT.

package profile

import (
	"fijoy/ent/predicate"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/shopspring/decimal"
)

// ID filters vertices based on their ID field.
func ID(id string) predicate.Profile {
	return predicate.Profile(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id string) predicate.Profile {
	return predicate.Profile(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id string) predicate.Profile {
	return predicate.Profile(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...string) predicate.Profile {
	return predicate.Profile(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...string) predicate.Profile {
	return predicate.Profile(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id string) predicate.Profile {
	return predicate.Profile(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id string) predicate.Profile {
	return predicate.Profile(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id string) predicate.Profile {
	return predicate.Profile(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id string) predicate.Profile {
	return predicate.Profile(sql.FieldLTE(FieldID, id))
}

// IDEqualFold applies the EqualFold predicate on the ID field.
func IDEqualFold(id string) predicate.Profile {
	return predicate.Profile(sql.FieldEqualFold(FieldID, id))
}

// IDContainsFold applies the ContainsFold predicate on the ID field.
func IDContainsFold(id string) predicate.Profile {
	return predicate.Profile(sql.FieldContainsFold(FieldID, id))
}

// Locale applies equality check predicate on the "locale" field. It's identical to LocaleEQ.
func Locale(v string) predicate.Profile {
	return predicate.Profile(sql.FieldEQ(FieldLocale, v))
}

// Currencies applies equality check predicate on the "currencies" field. It's identical to CurrenciesEQ.
func Currencies(v string) predicate.Profile {
	return predicate.Profile(sql.FieldEQ(FieldCurrencies, v))
}

// NetWorthGoal applies equality check predicate on the "net_worth_goal" field. It's identical to NetWorthGoalEQ.
func NetWorthGoal(v decimal.Decimal) predicate.Profile {
	return predicate.Profile(sql.FieldEQ(FieldNetWorthGoal, v))
}

// CreatedAt applies equality check predicate on the "created_at" field. It's identical to CreatedAtEQ.
func CreatedAt(v time.Time) predicate.Profile {
	return predicate.Profile(sql.FieldEQ(FieldCreatedAt, v))
}

// LocaleEQ applies the EQ predicate on the "locale" field.
func LocaleEQ(v string) predicate.Profile {
	return predicate.Profile(sql.FieldEQ(FieldLocale, v))
}

// LocaleNEQ applies the NEQ predicate on the "locale" field.
func LocaleNEQ(v string) predicate.Profile {
	return predicate.Profile(sql.FieldNEQ(FieldLocale, v))
}

// LocaleIn applies the In predicate on the "locale" field.
func LocaleIn(vs ...string) predicate.Profile {
	return predicate.Profile(sql.FieldIn(FieldLocale, vs...))
}

// LocaleNotIn applies the NotIn predicate on the "locale" field.
func LocaleNotIn(vs ...string) predicate.Profile {
	return predicate.Profile(sql.FieldNotIn(FieldLocale, vs...))
}

// LocaleGT applies the GT predicate on the "locale" field.
func LocaleGT(v string) predicate.Profile {
	return predicate.Profile(sql.FieldGT(FieldLocale, v))
}

// LocaleGTE applies the GTE predicate on the "locale" field.
func LocaleGTE(v string) predicate.Profile {
	return predicate.Profile(sql.FieldGTE(FieldLocale, v))
}

// LocaleLT applies the LT predicate on the "locale" field.
func LocaleLT(v string) predicate.Profile {
	return predicate.Profile(sql.FieldLT(FieldLocale, v))
}

// LocaleLTE applies the LTE predicate on the "locale" field.
func LocaleLTE(v string) predicate.Profile {
	return predicate.Profile(sql.FieldLTE(FieldLocale, v))
}

// LocaleContains applies the Contains predicate on the "locale" field.
func LocaleContains(v string) predicate.Profile {
	return predicate.Profile(sql.FieldContains(FieldLocale, v))
}

// LocaleHasPrefix applies the HasPrefix predicate on the "locale" field.
func LocaleHasPrefix(v string) predicate.Profile {
	return predicate.Profile(sql.FieldHasPrefix(FieldLocale, v))
}

// LocaleHasSuffix applies the HasSuffix predicate on the "locale" field.
func LocaleHasSuffix(v string) predicate.Profile {
	return predicate.Profile(sql.FieldHasSuffix(FieldLocale, v))
}

// LocaleEqualFold applies the EqualFold predicate on the "locale" field.
func LocaleEqualFold(v string) predicate.Profile {
	return predicate.Profile(sql.FieldEqualFold(FieldLocale, v))
}

// LocaleContainsFold applies the ContainsFold predicate on the "locale" field.
func LocaleContainsFold(v string) predicate.Profile {
	return predicate.Profile(sql.FieldContainsFold(FieldLocale, v))
}

// CurrenciesEQ applies the EQ predicate on the "currencies" field.
func CurrenciesEQ(v string) predicate.Profile {
	return predicate.Profile(sql.FieldEQ(FieldCurrencies, v))
}

// CurrenciesNEQ applies the NEQ predicate on the "currencies" field.
func CurrenciesNEQ(v string) predicate.Profile {
	return predicate.Profile(sql.FieldNEQ(FieldCurrencies, v))
}

// CurrenciesIn applies the In predicate on the "currencies" field.
func CurrenciesIn(vs ...string) predicate.Profile {
	return predicate.Profile(sql.FieldIn(FieldCurrencies, vs...))
}

// CurrenciesNotIn applies the NotIn predicate on the "currencies" field.
func CurrenciesNotIn(vs ...string) predicate.Profile {
	return predicate.Profile(sql.FieldNotIn(FieldCurrencies, vs...))
}

// CurrenciesGT applies the GT predicate on the "currencies" field.
func CurrenciesGT(v string) predicate.Profile {
	return predicate.Profile(sql.FieldGT(FieldCurrencies, v))
}

// CurrenciesGTE applies the GTE predicate on the "currencies" field.
func CurrenciesGTE(v string) predicate.Profile {
	return predicate.Profile(sql.FieldGTE(FieldCurrencies, v))
}

// CurrenciesLT applies the LT predicate on the "currencies" field.
func CurrenciesLT(v string) predicate.Profile {
	return predicate.Profile(sql.FieldLT(FieldCurrencies, v))
}

// CurrenciesLTE applies the LTE predicate on the "currencies" field.
func CurrenciesLTE(v string) predicate.Profile {
	return predicate.Profile(sql.FieldLTE(FieldCurrencies, v))
}

// CurrenciesContains applies the Contains predicate on the "currencies" field.
func CurrenciesContains(v string) predicate.Profile {
	return predicate.Profile(sql.FieldContains(FieldCurrencies, v))
}

// CurrenciesHasPrefix applies the HasPrefix predicate on the "currencies" field.
func CurrenciesHasPrefix(v string) predicate.Profile {
	return predicate.Profile(sql.FieldHasPrefix(FieldCurrencies, v))
}

// CurrenciesHasSuffix applies the HasSuffix predicate on the "currencies" field.
func CurrenciesHasSuffix(v string) predicate.Profile {
	return predicate.Profile(sql.FieldHasSuffix(FieldCurrencies, v))
}

// CurrenciesEqualFold applies the EqualFold predicate on the "currencies" field.
func CurrenciesEqualFold(v string) predicate.Profile {
	return predicate.Profile(sql.FieldEqualFold(FieldCurrencies, v))
}

// CurrenciesContainsFold applies the ContainsFold predicate on the "currencies" field.
func CurrenciesContainsFold(v string) predicate.Profile {
	return predicate.Profile(sql.FieldContainsFold(FieldCurrencies, v))
}

// NetWorthGoalEQ applies the EQ predicate on the "net_worth_goal" field.
func NetWorthGoalEQ(v decimal.Decimal) predicate.Profile {
	return predicate.Profile(sql.FieldEQ(FieldNetWorthGoal, v))
}

// NetWorthGoalNEQ applies the NEQ predicate on the "net_worth_goal" field.
func NetWorthGoalNEQ(v decimal.Decimal) predicate.Profile {
	return predicate.Profile(sql.FieldNEQ(FieldNetWorthGoal, v))
}

// NetWorthGoalIn applies the In predicate on the "net_worth_goal" field.
func NetWorthGoalIn(vs ...decimal.Decimal) predicate.Profile {
	return predicate.Profile(sql.FieldIn(FieldNetWorthGoal, vs...))
}

// NetWorthGoalNotIn applies the NotIn predicate on the "net_worth_goal" field.
func NetWorthGoalNotIn(vs ...decimal.Decimal) predicate.Profile {
	return predicate.Profile(sql.FieldNotIn(FieldNetWorthGoal, vs...))
}

// NetWorthGoalGT applies the GT predicate on the "net_worth_goal" field.
func NetWorthGoalGT(v decimal.Decimal) predicate.Profile {
	return predicate.Profile(sql.FieldGT(FieldNetWorthGoal, v))
}

// NetWorthGoalGTE applies the GTE predicate on the "net_worth_goal" field.
func NetWorthGoalGTE(v decimal.Decimal) predicate.Profile {
	return predicate.Profile(sql.FieldGTE(FieldNetWorthGoal, v))
}

// NetWorthGoalLT applies the LT predicate on the "net_worth_goal" field.
func NetWorthGoalLT(v decimal.Decimal) predicate.Profile {
	return predicate.Profile(sql.FieldLT(FieldNetWorthGoal, v))
}

// NetWorthGoalLTE applies the LTE predicate on the "net_worth_goal" field.
func NetWorthGoalLTE(v decimal.Decimal) predicate.Profile {
	return predicate.Profile(sql.FieldLTE(FieldNetWorthGoal, v))
}

// CreatedAtEQ applies the EQ predicate on the "created_at" field.
func CreatedAtEQ(v time.Time) predicate.Profile {
	return predicate.Profile(sql.FieldEQ(FieldCreatedAt, v))
}

// CreatedAtNEQ applies the NEQ predicate on the "created_at" field.
func CreatedAtNEQ(v time.Time) predicate.Profile {
	return predicate.Profile(sql.FieldNEQ(FieldCreatedAt, v))
}

// CreatedAtIn applies the In predicate on the "created_at" field.
func CreatedAtIn(vs ...time.Time) predicate.Profile {
	return predicate.Profile(sql.FieldIn(FieldCreatedAt, vs...))
}

// CreatedAtNotIn applies the NotIn predicate on the "created_at" field.
func CreatedAtNotIn(vs ...time.Time) predicate.Profile {
	return predicate.Profile(sql.FieldNotIn(FieldCreatedAt, vs...))
}

// CreatedAtGT applies the GT predicate on the "created_at" field.
func CreatedAtGT(v time.Time) predicate.Profile {
	return predicate.Profile(sql.FieldGT(FieldCreatedAt, v))
}

// CreatedAtGTE applies the GTE predicate on the "created_at" field.
func CreatedAtGTE(v time.Time) predicate.Profile {
	return predicate.Profile(sql.FieldGTE(FieldCreatedAt, v))
}

// CreatedAtLT applies the LT predicate on the "created_at" field.
func CreatedAtLT(v time.Time) predicate.Profile {
	return predicate.Profile(sql.FieldLT(FieldCreatedAt, v))
}

// CreatedAtLTE applies the LTE predicate on the "created_at" field.
func CreatedAtLTE(v time.Time) predicate.Profile {
	return predicate.Profile(sql.FieldLTE(FieldCreatedAt, v))
}

// HasUser applies the HasEdge predicate on the "user" edge.
func HasUser() predicate.Profile {
	return predicate.Profile(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, UserTable, UserColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasUserWith applies the HasEdge predicate on the "user" edge with a given conditions (other predicates).
func HasUserWith(preds ...predicate.User) predicate.Profile {
	return predicate.Profile(func(s *sql.Selector) {
		step := newUserStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasAccount applies the HasEdge predicate on the "account" edge.
func HasAccount() predicate.Profile {
	return predicate.Profile(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, AccountTable, AccountColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasAccountWith applies the HasEdge predicate on the "account" edge with a given conditions (other predicates).
func HasAccountWith(preds ...predicate.Account) predicate.Profile {
	return predicate.Profile(func(s *sql.Selector) {
		step := newAccountStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasTransaction applies the HasEdge predicate on the "transaction" edge.
func HasTransaction() predicate.Profile {
	return predicate.Profile(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, TransactionTable, TransactionColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasTransactionWith applies the HasEdge predicate on the "transaction" edge with a given conditions (other predicates).
func HasTransactionWith(preds ...predicate.Transaction) predicate.Profile {
	return predicate.Profile(func(s *sql.Selector) {
		step := newTransactionStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// HasOverallSnapshot applies the HasEdge predicate on the "overall_snapshot" edge.
func HasOverallSnapshot() predicate.Profile {
	return predicate.Profile(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, OverallSnapshotTable, OverallSnapshotColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasOverallSnapshotWith applies the HasEdge predicate on the "overall_snapshot" edge with a given conditions (other predicates).
func HasOverallSnapshotWith(preds ...predicate.OverallSnapshot) predicate.Profile {
	return predicate.Profile(func(s *sql.Selector) {
		step := newOverallSnapshotStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.Profile) predicate.Profile {
	return predicate.Profile(sql.AndPredicates(predicates...))
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.Profile) predicate.Profile {
	return predicate.Profile(sql.OrPredicates(predicates...))
}

// Not applies the not operator on the given predicate.
func Not(p predicate.Profile) predicate.Profile {
	return predicate.Profile(sql.NotPredicates(p))
}
