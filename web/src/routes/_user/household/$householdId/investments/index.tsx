import { createFileRoute } from '@tanstack/react-router'
import { usePreloadedQuery } from 'react-relay'
import { InvestmentsPanel } from './-components/investments-panel'
import { routeInvestments } from './route'
import type { routeInvestmentsQuery } from './__generated__/routeInvestmentsQuery.graphql'
import { useDualPaneDisplay } from '@/hooks/use-screen-size'
import { PendingComponent } from '@/components/pending-component'

export const Route = createFileRoute(
  '/_user/household/$householdId/investments/',
)({
  component: RouteComponent,
  pendingComponent: PendingComponent,
})

function RouteComponent() {
  const queryRef = Route.useRouteContext()

  const data = usePreloadedQuery<routeInvestmentsQuery>(
    routeInvestments,
    queryRef,
  )

  const duelPaneDisplay = useDualPaneDisplay()

  if (duelPaneDisplay) {
    return null
  }

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <InvestmentsPanel fragmentRef={data} />
      </div>
    </div>
  )
}
