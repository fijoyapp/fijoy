import { Outlet, createFileRoute } from '@tanstack/react-router'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import { Fragment } from 'react/jsx-runtime'
import { TransactionsPanel } from './-components/transactions-panel'
import type {routeTransactionsQuery} from './__generated__/routeTransactionsQuery.graphql';
import { useDualPaneDisplay } from '@/hooks/use-screen-size'
import { Separator } from '@/components/ui/separator'
import { environment } from '@/environment'
import { PendingComponent } from '@/components/pending-component'

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
    ...transactionsPanelFragment
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
        <div className="flex h-[calc(100vh-48px)]">
          <div className="flex-1 overflow-y-auto p-4">
            <TransactionsPanel fragmentRef={data} />
          </div>
          <Separator orientation="vertical" className="w-px" />
          <div className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="flex-1 p-4 ">
          <Outlet />
        </div>
      )}
    </Fragment>
  )
}
