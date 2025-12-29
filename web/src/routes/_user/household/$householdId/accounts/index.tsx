import { createFileRoute } from '@tanstack/react-router'
import { usePreloadedQuery } from 'react-relay'
import { AccountsPanel } from './-components/accounts-panel'
import { routeAccounts } from './route'
import type { routeAccountsQuery } from './__generated__/routeAccountsQuery.graphql'
import { useDualPaneDisplay } from '@/hooks/use-screen-size'
import { PendingComponent } from '@/components/pending-component'

export const Route = createFileRoute('/_user/household/$householdId/accounts/')(
  {
    component: RouteComponent,
    pendingComponent: PendingComponent,
  },
)

function RouteComponent() {
  const queryRef = Route.useRouteContext()

  const data = usePreloadedQuery<routeAccountsQuery>(routeAccounts, queryRef)

  const duelPaneDisplay = useDualPaneDisplay()

  if (duelPaneDisplay) {
    return null
  }

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <AccountsPanel fragmentRef={data} />
      </div>
    </div>
  )
}
