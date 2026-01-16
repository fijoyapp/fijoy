import { PendingComponent } from '@/components/pending-component'
import { Item } from '@/components/ui/item'
import { environment } from '@/environment'
import { createFileRoute } from '@tanstack/react-router'
import {
  loadQuery,
  usePreloadedQuery,
  useSubscribeToInvalidationState,
} from 'react-relay'
import { graphql, ROOT_ID } from 'relay-runtime'
import { LogTransaction } from './-components/log-transaction'
import { type newTransactionQuery } from './__generated__/newTransactionQuery.graphql'

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
    ...logTransactionFragment
  }
`

function RouteComponent() {
  const queryRef = Route.useLoaderData()

  const data = usePreloadedQuery<newTransactionQuery>(
    newTransactionQuery,
    queryRef,
  )

  useSubscribeToInvalidationState([ROOT_ID], () => {
    return loadQuery<newTransactionQuery>(
      environment,
      newTransactionQuery,
      {},
      { fetchPolicy: 'network-only' },
    )
  })

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <Item className="p-0">
          <LogTransaction fragmentRef={data} />
        </Item>
      </div>
    </div>
  )
}
