import { graphql } from 'relay-runtime'
import { useFragment } from 'react-relay'
import { Link } from '@tanstack/react-router'
import {
  ArrowLeftRightIcon,
  BanknoteArrowDownIcon,
  BanknoteArrowUpIcon,
  TrendingUpIcon,
  WrenchIcon,
} from 'lucide-react'
import { match } from 'ts-pattern'
import currency from 'currency.js'
import type {
  TransactionCategoryType,
  categoryCardFragment$key,
} from './__generated__/categoryCardFragment.graphql'
import { cn } from '@/lib/utils'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import { useCurrency } from '@/hooks/use-currency'
import { useHousehold } from '@/hooks/use-household'

const categoryCardFragment = graphql`
  fragment categoryCardFragment on TransactionCategory {
    id
    name
    type
  }
`

type CategoryCardProps = {
  fragmentRef: categoryCardFragment$key
  total?: string
  transactionCount?: number
}

export function CategoryCard({
  fragmentRef,
  total,
  transactionCount,
}: CategoryCardProps) {
  const data = useFragment(categoryCardFragment, fragmentRef)
  const { formatCurrencyWithPrivacyMode } = useCurrency()
  const { household } = useHousehold()

  return (
    <Item
      render={
        <Link
          className="no-underline!"
          from="/household/$householdId/"
          to="/household/$householdId/categories/$categoryId"
          activeOptions={{ exact: true }}
          params={{ categoryId: data.id }}
        >
          {({ isActive }) => (
            <>
              <ItemMedia variant="image" className="rounded-full">
                {getCategoryTypeIcon({ type: data.type })}
              </ItemMedia>
              <ItemContent className="gap-px">
                <ItemTitle className={cn(isActive && 'font-semibold')}>
                  {data.name}
                </ItemTitle>
              </ItemContent>
              {total && (
                <ItemContent className="items-end gap-px">
                  <ItemTitle className="font-mono">
                    <span>
                      {formatCurrencyWithPrivacyMode({
                        value: currency(total),
                        currencyCode: household.currency.code,
                      })}
                    </span>
                  </ItemTitle>
                  {transactionCount !== undefined && (
                    <ItemDescription>
                      <span>
                        {transactionCount}{' '}
                        {transactionCount === 1
                          ? 'transaction'
                          : 'transactions'}
                      </span>
                    </ItemDescription>
                  )}
                </ItemContent>
              )}
            </>
          )}
        </Link>
      }
    ></Item>
  )
}

function getCategoryTypeIcon({ type }: { type: TransactionCategoryType }) {
  return match(type)
    .with('income', () => (
      <BanknoteArrowUpIcon className="size-10 text-white bg-green-500/90 p-1.5" />
    ))
    .with('expense', () => (
      <BanknoteArrowDownIcon className="size-10 text-white bg-red-500/90 p-1.5" />
    ))
    .with('transfer', () => (
      <ArrowLeftRightIcon className="size-10 text-white bg-orange-500/90 p-1.5" />
    ))
    .with('setup', () => (
      <WrenchIcon className="size-10 text-white bg-orange-500/90 p-1.5" />
    ))
    .with('investment', () => (
      <TrendingUpIcon className="size-10 text-white bg-blue-500/90 p-1.5" />
    ))
    .otherwise(() => null)
}
