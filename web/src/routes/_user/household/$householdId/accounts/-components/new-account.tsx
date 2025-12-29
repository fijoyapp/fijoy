import { graphql } from 'relay-runtime'
import { type newAccountFragment$key } from './__generated__/newAccountFragment.graphql'

const newAccountFragment = graphql`
  fragment newAccountFragment on Query {
    accounts {
      id
    }
  }
`

type NewAccountProps = {
  fragmentRef: newAccountFragment$key
}

export function NewAccount({ fragmentRef }: NewAccountProps) {
  return <div></div>
}
