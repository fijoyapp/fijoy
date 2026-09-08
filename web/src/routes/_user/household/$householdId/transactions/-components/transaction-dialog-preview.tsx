import { format } from 'date-fns'
import currency from 'currency.js'
import { graphql } from 'relay-runtime'
import { useFragment } from 'react-relay'
import { Fragment } from 'react'

import { CategoryIcon } from '@/components/category-icon'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useCurrency } from '@/hooks/use-currency'
import { useHousehold } from '@/hooks/use-household'
import { usePrivacyMode } from '@/hooks/use-privacy-mode'
import { cn } from '@/lib/utils'
import type { transactionDialogPreviewFragment$key } from './__generated__/transactionDialogPreviewFragment.graphql'

const transactionDialogPreviewFragment = graphql`
  fragment transactionDialogPreviewFragment on Transaction {
    datetime
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
        name
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
  const date = transaction
    ? format(new Date(transaction.datetime), 'LLL d')
    : ''
  const previewItems = transaction
    ? [
        ...(transaction.transactionEntries ?? []).map((entry) => ({
          type: 'entry' as const,
          id: entry.id,
          entry,
        })),
        ...(transaction.investmentLots ?? []).map((lot) => ({
          type: 'lot' as const,
          id: lot.id,
          lot,
        })),
      ]
    : []

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogDescription>
          Update transaction details. Click on entries or lots below to edit
          them individually.
        </DialogDescription>
      </DialogHeader>

      <div className="border-border [a]:hover:bg-muted group/item focus-visible:border-ring focus-visible:ring-ring/50 flex w-full flex-wrap items-center rounded-md border text-xs/relaxed outline-none focus-visible:ring-[3px]">
        {transaction
          ? previewItems.map((item, index) => (
              <Fragment key={item.id}>
                {index !== 0 && <Separator />}
                {item.type === 'entry' ? (
                  <Item
                    className={cn(
                      index !== 0 && 'rounded-t-none border-t-0',
                      index !== previewItems.length - 1 && 'rounded-b-none',
                    )}
                  >
                    <ItemMedia variant="image" className="rounded-full">
                      <CategoryIcon
                        type={transaction.category.type}
                        icon={transaction.category.icon}
                      />
                    </ItemMedia>
                    <ItemContent className="gap-px">
                      <ItemTitle>
                        <span>{transaction.category.name}</span>
                        {transaction.excludeFromReports && (
                          <Badge className="h-4 px-1.5">Excluded</Badge>
                        )}
                      </ItemTitle>
                      <ItemDescription>
                        {item.entry.account.name}
                      </ItemDescription>
                    </ItemContent>
                    <ItemContent className="items-end gap-px">
                      <ItemTitle>
                        <span className="font-semibold tabular-nums">
                          {formatCurrencyWithPrivacyMode({
                            value: item.entry.amount,
                            currencyCode:
                              item.entry.account.householdCurrency.code,
                          })}
                        </span>
                      </ItemTitle>
                      <ItemDescription>{date}</ItemDescription>
                    </ItemContent>
                  </Item>
                ) : (
                  <Item
                    className={cn(
                      index !== 0 && 'rounded-t-none border-t-0',
                      index !== previewItems.length - 1 && 'rounded-b-none',
                    )}
                  >
                    <ItemMedia variant="image">
                      <Avatar>
                        <AvatarFallback>
                          {item.lot.investment.symbol}
                        </AvatarFallback>
                      </Avatar>
                    </ItemMedia>
                    <ItemContent className="gap-px">
                      <ItemTitle>{transaction.category.name}</ItemTitle>
                      <ItemDescription>
                        {isPrivacyModeEnabled
                          ? '•••••••'
                          : quantityFormatter.format(
                              Number(item.lot.amount),
                            )}{' '}
                        {item.lot.investment.name} @{' '}
                        {formatCurrencyWithPrivacyMode({
                          value: item.lot.price,
                          currencyCode:
                            item.lot.investment.householdCurrency.code,
                        })}
                      </ItemDescription>
                    </ItemContent>
                    <ItemContent className="items-end gap-px">
                      <ItemTitle>
                        <span className="font-semibold tabular-nums">
                          {formatCurrencyWithPrivacyMode({
                            value: currency(item.lot.price, {
                              precision: 8,
                            }).multiply(
                              currency(item.lot.amount, { precision: 8 }),
                            ),
                            currencyCode:
                              item.lot.investment.householdCurrency.code,
                          })}
                        </span>
                      </ItemTitle>
                      <ItemDescription>{date}</ItemDescription>
                    </ItemContent>
                  </Item>
                )}
              </Fragment>
            ))
          : [0, 1].map((row) => (
              <Fragment key={row}>
                {row !== 0 && <Separator />}
                <Item
                  className={cn(
                    row !== 0 && 'rounded-t-none border-t-0',
                    row !== 1 && 'rounded-b-none',
                  )}
                  aria-hidden="true"
                >
                  <ItemMedia variant="image">
                    <Skeleton className="size-8 motion-reduce:animate-none" />
                  </ItemMedia>
                  <ItemContent>
                    <Skeleton className="h-3 w-20 motion-reduce:animate-none" />
                    <Skeleton className="h-3 w-28 motion-reduce:animate-none" />
                  </ItemContent>
                  <ItemContent className="items-end">
                    <Skeleton className="h-3 w-16 motion-reduce:animate-none" />
                    <Skeleton className="h-3 w-10 motion-reduce:animate-none" />
                  </ItemContent>
                </Item>
              </Fragment>
            ))}
      </div>

      <div className="space-y-4">
        <div aria-hidden="true">
          <FieldGroup>
            <PreviewField label="Description" />
            <PreviewField label="Date" />
            <PreviewField label="Category" />
            <FieldSet data-slot="transaction-dialog-preview-field">
              <FieldLegend variant="label">Options</FieldLegend>
              <FieldGroup data-slot="checkbox-group">
                <Field orientation="horizontal">
                  <PreviewButton label="Exclude from reports" />
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </div>
      </div>

      <DialogFooter aria-hidden="true">
        <PreviewButton label="Delete" variant="destructive" />
        <PreviewButton label="Save Changes" />
      </DialogFooter>

      <span className="sr-only" role="status">
        Loading transaction editing controls
      </span>
    </>
  )
}

function PreviewField({ label }: { label: string }) {
  return (
    <Field data-slot="transaction-dialog-preview-field">
      <FieldLabel>{label}</FieldLabel>
      <Skeleton className="h-7 w-full motion-reduce:animate-none" />
    </Field>
  )
}

function PreviewButton({
  label,
  variant = 'default',
}: {
  label: string
  variant?: 'default' | 'destructive'
}) {
  return (
    <Button
      type="button"
      variant={variant}
      disabled
      className="relative text-transparent"
      tabIndex={-1}
    >
      {label}
      <Skeleton className="absolute inset-0 motion-reduce:animate-none" />
    </Button>
  )
}
