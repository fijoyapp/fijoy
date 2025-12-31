import { graphql } from 'relay-runtime'

export const investmentsQuery = graphql`
  query InvestmentsQuery {
    # eslint-disable-next-line relay/must-colocate-fragment-spreads
    ...investmentsPanelFragment
  }
`
