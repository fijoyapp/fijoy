// Code generated by ent, DO NOT EDIT.

package overallsnapshot

import (
	"fijoy/ent/predicate"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/shopspring/decimal"
)

// ID filters vertices based on their ID field.
func ID(id int) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id int) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id int) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...int) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...int) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id int) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id int) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id int) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id int) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldLTE(FieldID, id))
}

// Datehour applies equality check predicate on the "datehour" field. It's identical to DatehourEQ.
func Datehour(v time.Time) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldEQ(FieldDatehour, v))
}

// Liquidity applies equality check predicate on the "liquidity" field. It's identical to LiquidityEQ.
func Liquidity(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldEQ(FieldLiquidity, v))
}

// Investment applies equality check predicate on the "investment" field. It's identical to InvestmentEQ.
func Investment(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldEQ(FieldInvestment, v))
}

// Property applies equality check predicate on the "property" field. It's identical to PropertyEQ.
func Property(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldEQ(FieldProperty, v))
}

// Receivable applies equality check predicate on the "receivable" field. It's identical to ReceivableEQ.
func Receivable(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldEQ(FieldReceivable, v))
}

// Liablity applies equality check predicate on the "liablity" field. It's identical to LiablityEQ.
func Liablity(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldEQ(FieldLiablity, v))
}

// DatehourEQ applies the EQ predicate on the "datehour" field.
func DatehourEQ(v time.Time) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldEQ(FieldDatehour, v))
}

// DatehourNEQ applies the NEQ predicate on the "datehour" field.
func DatehourNEQ(v time.Time) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldNEQ(FieldDatehour, v))
}

// DatehourIn applies the In predicate on the "datehour" field.
func DatehourIn(vs ...time.Time) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldIn(FieldDatehour, vs...))
}

// DatehourNotIn applies the NotIn predicate on the "datehour" field.
func DatehourNotIn(vs ...time.Time) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldNotIn(FieldDatehour, vs...))
}

// DatehourGT applies the GT predicate on the "datehour" field.
func DatehourGT(v time.Time) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldGT(FieldDatehour, v))
}

// DatehourGTE applies the GTE predicate on the "datehour" field.
func DatehourGTE(v time.Time) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldGTE(FieldDatehour, v))
}

// DatehourLT applies the LT predicate on the "datehour" field.
func DatehourLT(v time.Time) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldLT(FieldDatehour, v))
}

// DatehourLTE applies the LTE predicate on the "datehour" field.
func DatehourLTE(v time.Time) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldLTE(FieldDatehour, v))
}

// LiquidityEQ applies the EQ predicate on the "liquidity" field.
func LiquidityEQ(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldEQ(FieldLiquidity, v))
}

// LiquidityNEQ applies the NEQ predicate on the "liquidity" field.
func LiquidityNEQ(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldNEQ(FieldLiquidity, v))
}

// LiquidityIn applies the In predicate on the "liquidity" field.
func LiquidityIn(vs ...decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldIn(FieldLiquidity, vs...))
}

// LiquidityNotIn applies the NotIn predicate on the "liquidity" field.
func LiquidityNotIn(vs ...decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldNotIn(FieldLiquidity, vs...))
}

// LiquidityGT applies the GT predicate on the "liquidity" field.
func LiquidityGT(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldGT(FieldLiquidity, v))
}

// LiquidityGTE applies the GTE predicate on the "liquidity" field.
func LiquidityGTE(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldGTE(FieldLiquidity, v))
}

// LiquidityLT applies the LT predicate on the "liquidity" field.
func LiquidityLT(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldLT(FieldLiquidity, v))
}

// LiquidityLTE applies the LTE predicate on the "liquidity" field.
func LiquidityLTE(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldLTE(FieldLiquidity, v))
}

// InvestmentEQ applies the EQ predicate on the "investment" field.
func InvestmentEQ(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldEQ(FieldInvestment, v))
}

// InvestmentNEQ applies the NEQ predicate on the "investment" field.
func InvestmentNEQ(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldNEQ(FieldInvestment, v))
}

// InvestmentIn applies the In predicate on the "investment" field.
func InvestmentIn(vs ...decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldIn(FieldInvestment, vs...))
}

// InvestmentNotIn applies the NotIn predicate on the "investment" field.
func InvestmentNotIn(vs ...decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldNotIn(FieldInvestment, vs...))
}

// InvestmentGT applies the GT predicate on the "investment" field.
func InvestmentGT(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldGT(FieldInvestment, v))
}

// InvestmentGTE applies the GTE predicate on the "investment" field.
func InvestmentGTE(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldGTE(FieldInvestment, v))
}

// InvestmentLT applies the LT predicate on the "investment" field.
func InvestmentLT(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldLT(FieldInvestment, v))
}

// InvestmentLTE applies the LTE predicate on the "investment" field.
func InvestmentLTE(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldLTE(FieldInvestment, v))
}

// PropertyEQ applies the EQ predicate on the "property" field.
func PropertyEQ(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldEQ(FieldProperty, v))
}

// PropertyNEQ applies the NEQ predicate on the "property" field.
func PropertyNEQ(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldNEQ(FieldProperty, v))
}

// PropertyIn applies the In predicate on the "property" field.
func PropertyIn(vs ...decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldIn(FieldProperty, vs...))
}

// PropertyNotIn applies the NotIn predicate on the "property" field.
func PropertyNotIn(vs ...decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldNotIn(FieldProperty, vs...))
}

// PropertyGT applies the GT predicate on the "property" field.
func PropertyGT(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldGT(FieldProperty, v))
}

// PropertyGTE applies the GTE predicate on the "property" field.
func PropertyGTE(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldGTE(FieldProperty, v))
}

// PropertyLT applies the LT predicate on the "property" field.
func PropertyLT(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldLT(FieldProperty, v))
}

// PropertyLTE applies the LTE predicate on the "property" field.
func PropertyLTE(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldLTE(FieldProperty, v))
}

// ReceivableEQ applies the EQ predicate on the "receivable" field.
func ReceivableEQ(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldEQ(FieldReceivable, v))
}

// ReceivableNEQ applies the NEQ predicate on the "receivable" field.
func ReceivableNEQ(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldNEQ(FieldReceivable, v))
}

// ReceivableIn applies the In predicate on the "receivable" field.
func ReceivableIn(vs ...decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldIn(FieldReceivable, vs...))
}

// ReceivableNotIn applies the NotIn predicate on the "receivable" field.
func ReceivableNotIn(vs ...decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldNotIn(FieldReceivable, vs...))
}

// ReceivableGT applies the GT predicate on the "receivable" field.
func ReceivableGT(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldGT(FieldReceivable, v))
}

// ReceivableGTE applies the GTE predicate on the "receivable" field.
func ReceivableGTE(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldGTE(FieldReceivable, v))
}

// ReceivableLT applies the LT predicate on the "receivable" field.
func ReceivableLT(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldLT(FieldReceivable, v))
}

// ReceivableLTE applies the LTE predicate on the "receivable" field.
func ReceivableLTE(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldLTE(FieldReceivable, v))
}

// LiablityEQ applies the EQ predicate on the "liablity" field.
func LiablityEQ(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldEQ(FieldLiablity, v))
}

// LiablityNEQ applies the NEQ predicate on the "liablity" field.
func LiablityNEQ(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldNEQ(FieldLiablity, v))
}

// LiablityIn applies the In predicate on the "liablity" field.
func LiablityIn(vs ...decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldIn(FieldLiablity, vs...))
}

// LiablityNotIn applies the NotIn predicate on the "liablity" field.
func LiablityNotIn(vs ...decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldNotIn(FieldLiablity, vs...))
}

// LiablityGT applies the GT predicate on the "liablity" field.
func LiablityGT(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldGT(FieldLiablity, v))
}

// LiablityGTE applies the GTE predicate on the "liablity" field.
func LiablityGTE(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldGTE(FieldLiablity, v))
}

// LiablityLT applies the LT predicate on the "liablity" field.
func LiablityLT(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldLT(FieldLiablity, v))
}

// LiablityLTE applies the LTE predicate on the "liablity" field.
func LiablityLTE(v decimal.Decimal) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.FieldLTE(FieldLiablity, v))
}

// HasProfile applies the HasEdge predicate on the "profile" edge.
func HasProfile() predicate.OverallSnapshot {
	return predicate.OverallSnapshot(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.M2M, true, ProfileTable, ProfilePrimaryKey...),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasProfileWith applies the HasEdge predicate on the "profile" edge with a given conditions (other predicates).
func HasProfileWith(preds ...predicate.Profile) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(func(s *sql.Selector) {
		step := newProfileStep()
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.OverallSnapshot) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.AndPredicates(predicates...))
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.OverallSnapshot) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.OrPredicates(predicates...))
}

// Not applies the not operator on the given predicate.
func Not(p predicate.OverallSnapshot) predicate.OverallSnapshot {
	return predicate.OverallSnapshot(sql.NotPredicates(p))
}