import { graphql } from 'relay-runtime'

export const transactionsQuery = graphql`
  query TransactionsQuery {
    # eslint-disable-next-line relay/must-colocate-fragment-spreads
    ...transactionsPanelFragment
  }
`
