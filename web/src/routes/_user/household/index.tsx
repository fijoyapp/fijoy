import { PendingComponent } from '@/components/pending-component'
import { environment } from '@/environment'
import { createFileRoute, Navigate } from '@tanstack/react-router'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import { type householdIdQuery } from './__generated__/householdIdQuery.graphql'

export const Route = createFileRoute('/_user/household/')({
  component: RouteComponent,
  loader: () => {
    return loadQuery<householdIdQuery>(
      environment,
      householdIdQuery,
      {},
      { fetchPolicy: 'store-or-network' },
    )
  },
  pendingComponent: PendingComponent,
})

const householdIdQuery = graphql`
  query householdIdQuery {
    households {
      id
    }
  }
`

function RouteComponent() {
  const queryRef = Route.useLoaderData()
  const data = usePreloadedQuery<householdIdQuery>(householdIdQuery, queryRef)

  const householdId = localStorage.getItem('householdId')

  if (householdId && data.households.some((h) => h.id === householdId)) {
    return <Navigate to={'/household/$householdId'} params={{ householdId }} />
  }

  if (data.households.length > 0) {
    return (
      <Navigate
        to={'/household/$householdId'}
        params={{ householdId: data.households[0].id }}
      />
    )
  }

  return <Navigate to="/household/new" />
}
