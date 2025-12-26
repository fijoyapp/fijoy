import { graphql } from 'relay-runtime'
import { useFragment } from 'react-relay'
import { TransactionsList } from './transactions-list'
import type { transactionsPanelFragment$key } from './__generated__/transactionsPanelFragment.graphql'

const transactionsPanelFragment = graphql`
  fragment transactionsPanelFragment on Query {
    ...transactionsListFragment
  }
`

type TransactionsPanelProps = {
  fragmentRef: transactionsPanelFragment$key
}

export function TransactionsPanel({ fragmentRef }: TransactionsPanelProps) {
  const data = useFragment(transactionsPanelFragment, fragmentRef)
  return (
    <div>
      <TransactionsList fragmentRef={data} />
    </div>
  )
}
