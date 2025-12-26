import { PendingComponent } from '@/components/pending-component'
import { environment } from '@/environment'
import { createFileRoute } from '@tanstack/react-router'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import { type AccountIdQuery } from './__generated__/AccountIdQuery.graphql'
import { TransactionsList } from '../transactions/-components/transactions-list'

export const Route = createFileRoute(
  '/_user/household/$householdId/accounts/$accountId',
)({
  component: RouteComponent,
  loader: ({ params }) => {
    return loadQuery<AccountIdQuery>(
      environment,
      AccountIdQuery,
      {
        where: {
          hasTransactionEntriesWith: [
            { hasAccountWith: [{ id: params.accountId }] },
          ],
        },
      },
      { fetchPolicy: 'store-or-network' },
    )
  },
  pendingComponent: PendingComponent,
})

const AccountIdQuery = graphql`
  query AccountIdQuery($where: TransactionWhereInput) {
    ...transactionsListFragment @arguments(where: $where)
  }
`

function RouteComponent() {
  const queryRef = Route.useLoaderData()

  const data = usePreloadedQuery<AccountIdQuery>(AccountIdQuery, queryRef)

  return (
    <div>
      <TransactionsList fragmentRef={data} />
    </div>
  )
}
