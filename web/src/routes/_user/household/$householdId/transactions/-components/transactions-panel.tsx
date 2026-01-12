import { fetchQuery, graphql } from 'relay-runtime'
import { useFragment } from 'react-relay'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { parseISO } from 'date-fns'
import { TransactionsList } from './transactions-list'
import type { transactionsPanelFragment$key } from './__generated__/transactionsPanelFragment.graphql'
import { DateRangeFilter } from '../../categories/-components/date-range-filter'
import { environment } from '@/environment'
import { TransactionsQuery } from '../__generated__/TransactionsQuery.graphql'
import { transactionsQuery } from '../-transactions-query'

const transactionsPanelFragment = graphql`
  fragment transactionsPanelFragment on Query
  @argumentDefinitions(where: { type: "TransactionWhereInput" }) {
    ...transactionsListFragment @arguments(where: $where)
  }
`

type TransactionsPanelProps = {
  fragmentRef: transactionsPanelFragment$key
}

export function TransactionsPanel({ fragmentRef }: TransactionsPanelProps) {
  const search = useSearch({
    from: '/_user/household/$householdId/transactions',
  })
  const startDate = parseISO(search.start).toISOString()
  const endDate = parseISO(search.end).toISOString()
  const navigate = useNavigate()

  const data = useFragment(transactionsPanelFragment, fragmentRef)

  const onDateRangeChange = async (start: string, end: string) => {
    await fetchQuery<TransactionsQuery>(environment, transactionsQuery, {
      where: {
        datetimeGTE: parseISO(start).toISOString(),
        datetimeLT: parseISO(end).toISOString(),
      },
    }).toPromise()

    // Now navigate - the route loader will read from Relay store cache
    navigate({
      from: '/household/$householdId/transactions',
      to: '/household/$householdId/transactions',
      search: {
        start,
        end,
      },
    })
  }

  return (
    <div>
      <DateRangeFilter
        startDate={startDate}
        endDate={endDate}
        onDateRangeChange={onDateRangeChange}
      />
      <div className="py-2"></div>
      <TransactionsList fragmentRef={data} />
    </div>
  )
}
