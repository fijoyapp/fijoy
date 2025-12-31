import { graphql } from 'relay-runtime'

export const accountsQuery = graphql`
  query AccountsQuery {
    ...accountsPanelFragment
  }
`
