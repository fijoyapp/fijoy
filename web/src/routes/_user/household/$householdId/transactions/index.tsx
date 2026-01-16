import { createFileRoute } from '@tanstack/react-router'
import {
  loadQuery,
  usePreloadedQuery,
  useSubscribeToInvalidationState,
} from 'react-relay'
import { TransactionsPanel } from './-components/transactions-panel'
import { useDualPaneDisplay } from '@/hooks/use-screen-size'
import { PendingComponent } from '@/components/pending-component'
import { transactionsQuery } from './-transactions-query'
import { type TransactionsQuery } from './__generated__/TransactionsQuery.graphql'
import { ROOT_ID } from 'relay-runtime'
import { environment } from '@/environment'
import { parseDateRangeFromURL } from '@/lib/date-range'

export const Route = createFileRoute(
  '/_user/household/$householdId/transactions/',
)({
  component: RouteComponent,
  pendingComponent: PendingComponent,
})

function RouteComponent() {
  const search = Route.useSearch()
  const queryRef = Route.useRouteContext()

  const data = usePreloadedQuery<TransactionsQuery>(transactionsQuery, queryRef)

  useSubscribeToInvalidationState([ROOT_ID], () => {
    const period = parseDateRangeFromURL(search.start, search.end)

    return loadQuery<TransactionsQuery>(
      environment,
      transactionsQuery,
      {
        where: {
          datetimeGTE: period.startDate,
          datetimeLT: period.endDate,
        },
        startDate: period.startDate,
        endDate: period.endDate,
      },
      { fetchPolicy: 'network-only' },
    )
  })

  const duelPaneDisplay = useDualPaneDisplay()

  if (duelPaneDisplay) {
    return null
  }

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <TransactionsPanel fragmentRef={data} />
      </div>
    </div>
  )
}
