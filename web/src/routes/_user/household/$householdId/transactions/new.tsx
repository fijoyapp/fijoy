import { createFileRoute } from '@tanstack/react-router'
import { graphql } from 'relay-runtime'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import { NewTransaction } from './-components/new-transaction'
import type { newTransactionQuery } from './__generated__/newTransactionQuery.graphql'
import { environment } from '@/environment'
import { PendingComponent } from '@/components/pending-component'
import { Item } from '@/components/ui/item'

export const Route = createFileRoute(
  '/_user/household/$householdId/transactions/new',
)({
  component: RouteComponent,
  loader: () => {
    return loadQuery<newTransactionQuery>(
      environment,
      newTransactionQuery,
      {},
      { fetchPolicy: 'store-or-network' },
    )
  },
  pendingComponent: PendingComponent,
})

const newTransactionQuery = graphql`
  query newTransactionQuery {
    ...newTransactionFragment
  }
`

function RouteComponent() {
  const queryRef = Route.useLoaderData()

  const data = usePreloadedQuery<newTransactionQuery>(
    newTransactionQuery,
    queryRef,
  )

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <Item className="p-0">
          <NewTransaction fragmentRef={data} />
        </Item>
      </div>
    </div>
  )
}
