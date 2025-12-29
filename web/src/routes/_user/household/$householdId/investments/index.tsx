import { PendingComponent } from '@/components/pending-component'
import { environment } from '@/environment'
import { createFileRoute } from '@tanstack/react-router'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import { type investmentsQuery } from './__generated__/investmentsQuery.graphql'
import { useDualPaneDisplay } from '@/hooks/use-screen-size'
import { InvestmentsPanel } from './-components/investments-panel'

export const Route = createFileRoute(
  '/_user/household/$householdId/investments/',
)({
  component: RouteComponent,
  loader: () => {
    return loadQuery<investmentsQuery>(
      environment,
      investmentsQuery,
      {},
      { fetchPolicy: 'store-or-network' },
    )
  },
  pendingComponent: PendingComponent,
})

const investmentsQuery = graphql`
  query investmentsQuery {
    ...investmentsPanelFragment
  }
`

function RouteComponent() {
  const queryRef = Route.useLoaderData()

  const data = usePreloadedQuery<investmentsQuery>(investmentsQuery, queryRef)

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
