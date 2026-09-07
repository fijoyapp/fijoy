import { CategoryIcon } from '@/components/category-icon'
import { graphql } from 'relay-runtime'
import { useFragment } from 'react-relay'
import { Link } from '@tanstack/react-router'
import currency from 'currency.js'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'

import { useCurrency } from '@/hooks/use-currency'
import { useDisplayCurrency } from '@/hooks/use-display-currency'

import { categoryCardCategoryFragment$key } from './__generated__/categoryCardCategoryFragment.graphql'
import { categoryCardFinancialReportFragment$key } from './__generated__/categoryCardFinancialReportFragment.graphql'
import { identity } from 'lodash-es'

const categoryCardCategoryFragment = graphql`
  fragment categoryCardCategoryFragment on TransactionCategory {
    id
    name
    type
    icon
  }
`

const categoryCardFinancialReportFragment = graphql`
  fragment categoryCardFinancialReportFragment on FinancialReport {
    incomeBreakdown {
      categories {
        category {
          id
        }
        total
        transactionCount
      }
    }
    expensesBreakdown {
      categories {
        category {
          id
        }
        total
        transactionCount
      }
    }
  }
`

type CategoryCardProps = {
  categoryRef: categoryCardCategoryFragment$key
  financialReportRef: categoryCardFinancialReportFragment$key
  className?: string
}

export function CategoryCard({
  categoryRef,
  financialReportRef,
  className,
}: CategoryCardProps) {
  const category = useFragment(categoryCardCategoryFragment, categoryRef)
  const financialReport = useFragment(
    categoryCardFinancialReportFragment,
    financialReportRef,
  )
  const { formatCurrencyWithPrivacyMode } = useCurrency()
  const { displayCurrencyCode } = useDisplayCurrency()

  // Look up this category's aggregate data
  const { total, transactionCount } = useMemo(() => {
    const categoryAgg = [
      financialReport.incomeBreakdown,
      financialReport.expensesBreakdown,
    ]
      .flatMap((typeAgg) => typeAgg.categories)
      .find((c) => c.category.id === category.id)

    return categoryAgg
      ? {
          total: categoryAgg.total,
          transactionCount: categoryAgg.transactionCount,
        }
      : { total: undefined, transactionCount: undefined }
  }, [financialReport, category.id])

  return (
    <Link
      className={cn(
        'hover:bg-muted flex flex-col gap-1 rounded-md border border-transparent p-3 text-xs/relaxed no-underline! transition-colors',
        className,
      )}
      from="/household/$householdId"
      to="/household/$householdId/categories/$categoryId"
      search={identity}
      activeOptions={{ exact: true }}
      activeProps={{ className: 'border-border' }}
      params={{ categoryId: category.id }}
    >
      <div className="flex items-center gap-2">
        <CategoryIcon type={category.type} icon={category.icon} size="sm" />
        <span className="min-w-0 truncate font-medium">{category.name}</span>
      </div>
      <div className="flex items-baseline gap-2">
        {total ? (
          <span className="text-sm font-semibold tabular-nums">
            {formatCurrencyWithPrivacyMode({
              value: currency(total),
              currencyCode: displayCurrencyCode,
            })}
          </span>
        ) : (
          <span className="text-muted-foreground/40 text-[0.6875rem]">—</span>
        )}
        {transactionCount !== undefined && transactionCount > 0 && (
          <span className="text-muted-foreground text-[0.6875rem] tabular-nums">
            {transactionCount} txn{transactionCount !== 1 && 's'}
          </span>
        )}
      </div>
    </Link>
  )
}
