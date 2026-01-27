import { Link } from '@tanstack/react-router'
import { PlusIcon, RefreshCwIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { graphql, useFragment, useMutation } from 'react-relay'

import { Button } from '@/components/ui/button'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/item'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCurrency } from '@/hooks/use-currency'
import { useHousehold } from '@/hooks/use-household'
import { calculateNextPaymentDate } from '@/lib/date-range'
import currency from 'currency.js'

import { SubscriptionCard } from './subscription-card'

import type { subscriptionsPanelFragment$key } from './__generated__/subscriptionsPanelFragment.graphql'
import type { subscriptionsPanelRefreshMutation } from './__generated__/subscriptionsPanelRefreshMutation.graphql'

const SubscriptionsPanelFragment = graphql`
  fragment subscriptionsPanelFragment on Query
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 50 }
    cursor: { type: "Cursor" }
  )
  @refetchable(queryName: "subscriptionsPanelRefetch") {
    recurringSubscriptions(first: $count, after: $cursor)
      @connection(key: "subscriptionsPanel_recurringSubscriptions") {
      edges {
        node {
          id
          active
          cost
          fxRate
          interval
          intervalCount
          startDate
          name
          ...subscriptionCardFragment
        }
      }
    }
  }
`

const SubscriptionsPanelRefreshMutation = graphql`
  mutation subscriptionsPanelRefreshMutation {
    refresh
  }
`

type SubscriptionsPanelProps = {
  fragmentRef: subscriptionsPanelFragment$key
}

const SORT_OPTIONS = {
  COST_HIGH: 'Cost (High to Low)',
  COST_LOW: 'Cost (Low to High)',
  NEXT_PAYMENT: 'Next Payment',
  NAME_AZ: 'Name (A-Z)',
  NAME_ZA: 'Name (Z-A)',
} as const

type SortOption = keyof typeof SORT_OPTIONS

type SummaryDisplay = 'monthly' | 'yearly' | 'count'

export function SubscriptionsPanel({ fragmentRef }: SubscriptionsPanelProps) {
  const data = useFragment(SubscriptionsPanelFragment, fragmentRef)
  const { household } = useHousehold()
  const { formatCurrencyWithPrivacyMode } = useCurrency()

  const [sortBy, setSortBy] = useState<SortOption>('COST_HIGH')
  const [summaryDisplay, setSummaryDisplay] =
    useState<SummaryDisplay>('monthly')

  const [commitRefresh, isRefreshing] =
    useMutation<subscriptionsPanelRefreshMutation>(
      SubscriptionsPanelRefreshMutation,
    )

  const handleRefresh = () => {
    commitRefresh({
      variables: {},
      onCompleted: () => {
        // Mutation will trigger refetch automatically
      },
    })
  }

  const handleSummaryClick = () => {
    setSummaryDisplay((prev) => {
      if (prev === 'monthly') return 'yearly'
      if (prev === 'yearly') return 'count'
      return 'monthly'
    })
  }

  const { monthlyAverage, yearlyAverage, activeCount, sortedSubscriptions } =
    useMemo(() => {
      // Filter active subscriptions and remove nulls
      const activeSubscriptions =
        data.recurringSubscriptions.edges
          ?.filter((edge) => edge?.node && edge.node.active)
          .map((edge) => edge!.node!)
          .filter((node) => node != null) ?? []

      // Calculate total monthly cost in household currency
      let totalMonthly = currency(0)

      for (const sub of activeSubscriptions) {
        const costInHouseholdCurrency = currency(sub.cost).multiply(sub.fxRate)

        // Convert to monthly equivalent
        let monthlyEquivalent: currency
        switch (sub.interval) {
          case 'day':
            monthlyEquivalent = costInHouseholdCurrency
              .multiply(sub.intervalCount)
              .multiply(30)
            break
          case 'week':
            monthlyEquivalent = costInHouseholdCurrency
              .multiply(sub.intervalCount)
              .multiply(4.33)
            break
          case 'month':
            monthlyEquivalent = costInHouseholdCurrency.multiply(
              sub.intervalCount,
            )
            break
          case 'year':
            monthlyEquivalent = costInHouseholdCurrency
              .multiply(sub.intervalCount)
              .divide(12)
            break
          default:
            monthlyEquivalent = currency(0)
        }

        totalMonthly = totalMonthly.add(monthlyEquivalent)
      }

      const yearlyTotal = totalMonthly.multiply(12)

      // Sort subscriptions
      const subscriptionsToSort = [...activeSubscriptions]

      subscriptionsToSort.sort((a, b) => {
        switch (sortBy) {
          case 'COST_HIGH': {
            const aCost = currency(a.cost).multiply(a.fxRate)
            const bCost = currency(b.cost).multiply(b.fxRate)
            return bCost.value - aCost.value
          }
          case 'COST_LOW': {
            const aCost = currency(a.cost).multiply(a.fxRate)
            const bCost = currency(b.cost).multiply(b.fxRate)
            return aCost.value - bCost.value
          }
          case 'NEXT_PAYMENT': {
            const aNext = calculateNextPaymentDate({
              startDate: a.startDate,
              interval: a.interval as 'day' | 'week' | 'month' | 'year',
              intervalCount: a.intervalCount,
            })
            const bNext = calculateNextPaymentDate({
              startDate: b.startDate,
              interval: b.interval as 'day' | 'week' | 'month' | 'year',
              intervalCount: b.intervalCount,
            })
            return aNext.getTime() - bNext.getTime()
          }
          case 'NAME_AZ':
            return a.name.localeCompare(b.name)
          case 'NAME_ZA':
            return b.name.localeCompare(a.name)
          default:
            return 0
        }
      })

      return {
        monthlyAverage: totalMonthly,
        yearlyAverage: yearlyTotal,
        activeCount: activeSubscriptions.length,
        sortedSubscriptions: subscriptionsToSort,
      }
    }, [data.recurringSubscriptions.edges, sortBy])

  const summaryContent = useMemo(() => {
    switch (summaryDisplay) {
      case 'monthly':
        return {
          label: 'Average Monthly Spend',
          value: formatCurrencyWithPrivacyMode({
            value: monthlyAverage,
            currencyCode: household.currency.code,
          }),
        }
      case 'yearly':
        return {
          label: 'Average Yearly Spend',
          value: formatCurrencyWithPrivacyMode({
            value: yearlyAverage,
            currencyCode: household.currency.code,
          }),
        }
      case 'count':
        return {
          label: 'Active Subscriptions',
          value: activeCount.toString(),
        }
    }
  }, [
    summaryDisplay,
    monthlyAverage,
    yearlyAverage,
    activeCount,
    formatCurrencyWithPrivacyMode,
    household.currency.code,
  ])

  return (
    <Fragment>
      <div className="fixed right-4 bottom-4 flex flex-col gap-2 lg:absolute">
        <Button
          variant="outline"
          nativeButton={true}
          size="icon-xl"
          className="bg-background dark:bg-card rounded-full"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCwIcon className={isRefreshing ? 'animate-spin' : ''} />
        </Button>
        <Link
          from={'/household/$householdId/subscriptions'}
          search={(prev) => ({ ...prev })}
          to={'/household/$householdId/subscriptions/new'}
        >
          <Button nativeButton={true} size="icon-xl" className="rounded-full">
            <PlusIcon />
          </Button>
        </Link>
      </div>

      {/* Summary Card */}
      <Item
        variant="outline"
        className="cursor-pointer"
        onClick={handleSummaryClick}
      >
        <ItemContent>
          <ItemDescription>{summaryContent.label}</ItemDescription>
          <ItemTitle className="text-2xl">{summaryContent.value}</ItemTitle>
        </ItemContent>
      </Item>

      <div className="py-2"></div>

      {/* Sort Dropdown */}
      <div className="flex items-center p-0">
        <Item size="xs" className="py-0">
          <ItemTitle>
            {activeCount <= 1
              ? `${activeCount.toString()} subscription`
              : `${activeCount.toString()} subscriptions`}
          </ItemTitle>
        </Item>
        <div className="grow"></div>
        <Select
          name="sort-subscriptions"
          value={sortBy}
          onValueChange={(value) => setSortBy(value as SortOption)}
        >
          <SelectTrigger className="w-40">
            <SelectValue>{SORT_OPTIONS[sortBy]}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {(Object.entries(SORT_OPTIONS) as [SortOption, string][]).map(
                ([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ),
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="py-2"></div>

      {/* Subscriptions List */}
      <ItemGroup className="gap-0">
        {sortedSubscriptions.map((subscription, index) => (
          <>
            {index > 0 && <ItemSeparator className="my-1" />}
            <SubscriptionCard
              key={subscription.id}
              fragmentRef={subscription}
            />
          </>
        ))}
        {sortedSubscriptions.length === 0 && (
          <div className="text-muted-foreground py-8 text-center text-sm">
            No active subscriptions
          </div>
        )}
      </ItemGroup>
    </Fragment>
  )
}
