import { useEffect, useState, type ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'
import { graphql, useFragment } from 'react-relay'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Columns3Icon,
  WalletIcon,
  ListFilterIcon,
} from 'lucide-react'
import { CategoryIcon } from '@/components/category-icon'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { getLogoDomainURL } from '@/lib/logo'
import { format, isToday, isYesterday } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { useCurrency } from '@/hooks/use-currency'
import { usePrivacyMode } from '@/hooks/use-privacy-mode'
import { useHousehold } from '@/hooks/use-household'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import type {
  transactionsTableFragment$key,
  transactionsTableFragment$data,
} from './__generated__/transactionsTableFragment.graphql'

const fragment = graphql`
  fragment transactionsTableFragment on Transaction @relay(plural: true) {
    id
    datetime
    description
    excludeFromReports
    category {
      icon
      type
      name
    }
    user {
      name
    }
    transactionEntries {
      id
      amount
      account {
        icon
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
        account {
          icon
          name
        }
        householdCurrency {
          code
        }
      }
    }
  }
`

type Transaction = transactionsTableFragment$data[number]
type Props = {
  fragmentRef: transactionsTableFragment$key
  direction: 'ASC' | 'DESC'
  onToggleSort: () => void
  isSorting: boolean
  hasNext: boolean
  isLoadingNext: boolean
  loadError: string | null
  onLoadMore: () => void
}

const LABELS = {
  date: 'Date',
  description: 'Transaction',
  movement: 'Account / Movement',
  amount: 'Amount',
  owner: 'Member',
} as const
type ColumnId = keyof typeof LABELS

export function TransactionsTable({
  fragmentRef,
  direction,
  onToggleSort,
  isSorting,
  hasNext,
  isLoadingNext,
  onLoadMore,
  loadError,
}: Props) {
  const transactions = useFragment(fragment, fragmentRef)
  const navigate = useNavigate()
  const { formatCurrencyWithPrivacyMode } = useCurrency()
  const { isPrivacyModeEnabled } = usePrivacyMode()
  const { household } = useHousehold()
  const [columnVisibility, setColumnVisibility] = useState<
    Partial<Record<ColumnId, boolean>>
  >({})
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(
    null,
  )
  const { ref: loadMoreRef, inView } = useInView({
    root: scrollContainer,
    rootMargin: '0px 0px 160px 0px',
  })
  useEffect(() => {
    if (
      scrollContainer &&
      inView &&
      hasNext &&
      !isLoadingNext &&
      !isSorting &&
      !loadError
    )
      onLoadMore()
  }, [
    scrollContainer,
    inView,
    hasNext,
    isLoadingNext,
    isSorting,
    loadError,
    onLoadMore,
  ])
  const quantityFormatter = new Intl.NumberFormat(household.locale, {
    maximumFractionDigits: 8,
    signDisplay: 'exceptZero',
  })
  const columns: {
    id: ColumnId
    header: ReactNode
    enableHiding?: boolean
    cell: (transaction: Transaction) => ReactNode
  }[] = [
    {
      id: 'date',
      enableHiding: false,
      header: (
        <button
          type="button"
          onClick={() => {
            scrollContainer?.scrollTo({ top: 0 })
            onToggleSort()
          }}
          disabled={isSorting || isLoadingNext}
          className="focus-visible:outline-ring inline-flex h-7 items-center gap-1 font-medium focus-visible:outline-2"
          aria-label={`Date, ${direction === 'DESC' ? 'newest' : 'oldest'} first. Sort ${direction === 'DESC' ? 'oldest' : 'newest'} first`}
        >
          Date{' '}
          {direction === 'DESC' ? (
            <ArrowDownIcon className="size-3" aria-hidden="true" />
          ) : (
            <ArrowUpIcon className="size-3" aria-hidden="true" />
          )}
        </button>
      ),
      cell: (transaction) => (
        <time
          dateTime={transaction.datetime}
          className="block w-[13ch] whitespace-nowrap tabular-nums"
        >
          {isToday(new Date(transaction.datetime))
            ? 'Today'
            : isYesterday(new Date(transaction.datetime))
              ? 'Yesterday'
              : format(new Date(transaction.datetime), 'MMM d, yyyy')}
        </time>
      ),
    },
    {
      id: 'description',
      enableHiding: false,
      header: 'Transaction',
      cell: (transaction) => {
        const { category } = transaction
        return (
          <div className="flex min-w-0 items-center gap-2 xl:gap-3">
            <CategoryIcon type={category.type} icon={category.icon} />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <div className="flex min-w-0 items-center gap-2">
                <Link
                  to="."
                  resetScroll={false}
                  search={(search) => ({
                    ...search,
                    edit_transaction_id: transaction.id,
                  })}
                  className="focus-visible:outline-ring block min-w-0 truncate text-sm font-medium focus-visible:outline-2"
                  title={category.name}
                >
                  {category.name}
                </Link>
                {transaction.excludeFromReports && (
                  <Badge
                    variant="outline"
                    className="text-muted-foreground px-1 py-0 font-normal"
                  >
                    Excluded
                  </Badge>
                )}
              </div>
              {transaction.description && (
                <span
                  className="text-muted-foreground block min-w-0 truncate"
                  title={transaction.description}
                >
                  {transaction.description}
                </span>
              )}
            </div>
          </div>
        )
      },
    },
    {
      id: 'movement',
      header: 'Account / Movement',
      cell: (transaction) => (
        <div className="flex min-w-0 flex-col gap-1 overflow-hidden">
          {transaction.transactionEntries?.map((entry) => (
            <AccountMovement key={entry.id} account={entry.account} />
          ))}
          {transaction.investmentLots?.map((lot) => (
            <AccountMovement
              key={lot.id}
              account={lot.investment.account}
              symbol={lot.investment.symbol}
            />
          ))}
        </div>
      ),
    },
    {
      id: 'amount',
      header: 'Amount',
      enableHiding: false,
      cell: (transaction) => (
        <div className="flex min-w-0 flex-col gap-1 overflow-hidden text-right whitespace-nowrap tabular-nums">
          {transaction.transactionEntries?.map((entry) => (
            <span
              key={entry.id}
              className="flex h-7 min-w-0 items-center justify-end gap-1 overflow-hidden font-medium"
            >
              {formatCurrencyWithPrivacyMode({
                value: entry.amount,
                currencyCode: entry.account.householdCurrency.code,
              })}{' '}
              <span className="text-muted-foreground">
                {entry.account.householdCurrency.code}
              </span>
            </span>
          ))}
          {transaction.investmentLots?.map((lot) => (
            <span
              key={lot.id}
              className="flex h-7 min-w-0 items-center justify-end gap-1 overflow-hidden font-medium"
            >
              {isPrivacyModeEnabled
                ? '•••••••'
                : quantityFormatter.format(Number(lot.amount))}{' '}
              <span className="text-muted-foreground">
                {lot.investment.symbol} @{' '}
              </span>
              {formatCurrencyWithPrivacyMode({
                value: lot.price,
                currencyCode: lot.investment.householdCurrency.code,
              })}{' '}
              <span className="text-muted-foreground">
                {lot.investment.householdCurrency.code}
              </span>
            </span>
          ))}
        </div>
      ),
    },
    {
      id: 'owner',
      header: 'Member',
      cell: (transaction) => (
        <div
          className="flex min-w-0 items-center gap-1.5 xl:gap-2"
          title={transaction.user.name}
        >
          <Avatar size="sm">
            <AvatarFallback className="text-[10px]">
              {transaction.user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground block min-w-0 truncate">
            {transaction.user.name}
          </span>
        </div>
      ),
    },
  ]
  const visibleColumns = columns.filter(
    (column) => columnVisibility[column.id] !== false,
  )

  return (
    <section
      aria-label="Transactions"
      aria-busy={isSorting || isLoadingNext}
      className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 overflow-hidden"
    >
      <div className="flex items-center justify-between gap-2">
        <p
          className="text-muted-foreground flex items-center gap-2 text-xs"
          role="status"
        >
          <ListFilterIcon className="size-3.5" aria-hidden="true" />
          {isSorting
            ? 'Sorting transactions…'
            : `${transactions.length} transaction${transactions.length === 1 ? '' : 's'}${hasNext ? ' loaded' : ''}`}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button type="button" variant="outline" size="sm" />}
          >
            <Columns3Icon data-icon="inline-start" />
            Columns
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              {columns
                .filter((column) => column.enableHiding !== false)
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={columnVisibility[column.id] !== false}
                    onCheckedChange={(checked) =>
                      setColumnVisibility((previous) => ({
                        ...previous,
                        [column.id]: checked,
                      }))
                    }
                  >
                    {LABELS[column.id]}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ScrollArea
        viewportRef={setScrollContainer}
        scrollbars="both"
        className="border-border min-h-0 min-w-0 flex-1 border-y"
      >
        <table className="w-full table-fixed border-separate border-spacing-0 text-xs">
          <caption className="sr-only">
            Transactions. Open a transaction to view or edit its details.
            Investment amounts show quantity and price per unit.
          </caption>
          <thead className="bg-background sticky top-0 z-10">
            <tr>
              {visibleColumns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  aria-sort={
                    column.id === 'date'
                      ? direction === 'DESC'
                        ? 'descending'
                        : 'ascending'
                      : undefined
                  }
                  className={cn(
                    'border-border text-muted-foreground overflow-hidden border-b px-2 py-1.5 text-left font-medium whitespace-nowrap lg:px-3 xl:px-4',
                    column.id === 'date' && 'w-[16%]',
                    column.id === 'description' && 'w-[24%]',
                    column.id === 'movement' && 'w-[27%]',
                    column.id === 'amount' && 'w-[21%] text-right',
                    column.id === 'owner' && 'w-[12%]',
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-muted/50 focus-within:bg-muted cursor-pointer transition-colors duration-100 motion-reduce:transition-none"
                onClick={(event) => {
                  if (
                    (event.target instanceof Element &&
                      event.target.closest('a, button, input')) ||
                    window.getSelection()?.toString()
                  )
                    return
                  if (isSorting) return
                  navigate({
                    to: '.',
                    resetScroll: false,
                    search: (search) => ({
                      ...search,
                      edit_transaction_id: transaction.id,
                    }),
                  })
                }}
              >
                {visibleColumns.map((column) => (
                  <td
                    key={column.id}
                    className="border-border/60 overflow-hidden border-b px-2 py-3 align-middle lg:px-3 xl:px-4"
                  >
                    {column.cell(transaction)}
                  </td>
                ))}
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td
                  colSpan={visibleColumns.length}
                  className="text-muted-foreground px-3 py-10 text-center"
                >
                  No transactions in this date range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {hasNext && (
          <div
            ref={loadMoreRef}
            className="text-muted-foreground flex h-9 items-center justify-center text-xs"
            role="status"
          >
            {loadError ? (
              <div role="alert" className="flex items-center gap-2">
                {loadError}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isLoadingNext}
                  onClick={onLoadMore}
                >
                  Retry
                </Button>
              </div>
            ) : isLoadingNext ? (
              'Loading more transactions…'
            ) : null}
          </div>
        )}
      </ScrollArea>
    </section>
  )
}

function AccountMovement({
  account,
  symbol,
}: {
  account: { name: string; icon?: string | null }
  symbol?: string
}) {
  return (
    <div
      className="flex h-8 min-w-0 items-center gap-2 overflow-hidden"
      title={`${account.name}${symbol ? ` · ${symbol}` : ''}`}
    >
      <Avatar>
        {account.icon && (
          <AvatarImage src={getLogoDomainURL(account.icon)} alt="" />
        )}
        <AvatarFallback>
          <WalletIcon className="size-4" aria-hidden="true" />
        </AvatarFallback>
      </Avatar>
      <span className="block min-w-0 truncate">
        {account.name}
        {symbol && <span className="text-muted-foreground"> · {symbol}</span>}
      </span>
    </div>
  )
}
