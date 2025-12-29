import { Outlet, createFileRoute } from '@tanstack/react-router'

import { loadQuery, usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import { Fragment } from 'react/jsx-runtime'
import { AccountsPanel } from './-components/accounts-panel'
import type { routeAccountsQuery } from './__generated__/routeAccountsQuery.graphql'
import { Separator } from '@/components/ui/separator'
import { environment } from '@/environment'
import { useDualPaneDisplay } from '@/hooks/use-screen-size'
import { PendingComponent } from '@/components/pending-component'
import { ScrollArea } from '@/components/ui/scroll-area'

export const Route = createFileRoute('/_user/household/$householdId/accounts')({
  component: RouteComponent,
  beforeLoad: () => {
    return loadQuery<routeAccountsQuery>(
      environment,
      routeAccounts,
      {},
      { fetchPolicy: 'store-or-network' },
    )
  },
  pendingComponent: PendingComponent,
})

export const routeAccounts = graphql`
  query routeAccountsQuery {
    ...accountsPanelFragment
  }
`

function RouteComponent() {
  const queryRef = Route.useRouteContext()

  const data = usePreloadedQuery<routeAccountsQuery>(routeAccounts, queryRef)

  const duelPaneDisplay = useDualPaneDisplay()

  return (
    <Fragment>
      {duelPaneDisplay ? (
        <div className="flex h-[calc(100vh-48px)]">
          <ScrollArea className="flex-1 overflow-y-auto p-4">
            <AccountsPanel fragmentRef={data} />
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
