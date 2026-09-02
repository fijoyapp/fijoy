import { graphql } from 'relay-runtime'

import { useMemo } from 'react'
import { usePaginationFragment } from 'react-relay'
import { useInView } from 'react-intersection-observer'
import { Fragment } from 'react/jsx-runtime'
import { useEffect } from 'react'
import { TransactionCard } from './transaction-card'
import type { transactionsListFragment$key } from './__generated__/transactionsListFragment.graphql'
import { ItemGroup } from '@/components/ui/item'
import { NodeType, useRegisterConnection } from '@/lib/relay'
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
  )
  @refetchable(queryName: "transactionsListRefetch") {
    transactions(
      first: $count
      after: $cursor
      where: $where
      orderBy: { field: DATETIME, direction: DESC }
    ) @connection(key: "transactionsList_transactions") {
      __id
      edges {
        node {
          id
          datetime
          ...transactionCardFragment
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
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    transactionsListFragment,
    fragmentRef,
  )

  useRegisterConnection(data.transactions.__id, NodeType.Transaction)

  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView && hasNext && !isLoadingNext) {
      loadNext(20)
    }
  }, [inView, hasNext, isLoadingNext, loadNext])

  const groups = useMemo(() => {
    const edges = data.transactions.edges ?? []
    const result: { date: Date; edges: Array<(typeof edges)[number]> }[] = []

    for (const edge of edges) {
      if (!edge?.node?.datetime) continue
      const date = startOfDay(parseISO(edge.node.datetime))
      const last = result[result.length - 1]

      if (last && isSameDay(last.date, date)) {
        last.edges = [...last.edges, edge]
      } else {
        result.push({ date, edges: [edge] })
      }
    }

    return result
  }, [data.transactions.edges])

  return (
    <Fragment>
      {groups.map((group) => (
        <Fragment key={group.date.toISOString()}>
          <div className="text-muted-foreground border-border border-t px-1 pt-3 pb-1.5 text-xs/relaxed font-medium tracking-[0.02em] first:border-t-0 first:pt-0">
            {formatDateHeader(group.date)}
          </div>
          <ItemGroup>
            {group.edges.map((edge) => (
              <Fragment key={edge!.node!.id}>
                <TransactionCard fragmentRef={edge!.node!} />
              </Fragment>
            ))}
          </ItemGroup>
        </Fragment>
      ))}
      <div ref={ref}></div>
    </Fragment>
  )
}

function formatDateHeader(date: Date): string {
  const today = startOfToday()
  if (isSameDay(date, today)) return 'Today'
  if (isSameDay(date, subDays(today, 1))) return 'Yesterday'
  return format(date, 'MMMM d')
}
