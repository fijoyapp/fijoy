import { environment } from '@/environment'
import { createFileRoute } from '@tanstack/react-router'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'

export const Route = createFileRoute('/_user/household/accounts/')({
  component: RouteComponent,
  loader: async () => {
    return loadQuery(
      environment,
      accountsQuery,
      {},
      { fetchPolicy: 'store-or-network' },
    )
  },
})

const accountsQuery = graphql`
  query accountsQuery {
    accounts {
      id
      name
    }
  }
`

function RouteComponent() {
  const queryRef = Route.useLoaderData()

  const data = usePreloadedQuery(accountsQuery, queryRef)
  console.log(data)

  return <div>Hello "/_user/household/accounts/"!</div>
}
