import { graphql } from 'relay-runtime'
import { transactionCardFragment$key } from './__generated__/transactionCardFragment.graphql'
import { useFragment } from 'react-relay'

const transactionCardFragment = graphql`
  fragment transactionCardFragment on Transaction {
    id
  }
`

type TransactionCardProps = {
  fragmentRef: transactionCardFragment$key
}

export function TransactionCard({ fragmentRef }: TransactionCardProps) {
  const data = useFragment(transactionCardFragment, fragmentRef)
  return <div>{data.id}</div>
}
