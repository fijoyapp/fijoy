import { Navigate, createFileRoute } from '@tanstack/react-router'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import type { householdIdQuery } from './__generated__/householdIdQuery.graphql'
import { environment } from '@/environment'
import { PendingComponent } from '@/components/pending-component'
import { LOCAL_STORAGE_HOUSEHOLD_ID_KEY } from '@/constant'

export const Route = createFileRoute('/_user/household/')({
  component: RouteComponent,
  loader: () => {
    return loadQuery<householdIdQuery>(
      environment,
      householdIdQuery,
      {},
      { fetchPolicy: 'store-and-network' },
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

  const householdId = localStorage.getItem(LOCAL_STORAGE_HOUSEHOLD_ID_KEY)

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
