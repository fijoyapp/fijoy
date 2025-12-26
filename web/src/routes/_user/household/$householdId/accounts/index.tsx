import { createFileRoute } from '@tanstack/react-router'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import { AccountsPanel } from './-components/accounts-panel'
import type { accountsQuery } from './__generated__/accountsQuery.graphql'
import { environment } from '@/environment'
import { useDualPaneDisplay } from '@/hooks/use-screen-size'
import { PendingComponent } from '@/components/pending-component'

export const Route = createFileRoute('/_user/household/$householdId/accounts/')(
  {
    component: RouteComponent,

    loader: () => {
      return loadQuery<accountsQuery>(
        environment,
        accountsQuery,
        {},
        { fetchPolicy: 'store-or-network' },
      )
    },

    pendingComponent: PendingComponent,
  },
)

const accountsQuery = graphql`
  query accountsQuery {
    ...accountsPanelFragment
  }
`

function RouteComponent() {
  const queryRef = Route.useLoaderData()

  const data = usePreloadedQuery<accountsQuery>(accountsQuery, queryRef)

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
