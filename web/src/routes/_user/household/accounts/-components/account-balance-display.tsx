import { graphql } from 'relay-runtime'
import currency from 'currency.js'
import { useFragment } from 'react-relay'
import { accountBalanceDisplayFragment_account$key } from './__generated__/accountBalanceDisplayFragment_account.graphql'

const accountBalanceDisplayAccountFragment = graphql`
  fragment accountBalanceDisplayFragment_account on Account {
    balance
    currency {
      code
    }
  }
`

type AccountBalanceDisplayProps = {
  fragmentRef: accountBalanceDisplayFragment_account$key
}

export function AccountBalanceDisplay({
  fragmentRef,
}: AccountBalanceDisplayProps) {
  const data = useFragment(accountBalanceDisplayAccountFragment, fragmentRef)

  const curr = currency(data.balance)

  const value = Intl.NumberFormat('en-CA', {
    currency: data.currency.code,
    style: 'currency',
  }).format(curr.value)

  return <span>{value}</span>
}
