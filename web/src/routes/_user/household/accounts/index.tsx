import { environment } from '@/environment'
import { useScreenSize } from '@/hooks/use-screen-size'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import { type accountsQuery } from './__generated__/accountsQuery.graphql'
import { AccountsListPage } from './-components/accounts-list-page'

export const Route = createFileRoute('/_user/household/accounts/')({
  component: RouteComponent,

  loader: async () => {
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

  const size = useScreenSize()
  const displayTwoPanes = useMemo(() => size.greaterThan('md'), [size])

  if (displayTwoPanes) {
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
