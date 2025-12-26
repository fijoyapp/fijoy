import { PendingComponent } from '@/components/pending-component'
import { environment } from '@/environment'
import { createFileRoute } from '@tanstack/react-router'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import { type transactionsQuery } from './__generated__/transactionsQuery.graphql'
import { useDualPaneDisplay } from '@/hooks/use-screen-size'

export const Route = createFileRoute(
  '/_user/household/$householdId/transactions/',
)({
  component: RouteComponent,

  loader: () => {
    return loadQuery<transactionsQuery>(
      environment,
      transactionsQuery,
      {},
      { fetchPolicy: 'store-or-network' },
    )
  },

  pendingComponent: PendingComponent,
})

const transactionsQuery = graphql`
  query transactionsQuery {
    transactions {
      id
    }
  }
`

function RouteComponent() {
  const queryRef = Route.useLoaderData()

  const data = usePreloadedQuery<transactionsQuery>(transactionsQuery, queryRef)

  const duelPaneDisplay = useDualPaneDisplay()

  if (duelPaneDisplay) {
    return null
  }

  return (
    <div className="flex h-full">
      <div className="flex-1">
        {/* <AccountsListPage fragmentRef={data} /> */}
      </div>
    </div>
  )
}
