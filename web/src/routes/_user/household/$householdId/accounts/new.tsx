import { createFileRoute } from '@tanstack/react-router'
import { NewAccount } from './-components/new-account'
import { graphql } from 'relay-runtime'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import { environment } from '@/environment'
import { type newAccountQuery } from './__generated__/newAccountQuery.graphql'
import { PendingComponent } from '@/components/pending-component'

export const Route = createFileRoute(
  '/_user/household/$householdId/accounts/new',
)({
  component: RouteComponent,
  loader: () => {
    return loadQuery<newAccountQuery>(
      environment,
      newAccountQuery,
      {},
      { fetchPolicy: 'store-or-network' },
    )
  },
  pendingComponent: PendingComponent,
})

const newAccountQuery = graphql`
  query newAccountQuery {
    ...newAccountFragment
  }
`

function RouteComponent() {
  const queryRef = Route.useLoaderData()

  const data = usePreloadedQuery<newAccountQuery>(newAccountQuery, queryRef)

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <NewAccount fragmentRef={data} />
      </div>
    </div>
  )
}
