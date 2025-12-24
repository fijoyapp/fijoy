import { createFileRoute } from '@tanstack/react-router'
import { useLazyLoadQuery } from 'react-relay'
import { graphql } from 'relay-runtime'

export const Route = createFileRoute('/_user/household/accounts/')({
  component: RouteComponent,
})

const accountsQuery = graphql`
  query accountsQuery {
    accounts {
      id
      name
    }
  }
`

function RouteComponent() {
  const data = useLazyLoadQuery(accountsQuery, {})
  console.log(data)
  return <div>Hello "/_user/household/accounts/"!</div>
}
