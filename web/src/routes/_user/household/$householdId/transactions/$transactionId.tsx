import { createFileRoute } from '@tanstack/react-router'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import { type TransactionIdQuery } from './__generated__/TransactionIdQuery.graphql'
import { environment } from '@/environment'
import { PendingComponent } from '@/components/pending-component'
import { TransactionDetail } from './-components/transaction-detail'

export const Route = createFileRoute(
  '/_user/household/$householdId/transactions/$transactionId',
)({
  component: RouteComponent,
  loader: ({ params }) => {
    return loadQuery<TransactionIdQuery>(
      environment,
      TransactionIdQuery,
      { id: params.transactionId },
      { fetchPolicy: 'store-or-network' },
    )
  },
  pendingComponent: PendingComponent,
})

const TransactionIdQuery = graphql`
  query TransactionIdQuery($id: ID!) {
    ...transactionDetailFragment @arguments(id: $id)
  }
`

function RouteComponent() {
  const queryRef = Route.useLoaderData()
  const data = usePreloadedQuery<TransactionIdQuery>(
    TransactionIdQuery,
    queryRef,
  )

  return (
    <div>
      <TransactionDetail fragmentRef={data} />
    </div>
  )
}
