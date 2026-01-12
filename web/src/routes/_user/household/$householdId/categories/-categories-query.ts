import { graphql } from 'relay-runtime'

export const categoriesQuery = graphql`
  query CategoriesQuery($timezone: String!) {
    # eslint-disable-next-line relay/must-colocate-fragment-spreads
    ...categoriesPanelFragment @arguments(timezone: $timezone)
  }
`
