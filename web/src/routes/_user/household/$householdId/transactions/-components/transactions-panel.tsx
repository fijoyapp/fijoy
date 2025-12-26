import { graphql } from 'relay-runtime'
import { transactionsPanelFragment$key } from './__generated__/transactionsPanelFragment.graphql'
import { usePaginationFragment } from 'react-relay'
import { useInView } from 'react-intersection-observer'
import { Fragment } from 'react/jsx-runtime'
import { TransactionCard } from './transaction-card'
import { useEffect } from 'react'

const transactionsPanelFragment = graphql`
  fragment transactionsPanelFragment on Query
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 20 }
    cursor: { type: "Cursor" }
  )
  @refetchable(queryName: "transactionsPanelPagination") {
    transactions(first: $count, after: $cursor)
      @connection(key: "transactionsPanel_transactions") {
      edges {
        node {
          id
          ...transactionCardFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

type TransactionsPanelProps = {
  fragmentRef: transactionsPanelFragment$key
}

export function TransactionsPanel({ fragmentRef }: TransactionsPanelProps) {
  const { data, loadNext, hasNext, isLoadingNext, refetch } =
    usePaginationFragment(transactionsPanelFragment, fragmentRef)

  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView && hasNext && !isLoadingNext) {
      loadNext(20)
    }
  }, [inView, hasNext, isLoadingNext, loadNext])

  return (
    <div>
      {data.transactions.edges?.map((transaction) => {
        if (!transaction?.node) {
          return null
        }

        return (
          <Fragment key={transaction.node.id}>
            <TransactionCard fragmentRef={transaction.node} />
          </Fragment>
        )
      })}
      <div ref={ref}></div>
    </div>
  )
}
