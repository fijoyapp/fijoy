import { graphql } from 'relay-runtime'

export const transactionsQuery = graphql`
  query TransactionsQuery {
    ...transactionsPanelFragment
  }
`
