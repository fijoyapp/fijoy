import { graphql } from 'relay-runtime'

export const transactionsQuery = graphql`
  query TransactionsQuery($where: TransactionWhereInput) {
    # eslint-disable-next-line relay/must-colocate-fragment-spreads
    ...transactionsPanelFragment @arguments(where: $where)
  }
`
