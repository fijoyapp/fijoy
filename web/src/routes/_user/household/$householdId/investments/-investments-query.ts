import { graphql } from 'relay-runtime'

export const investmentsQuery = graphql`
  query InvestmentsQuery {
    ...investmentsPanelFragment
  }
`
