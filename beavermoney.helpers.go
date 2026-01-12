package beavermoney

import (
	"context"
	"time"

	"beavermoney.app/ent/currency"
	"beavermoney.app/ent/household"
	"beavermoney.app/ent/transaction"
	"beavermoney.app/ent/transactioncategory"
	"beavermoney.app/ent/transactionentry"
	"beavermoney.app/internal/contextkeys"
	"entgo.io/ent/dialect/sql"
	"github.com/shopspring/decimal"
)

func (r *financialReportResolver) aggregateByCategoryType(
	ctx context.Context,
	obj *FinancialReport,
	categoryType transactioncategory.Type,
) ([]*CategoryTypeAggregate, error) {
	householdID := contextkeys.GetHouseholdID(ctx)
	client := r.entClient

	// Get household currency
	hh, err := client.Household.Query().
		Where(household.IDEQ(householdID)).
		WithCurrency().
		Only(ctx)
	if err != nil {
		r.logger.Error("Failed to get household", "error", err)
		return nil, err
	}

	// Query grouped by category and currency
	var res []struct {
		CategoryID   int             `sql:"category_id"`
		CurrencyCode string          `sql:"currency_code"`
		Total        decimal.Decimal `sql:"total"`
		Count        int             `sql:"count"`
	}

	err = client.Transaction.Query().
		Modify(func(s *sql.Selector) {
			te := sql.Table(transactionentry.Table)
			tc := sql.Table(transactioncategory.Table)
			cu := sql.Table(currency.Table)

			// Join tables
			s.Join(te).
				On(s.C(transaction.FieldID), te.C(transactionentry.TransactionColumn))
			s.Join(tc).
				On(s.C(transaction.CategoryColumn), tc.C(transactioncategory.FieldID))
			s.Join(cu).
				On(te.C(transactionentry.CurrencyColumn), cu.C(currency.FieldID))

			// Filter by household
			s.Where(sql.EQ(s.C(transaction.FieldHouseholdID), householdID))

			// Apply time filters
			if !obj.StartDate.IsZero() {
				s.Where(sql.GTE(s.C(transaction.FieldDatetime), obj.StartDate))
			}
			if !obj.EndDate.IsZero() {
				s.Where(sql.LT(s.C(transaction.FieldDatetime), obj.EndDate))
			}

			// Filter for category type
			s.Where(sql.EQ(tc.C(transactioncategory.FieldType), categoryType))

			// Group by category and currency and sum
			s.Select(
				sql.As(tc.C(transactioncategory.FieldID), "category_id"),
				sql.As(cu.C(currency.FieldCode), "currency_code"),
				sql.As(sql.Sum(te.C(transactionentry.FieldAmount)), "total"),
				sql.As(
					sql.Count(sql.Distinct(s.C(transaction.FieldID))),
					"count",
				),
			)
			s.GroupBy(
				tc.C(transactioncategory.FieldID),
				cu.C(currency.FieldCode),
			)
		}).
		Scan(ctx, &res)
	if err != nil {
		r.logger.Error(
			"Failed to aggregate by category",
			"error",
			err,
			"categoryType",
			categoryType,
		)
		return nil, err
	}

	if len(res) == 0 {
		return []*CategoryTypeAggregate{}, nil
	}

	// Aggregate by category (converting currencies)
	type categoryData struct {
		total decimal.Decimal
		count int
	}
	categoryMap := make(map[int]*categoryData)

	for _, row := range res {
		rate, err := r.fxrateClient.GetRate(
			ctx,
			row.CurrencyCode,
			hh.Edges.Currency.Code,
			time.Now(),
		)
		if err != nil {
			r.logger.Error(
				"Failed to get FX rate",
				"error",
				err,
				"from",
				row.CurrencyCode,
				"to",
				hh.Edges.Currency.Code,
			)
			return nil, err
		}

		convertedTotal := row.Total.Mul(rate)

		if existing, ok := categoryMap[row.CategoryID]; ok {
			existing.total = existing.total.Add(convertedTotal)
			existing.count += row.Count
		} else {
			categoryMap[row.CategoryID] = &categoryData{
				total: convertedTotal,
				count: row.Count,
			}
		}
	}

	// Load category entities and build CategoryAggregate objects
	categoryIDs := make([]int, 0, len(categoryMap))
	for catID := range categoryMap {
		categoryIDs = append(categoryIDs, catID)
	}

	categories, err := client.TransactionCategory.Query().
		Where(transactioncategory.IDIn(categoryIDs...)).
		All(ctx)
	if err != nil {
		r.logger.Error("Failed to load categories", "error", err)
		return nil, err
	}

	// Build CategoryAggregate list
	categoryAggregates := make([]*CategoryAggregate, 0, len(categories))
	grandTotal := decimal.NewFromInt(0)
	grandCount := 0

	for _, cat := range categories {
		data := categoryMap[cat.ID]
		total := data.total
		if categoryType == transactioncategory.TypeExpense {
			total = total.Abs()
		}

		categoryAggregates = append(categoryAggregates, &CategoryAggregate{
			Category:         cat,
			Total:            total.String(),
			TransactionCount: data.count,
		})

		grandTotal = grandTotal.Add(total)
		grandCount += data.count
	}

	return []*CategoryTypeAggregate{
		{
			CategoryType:     categoryType,
			Total:            grandTotal.String(),
			TransactionCount: grandCount,
			Categories:       categoryAggregates,
		},
	}, nil
}

func parseTimePeriod(period TimePeriodInput) (time.Time, time.Time) {
	// Load user's timezone
	location, err := time.LoadLocation(period.Timezone)
	if err != nil {
		// Fallback to UTC if invalid timezone
		location = time.UTC
	}

	now := time.Now().In(location)

	// If explicit dates provided, use those
	if period.StartDate != nil && period.EndDate != nil {
		return *period.StartDate, *period.EndDate
	}

	// Otherwise use preset
	if period.Preset == nil {
		// Default to all time
		return time.Time{}, now
	}

	switch *period.Preset {
	case TimePeriodPresetLast7Days:
		return now.AddDate(0, 0, -7), now
	case TimePeriodPresetLast30Days:
		return now.AddDate(0, 0, -30), now
	case TimePeriodPresetLast90Days:
		return now.AddDate(0, 0, -90), now
	case TimePeriodPresetThisMonth:
		year, month, _ := now.Date()
		start := time.Date(year, month, 1, 0, 0, 0, 0, location)
		return start, now
	case TimePeriodPresetLastMonth:
		year, month, _ := now.Date()
		start := time.Date(year, month-1, 1, 0, 0, 0, 0, location)
		end := time.Date(year, month, 1, 0, 0, 0, 0, location)
		return start, end
	case TimePeriodPresetThisYear:
		year, _, _ := now.Date()
		start := time.Date(year, 1, 1, 0, 0, 0, 0, location)
		return start, now
	case TimePeriodPresetLastYear:
		year, _, _ := now.Date()
		start := time.Date(year-1, 1, 1, 0, 0, 0, 0, location)
		end := time.Date(year, 1, 1, 0, 0, 0, 0, location)
		return start, end
	case TimePeriodPresetAllTime:
		return time.Time{}, now
	default:
		return time.Time{}, now
	}
}
