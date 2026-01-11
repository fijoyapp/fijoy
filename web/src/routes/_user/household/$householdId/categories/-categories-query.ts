import { graphql } from 'relay-runtime'

export const categoriesQuery = graphql`
  query CategoriesQuery {
    # eslint-disable-next-line relay/must-colocate-fragment-spreads
    ...categoriesPanelFragment
  }
`
