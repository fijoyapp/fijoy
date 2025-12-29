import { PendingComponent } from '@/components/pending-component'
import { environment } from '@/environment'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import { type routeInvestmentsQuery } from './__generated__/routeInvestmentsQuery.graphql'
import { useDualPaneDisplay } from '@/hooks/use-screen-size'
import { Fragment } from 'react/jsx-runtime'
import { InvestmentsPanel } from './-components/investments-panel'
import { Separator } from '@/components/ui/separator'

export const Route = createFileRoute(
  '/_user/household/$householdId/investments',
)({
  component: RouteComponent,
  loader: () => {
    return loadQuery<routeInvestmentsQuery>(
      environment,
      routeInvestmentsQuery,
      {},
      { fetchPolicy: 'store-or-network' },
    )
  },
  pendingComponent: PendingComponent,
})

const routeInvestmentsQuery = graphql`
  query routeInvestmentsQuery {
    ...investmentsPanelFragment
  }
`

function RouteComponent() {
  const queryRef = Route.useLoaderData()

  const data = usePreloadedQuery<routeInvestmentsQuery>(
    routeInvestmentsQuery,
    queryRef,
  )

  const duelPaneDisplay = useDualPaneDisplay()

  return (
    <Fragment>
      {duelPaneDisplay ? (
        <div className="flex h-[calc(100vh-48px)]">
          <div className="flex-1 overflow-y-auto p-4">
            <InvestmentsPanel fragmentRef={data} />
          </div>
          <Separator orientation="vertical" className="w-px" />
          <div className="flex-1 overflow-y-auto p-4" key={location.pathname}>
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
