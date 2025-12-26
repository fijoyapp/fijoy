import { PendingComponent } from '@/components/pending-component'
import { environment } from '@/environment'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import { type routeTransactionsQuery } from './__generated__/routeTransactionsQuery.graphql'
import { useDualPaneDisplay } from '@/hooks/use-screen-size'
import { Fragment } from 'react/jsx-runtime'
import { Separator } from '@/components/ui/separator'

export const Route = createFileRoute(
  '/_user/household/$householdId/transactions',
)({
  component: RouteComponent,
  loader: () => {
    return loadQuery<routeTransactionsQuery>(
      environment,
      routeTransactionsQuery,
      {},
      { fetchPolicy: 'store-or-network' },
    )
  },
  pendingComponent: PendingComponent,
})

const routeTransactionsQuery = graphql`
  query routeTransactionsQuery {
    transactions {
      id
    }
  }
`

function RouteComponent() {
  const queryRef = Route.useLoaderData()

  const data = usePreloadedQuery<routeTransactionsQuery>(
    routeTransactionsQuery,
    queryRef,
  )

  const duelPaneDisplay = useDualPaneDisplay()

  return (
    <Fragment>
      {duelPaneDisplay ? (
        <div className="flex h-full">
          <div className="flex-1 p-4">
            {/* <AccountsListPage fragmentRef={data} /> */}
          </div>
          <Separator orientation="vertical" className="w-px" />
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      )}
    </Fragment>
  )
}
