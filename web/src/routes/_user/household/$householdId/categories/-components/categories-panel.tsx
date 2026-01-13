import { fetchQuery, graphql } from 'relay-runtime'
import invariant from 'tiny-invariant'
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { useFragment } from 'react-relay'
import { capitalize, groupBy, map } from 'lodash-es'
import { Fragment } from 'react/jsx-runtime'
import { useMemo } from 'react'
import currency from 'currency.js'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowDown01Icon, ArrowUp01Icon } from '@hugeicons/core-free-icons'
import { CategoryCard } from './category-card'
import type { categoriesPanelFragment$key } from './__generated__/categoriesPanelFragment.graphql'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/item'
import { useCurrency } from '@/hooks/use-currency'
import { cn } from '@/lib/utils'
import { useHousehold } from '@/hooks/use-household'
import { CATEGORY_TYPE_LIST } from '@/constant'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import { DateRangeFilter } from './date-range-filter'
import { useSearch } from '@tanstack/react-router'
import { parseISO } from 'date-fns'
import { CategoriesQuery } from '../__generated__/CategoriesQuery.graphql'
import { environment } from '@/environment'
import { categoriesQuery } from '../-categories-query'

const CategoriesPanelFragment = graphql`
  fragment categoriesPanelFragment on Query
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 20 }
    cursor: { type: "Cursor" }
    startDate: { type: "Time" }
    endDate: { type: "Time" }
  )
  @refetchable(queryName: "categoriesPanelRefetch") {
    transactionCategories(first: $count, after: $cursor)
      @connection(key: "categoriesPanel_transactionCategories") {
      edges {
        node {
          id
          type
          ...categoryCardCategoryFragment
        }
      }
    }
    financialReport(period: { startDate: $startDate, endDate: $endDate }) {
      totalIncome
      totalExpenses
      incomeByCategoryType {
        categoryType
        total
        transactionCount
      }
      expensesByCategoryType {
        categoryType
        total
        transactionCount
      }
      ...categoryCardFinancialReportFragment
    }
  }
`

type CategoriesListPageProps = {
  fragmentRef: categoriesPanelFragment$key
}

export function CategoriesPanel({ fragmentRef }: CategoriesListPageProps) {
  const search = useSearch({ from: '/_user/household/$householdId/categories' })
  const startDate = parseISO(search.start).toISOString()
  const endDate = parseISO(search.end).toISOString()
  const data = useFragment(CategoriesPanelFragment, fragmentRef)

  const { formatCurrencyWithPrivacyMode } = useCurrency()

  const groupedCategories = useMemo(
    () =>
      groupBy(data.transactionCategories.edges, (edge) => {
        invariant(edge?.node, 'Category node is null')
        return edge.node.type
      }),
    [data.transactionCategories],
  )

  const { household } = useHousehold()

  const navigate = useNavigate()
  const { totalIncome, totalExpenses, net, savingRate } = useMemo(() => {
    const income = currency(data.financialReport.totalIncome)
    const expenses = currency(data.financialReport.totalExpenses)
    const netAmount = income.subtract(expenses)

    return {
      totalIncome: income,
      totalExpenses: expenses,
      net: netAmount,
      savingRate:
        income.value === 0
          ? ':('
          : `${((netAmount.value / income.value) * 100).toFixed(2)}%`,
    }
  }, [data.financialReport])

  // Build map for category type aggregates
  const categoryTypeMap = useMemo(() => {
    const typeMap = new Map<string, { total: string; count: number }>()

    // Process income categories
    data.financialReport.incomeByCategoryType.forEach((agg) => {
      typeMap.set(agg.categoryType, {
        total: agg.total,
        count: agg.transactionCount,
      })
    })

    // Process expense categories
    data.financialReport.expensesByCategoryType.forEach((agg) => {
      typeMap.set(agg.categoryType, {
        total: agg.total,
        count: agg.transactionCount,
      })
    })

    return typeMap
  }, [data.financialReport])

  const onDateRangeChange = async (start: string, end: string) => {
    await fetchQuery<CategoriesQuery>(environment, categoriesQuery, {
      startDate: parseISO(start).toISOString(),
      endDate: parseISO(end).toISOString(),
    }).toPromise()

    // Now navigate - the route loader will read from Relay store cache
    navigate({
      from: '/household/$householdId/categories',
      to: '/household/$householdId/categories',
      search: {
        start,
        end,
      },
    })
  }

  return (
    <Fragment>
      <div className="absolute bottom-4 right-4">
        <Link
          from={'/household/$householdId/categories'}
          to={'/household/$householdId/categories/new'}
        >
          <Button nativeButton={false} size="icon-xl" className="rounded-full">
            <PlusIcon />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Item variant="outline" className="">
          <ItemContent>
            <ItemDescription>Total Income</ItemDescription>
            <ItemTitle className="text-xl">
              {formatCurrencyWithPrivacyMode({
                value: totalIncome,
                currencyCode: household.currency.code,
              })}
            </ItemTitle>
          </ItemContent>
        </Item>
        <Item variant="outline" className="">
          <ItemContent>
            <ItemDescription>Total Expenses</ItemDescription>
            <ItemTitle className="text-xl">
              {formatCurrencyWithPrivacyMode({
                value: totalExpenses,
                currencyCode: household.currency.code,
              })}
            </ItemTitle>
          </ItemContent>
        </Item>
        <Item variant="outline" className="">
          <ItemContent>
            <ItemDescription>Net</ItemDescription>
            <ItemTitle className="text-xl">
              {formatCurrencyWithPrivacyMode({
                value: net,
                currencyCode: household.currency.code,
              })}
            </ItemTitle>
          </ItemContent>
        </Item>
        <Item variant="outline" className="">
          <ItemContent>
            <ItemDescription>Saving Rate</ItemDescription>
            <ItemTitle className="text-xl">{savingRate}</ItemTitle>
          </ItemContent>
        </Item>
      </div>
      <div className="py-2"></div>
      <DateRangeFilter
        startDate={startDate}
        endDate={endDate}
        onDateRangeChange={onDateRangeChange}
      />
      <div className="py-2"></div>
      <Accordion
        multiple
        className="w-full"
        defaultValue={[...CATEGORY_TYPE_LIST]}
      >
        {map(CATEGORY_TYPE_LIST, (type) => {
          if (type in groupedCategories === false) {
            return null
          }
          const categories = groupedCategories[type]
          const typeAggregate = categoryTypeMap.get(type)
          return (
            <AccordionItem value={type} key={type}>
              <AccordionTrigger className="justify-normal **:data-[slot=accordion-trigger-icon]:ml-0 gap-2 hover:no-underline cursor-pointer">
                <span>{capitalize(type)}</span>
                <span className="grow"></span>
                {typeAggregate && (
                  <span className="mr-3 font-mono">
                    {formatCurrencyWithPrivacyMode({
                      value: currency(typeAggregate.total),
                      currencyCode: household.currency.code,
                    })}
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent className="pb-1">
                <ItemGroup className="gap-0">
                  {categories.map((category) => {
                    invariant(category?.node, 'Category node is null')
                    return (
                      <Fragment key={category.node.id}>
                        <ItemSeparator className="my-1" />
                        <CategoryCard
                          categoryRef={category.node}
                          financialReportRef={data.financialReport}
                        />
                      </Fragment>
                    )
                  })}
                </ItemGroup>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </Fragment>
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          '**:data-[slot=accordion-trigger-icon]:text-muted-foreground gap-6 p-2 text-left text-xs/relaxed font-medium hover:underline **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 group/accordion-trigger relative flex flex-1 items-start justify-between border border-transparent transition-all outline-none disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
        {...props}
      >
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          strokeWidth={2}
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
        />
        <HugeiconsIcon
          icon={ArrowUp01Icon}
          strokeWidth={2}
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
        />
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}
