import { format } from 'date-fns'
import { graphql } from 'relay-runtime'
import { useFragment } from 'react-relay'

import { CategoryIcon } from '@/components/category-icon'
import { Badge } from '@/components/ui/badge'
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useCurrency } from '@/hooks/use-currency'
import { useHousehold } from '@/hooks/use-household'
import { usePrivacyMode } from '@/hooks/use-privacy-mode'
import type { transactionDialogPreviewFragment$key } from './__generated__/transactionDialogPreviewFragment.graphql'

const transactionDialogPreviewFragment = graphql`
  fragment transactionDialogPreviewFragment on Transaction {
    datetime
    description
    excludeFromReports
    category {
      icon
      name
      type
    }
    transactionEntries {
      id
      amount
      account {
        name
        householdCurrency {
          code
        }
      }
    }
    investmentLots {
      id
      amount
      price
      investment {
        symbol
        householdCurrency {
          code
        }
      }
    }
  }
`

type TransactionDialogPreviewProps = {
  fragmentRef: transactionDialogPreviewFragment$key | null
}

export function TransactionDialogPreview({
  fragmentRef,
}: TransactionDialogPreviewProps) {
  const transaction = useFragment(transactionDialogPreviewFragment, fragmentRef)
  const { formatCurrencyWithPrivacyMode } = useCurrency()
  const { household } = useHousehold()
  const { isPrivacyModeEnabled } = usePrivacyMode()
  const quantityFormatter = new Intl.NumberFormat(household.locale, {
    maximumFractionDigits: 8,
    signDisplay: 'exceptZero',
  })

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogDescription>
          {transaction ? (
            <>
              {transaction.description || transaction.category.name}
              {' · '}
              <time dateTime={transaction.datetime}>
                {format(new Date(transaction.datetime), 'LLL d, yyyy')}
              </time>
            </>
          ) : (
            'Retrieving transaction details.'
          )}
        </DialogDescription>
      </DialogHeader>

      {transaction ? (
        <div className="border-border divide-border divide-y border">
          <div className="flex items-center gap-2 px-3 py-2">
            <CategoryIcon
              type={transaction.category.type}
              icon={transaction.category.icon}
            />
            <span className="font-medium">{transaction.category.name}</span>
            {transaction.excludeFromReports && (
              <Badge
                variant="outline"
                className="text-muted-foreground ml-auto px-1 py-0 font-normal"
              >
                Excluded
              </Badge>
            )}
          </div>
          {transaction.transactionEntries?.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between gap-4 px-3 py-2"
            >
              <span className="min-w-0 truncate">{entry.account.name}</span>
              <span className="shrink-0 font-medium tabular-nums">
                {formatCurrencyWithPrivacyMode({
                  value: entry.amount,
                  currencyCode: entry.account.householdCurrency.code,
                })}{' '}
                <span className="text-muted-foreground font-normal">
                  {entry.account.householdCurrency.code}
                </span>
              </span>
            </div>
          ))}
          {transaction.investmentLots?.map((lot) => (
            <div
              key={lot.id}
              className="flex items-center justify-between gap-4 px-3 py-2"
            >
              <span className="min-w-0 truncate">{lot.investment.symbol}</span>
              <span className="shrink-0 font-medium tabular-nums">
                {isPrivacyModeEnabled
                  ? '•••••••'
                  : quantityFormatter.format(Number(lot.amount))}{' '}
                <span className="text-muted-foreground font-normal">
                  {lot.investment.symbol} @{' '}
                </span>
                {formatCurrencyWithPrivacyMode({
                  value: lot.price,
                  currencyCode: lot.investment.householdCurrency.code,
                })}{' '}
                <span className="text-muted-foreground font-normal">
                  {lot.investment.householdCurrency.code}
                </span>
              </span>
            </div>
          ))}
        </div>
      ) : (
        <Skeleton className="h-20 w-full motion-reduce:animate-none" />
      )}

      <span className="sr-only" role="status">
        Loading transaction editing controls
      </span>
      <div className="grid gap-4" aria-hidden="true">
        <div className="grid gap-2">
          <Skeleton className="h-3 w-20 motion-reduce:animate-none" />
          <Skeleton className="h-7 w-full motion-reduce:animate-none" />
        </div>
        <div className="grid gap-2">
          <Skeleton className="h-3 w-12 motion-reduce:animate-none" />
          <Skeleton className="h-7 w-full motion-reduce:animate-none" />
        </div>
        <div className="mt-2 flex justify-end gap-2">
          <Skeleton className="h-7 w-16 motion-reduce:animate-none" />
          <Skeleton className="h-7 w-24 motion-reduce:animate-none" />
        </div>
      </div>
    </>
  )
}
