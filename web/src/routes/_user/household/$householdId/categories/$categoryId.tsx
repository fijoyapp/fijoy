import { createFileRoute } from '@tanstack/react-router'
import {
  loadQuery,
  usePreloadedQuery,
  useSubscribeToInvalidationState,
} from 'react-relay'
import { graphql, ROOT_ID } from 'relay-runtime'
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
      { fetchPolicy: 'store-or-network' },
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
  const params = Route.useParams()
  const search = Route.useSearch()
  const queryRef = Route.useLoaderData()

  const data = usePreloadedQuery<CategoryIdQuery>(CategoryIdQuery, queryRef)

  useSubscribeToInvalidationState([ROOT_ID], () => {
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
      { fetchPolicy: 'network-only' },
    )
  })

  return (
    <div>
      <TransactionsList fragmentRef={data} />
    </div>
  )
}
