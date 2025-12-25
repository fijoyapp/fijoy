import { Outlet, createFileRoute } from '@tanstack/react-router'

import { loadQuery, usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import { AccountsListPage } from './-components/accounts-list-page'
import type { routeAccountsQuery } from './__generated__/routeAccountsQuery.graphql'
import { Separator } from '@/components/ui/separator'
import { environment } from '@/environment'
import { useScreenSize } from '@/hooks/use-screen-size'
import { Fragment } from 'react/jsx-runtime'
import { useMemo } from 'react'

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

  const size = useScreenSize()

  const data = usePreloadedQuery<routeAccountsQuery>(
    routeAccountsQuery,
    queryRef,
  )

  const displayTwoPanes = useMemo(() => size.greaterThan('md'), [size])

  return (
    <Fragment>
      {displayTwoPanes ? (
        <div className="flex h-full">
          <div className="flex-1 p-4">
            <AccountsListPage fragmentRef={data} />
          </div>
          <Separator orientation="vertical" className="w-px" />
          <div className="flex-1 p-4">
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
