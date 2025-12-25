import { createFileRoute, Outlet } from '@tanstack/react-router'

import { environment } from '@/environment'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import { Separator } from '@/components/ui/separator'
import { AccountsListPage } from './-components/accounts-list-page'
import { type routeAccountsQuery } from './__generated__/routeAccountsQuery.graphql'

export const Route = createFileRoute('/_user/household/accounts')({
  component: RouteComponent,

  loader: async () => {
    return loadQuery<routeAccountsQuery>(
      environment,
      routeAccountsQuery,
      {},
      { fetchPolicy: 'store-or-network' },
    )
  },
})

const routeAccountsQuery = graphql`
  query routeAccountsQuery {
    ...accountsListPageFragment
  }
`

function RouteComponent() {
  const queryRef = Route.useLoaderData()

  const data = usePreloadedQuery<routeAccountsQuery>(
    routeAccountsQuery,
    queryRef,
  )

  return (
    <div className="flex h-full">
      <div className="flex-1 p-4">
        <AccountsListPage fragmentRef={data} />
      </div>
      <Separator orientation="vertical" className="w-px" />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  )
}
