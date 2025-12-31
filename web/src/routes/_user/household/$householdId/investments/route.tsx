import { Outlet, createFileRoute } from '@tanstack/react-router'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import { Fragment } from 'react/jsx-runtime'
import { InvestmentsPanel } from './-components/investments-panel'
import { useDualPaneDisplay } from '@/hooks/use-screen-size'
import { environment } from '@/environment'
import { PendingComponent } from '@/components/pending-component'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { InvestmentsQuery } from './__generated__/InvestmentsQuery.graphql'
import { investmentsQuery } from './-investments-query'

export const Route = createFileRoute(
  '/_user/household/$householdId/investments',
)({
  component: RouteComponent,
  beforeLoad: () => {
    return loadQuery<InvestmentsQuery>(
      environment,
      investmentsQuery,
      {},
      { fetchPolicy: 'store-or-network' },
    )
  },
  pendingComponent: PendingComponent,
})

function RouteComponent() {
  const queryRef = Route.useRouteContext()

  const data = usePreloadedQuery<InvestmentsQuery>(investmentsQuery, queryRef)

  const duelPaneDisplay = useDualPaneDisplay()

  return (
    <Fragment>
      {duelPaneDisplay ? (
        <div className="flex h-[calc(100vh-48px)]">
          <ScrollArea className="flex-1 overflow-y-auto p-4">
            <InvestmentsPanel fragmentRef={data} />
          </ScrollArea>
          <Separator orientation="vertical" className="w-px" />
          <ScrollArea
            className="flex-1 overflow-y-auto p-4"
            key={location.pathname}
          >
            <Outlet />
          </ScrollArea>
        </div>
      ) : (
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      )}
    </Fragment>
  )
}
