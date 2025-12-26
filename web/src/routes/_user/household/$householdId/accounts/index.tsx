import { createFileRoute } from '@tanstack/react-router'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import { AccountsListPage } from './-components/accounts-list-page'
import type { accountsQuery } from './__generated__/accountsQuery.graphql'
import { environment } from '@/environment'
import { useDualPaneDisplay } from '@/hooks/use-screen-size'

export const Route = createFileRoute('/_user/household/$householdId/accounts/')({
  component: RouteComponent,

  loader: () => {
    return loadQuery<accountsQuery>(
      environment,
      accountsQuery,
      {},
      { fetchPolicy: 'store-or-network' },
    )
  },
})

const accountsQuery = graphql`
  query accountsQuery {
    ...accountsListPageFragment
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
        <AccountsListPage fragmentRef={data} />
      </div>
    </div>
  )
}
