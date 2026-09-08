import { TransactionsTable } from './transactions-table'
import { useIsMobile } from '@/hooks/use-mobile'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { graphql } from 'relay-runtime'

import {
  usePaginationFragment,
  useSubscribeToInvalidationState,
} from 'react-relay'
import { useInView } from 'react-intersection-observer'
import { Fragment } from 'react/jsx-runtime'
import { TransactionCard } from './transaction-card'
import type { transactionsListRefetch } from './__generated__/transactionsListRefetch.graphql'
import type { transactionsListFragment$key } from './__generated__/transactionsListFragment.graphql'
import { Button } from '@/components/ui/button'
import { ItemGroup } from '@/components/ui/item'
import { NodeType, useRegisterConnection } from '@/lib/relay'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  format,
  isSameDay,
  parseISO,
  startOfDay,
  startOfToday,
  subDays,
} from 'date-fns'
const transactionsListFragment = graphql`
  fragment transactionsListFragment on Household
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 20 }
    cursor: { type: "Cursor" }
    where: { type: "TransactionWhereInput" }
    orderBy: {
      type: "TransactionOrder"
      defaultValue: { field: DATETIME, direction: DESC }
    }
  )
  @refetchable(queryName: "transactionsListRefetch") {
    id
    transactions(
      first: $count
      after: $cursor
      where: $where
      orderBy: $orderBy
    ) @connection(key: "transactionsList_transactions") {
      __id
      edges {
        node {
          id
          datetime
          ...transactionCardFragment
          ...transactionsTableFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

type TransactionsListProps = {
  fragmentRef: transactionsListFragment$key
}

export function TransactionsList({ fragmentRef }: TransactionsListProps) {
  const { data, loadNext, hasNext, isLoadingNext, refetch } =
    usePaginationFragment<
      transactionsListRefetch,
      transactionsListFragment$key
    >(transactionsListFragment, fragmentRef)

  const isMobile = useIsMobile()
  const [loadError, setLoadError] = useState<string | null>(null)
  const [direction, setDirection] = useState<'ASC' | 'DESC'>('DESC')
  const [isSorting, startTransition] = useTransition()
  const changeSort = useCallback(
    (nextDirection: 'ASC' | 'DESC') => {
      startTransition(() => {
        refetch(
          {
            orderBy: { field: 'DATETIME', direction: nextDirection },
            cursor: null,
            count: 20,
          },
          {
            fetchPolicy: 'store-and-network',
            onComplete: (error) => {
              if (error)
                toast.error('Could not sort transactions. Please try again.')
              else setLoadError(null)
            },
          },
        )
        setDirection(nextDirection)
      })
    },
    [refetch],
  )
  useEffect(() => {
    if (isMobile && direction !== 'DESC' && !isSorting) changeSort('DESC')
  }, [isMobile, direction, isSorting, changeSort])

  // Page-level invalidation refreshes DESC. Refresh the active ASC connection too.
  useSubscribeToInvalidationState([data.id], () => {
    if (direction !== 'ASC') return
    startTransition(() => {
      refetch(
        {
          cursor: null,
          count: Math.max(20, data.transactions.edges?.length ?? 0),
        },
        { fetchPolicy: 'network-only' },
      )
    })
  })

  const loadMore = useCallback(() => {
    if (isLoadingNext || isSorting || !hasNext) return
    loadNext(isMobile ? 20 : 50, {
      onComplete: (error) => {
        setLoadError(error ? 'Could not load more transactions.' : null)
      },
    })
  }, [loadNext, isMobile, isLoadingNext, isSorting, hasNext])

  useRegisterConnection(data.transactions.__id, NodeType.Transaction)

  const [ref, inView] = useInView()

  useEffect(() => {
    if (isMobile && inView && !loadError) {
      loadMore()
    }
  }, [isMobile, inView, loadError, loadMore])

  const transactions =
    data.transactions.edges?.flatMap((edge) =>
      edge?.node ? [edge.node] : [],
    ) ?? []
  const groups: { date: Date; transactions: typeof transactions }[] = []
  if (isMobile) {
    for (const transaction of transactions) {
      const date = startOfDay(parseISO(transaction.datetime))
      const last = groups[groups.length - 1]
      if (last && isSameDay(last.date, date))
        last.transactions.push(transaction)
      else groups.push({ date, transactions: [transaction] })
    }
  }

  if (!isMobile) {
    return (
      <TransactionsTable
        fragmentRef={transactions}
        direction={direction}
        onToggleSort={() => changeSort(direction === 'DESC' ? 'ASC' : 'DESC')}
        isSorting={isSorting}
        hasNext={hasNext}
        isLoadingNext={isLoadingNext}
        onLoadMore={loadMore}
        loadError={loadError}
      />
    )
  }

  return (
    <ScrollArea className="min-h-0 min-w-0 flex-1">
      <div className="min-w-0 pr-2">
        {groups.map((group) => (
          <Fragment key={group.date.toISOString()}>
            <div className="text-muted-foreground border-border border-t px-1 pt-3 pb-1.5 text-xs/relaxed font-medium tracking-[0.02em] first:border-t-0 first:pt-0">
              {formatDateHeader(group.date)}
            </div>
            <ItemGroup>
              {group.transactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  fragmentRef={transaction}
                />
              ))}
            </ItemGroup>
          </Fragment>
        ))}
        {loadError && (
          <div
            role="alert"
            className="text-muted-foreground flex items-center justify-center gap-2 py-2 text-xs"
          >
            {loadError}
            <Button
              variant="outline"
              size="sm"
              disabled={isLoadingNext}
              onClick={loadMore}
            >
              Retry
            </Button>
          </div>
        )}
        <div ref={ref}></div>
      </div>
    </ScrollArea>
  )
}

function formatDateHeader(date: Date): string {
  const today = startOfToday()
  if (isSameDay(date, today)) return 'Today'
  if (isSameDay(date, subDays(today, 1))) return 'Yesterday'
  return format(date, 'MMMM d')
}
