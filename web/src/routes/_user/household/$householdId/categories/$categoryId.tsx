import { createFileRoute } from '@tanstack/react-router'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import type { CategoryIdQuery } from './__generated__/CategoryIdQuery.graphql'
import { environment } from '@/environment'
import { PendingComponent } from '@/components/pending-component'
import { TransactionsList } from '../transactions/-components/transactions-list'
import { parseDateRangeFromURL } from '@/lib/date-range'

export const Route = createFileRoute(
  '/_user/household/$householdId/categories/$categoryId',
)({
  component: RouteComponent,
  loaderDeps: ({ search }) => search,
  loader: ({ params, deps: search }) => {
    const period = parseDateRangeFromURL(search.start, search.end)
    return loadQuery<CategoryIdQuery>(
      environment,
      CategoryIdQuery,
      {
        where: {
          hasCategoryWith: [{ id: params.categoryId }],
          datetimeGTE: period.startDate,
          datetimeLT: period.endDate,
        },
      },
      { fetchPolicy: 'store-and-network' },
    )
  },
  pendingComponent: PendingComponent,
})

const CategoryIdQuery = graphql`
  query CategoryIdQuery($where: TransactionWhereInput) {
    ...transactionsListFragment @arguments(where: $where)
  }
`

function RouteComponent() {
  const queryRef = Route.useLoaderData()

  const data = usePreloadedQuery<CategoryIdQuery>(CategoryIdQuery, queryRef)

  return (
    <div>
      <TransactionsList fragmentRef={data} />
    </div>
  )
}
