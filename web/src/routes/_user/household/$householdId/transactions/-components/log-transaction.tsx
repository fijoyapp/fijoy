import { graphql, useFragment } from 'react-relay'
import { useState } from 'react'
import { NewExpense } from './new-expense'
import { NewIncome } from './new-income'
import { NewTransfer } from './new-transfer'
import { NewBuy } from './new-buy'
import { NewSell } from './new-sell'
import { Button } from '@/components/ui/button'
import { Item } from '@/components/ui/item'
import { logTransactionFragment$key } from './__generated__/logTransactionFragment.graphql'

const logTransactionFragment = graphql`
  fragment logTransactionFragment on Query {
    ...newExpenseFragment
    ...newIncomeFragment
    ...newTransferFragment
    ...newBuyFragment
    ...newSellFragment
  }
`

type TransactionType = 'expense' | 'income' | 'transfer' | 'buy' | 'sell'

type NewTransactionProps = {
  fragmentRef: logTransactionFragment$key
}

export function LogTransaction({ fragmentRef }: NewTransactionProps) {
  const data = useFragment(logTransactionFragment, fragmentRef)
  const [selectedType, setSelectedType] = useState<TransactionType>('expense')

  return (
    <Item className="w-full bg-muted p-0 gap-0 h-full">
      <div className="flex gap-2 p-4">
        <Button
          size="sm"
          variant={selectedType === 'expense' ? 'default' : 'outline'}
          onClick={() => setSelectedType('expense')}
        >
          Expense
        </Button>
        <Button
          size="sm"
          variant={selectedType === 'income' ? 'default' : 'outline'}
          onClick={() => setSelectedType('income')}
        >
          Income
        </Button>
        <Button
          size="sm"
          variant={selectedType === 'transfer' ? 'default' : 'outline'}
          onClick={() => setSelectedType('transfer')}
        >
          Transfer
        </Button>
        <Button
          size="sm"
          variant={selectedType === 'buy' ? 'default' : 'outline'}
          onClick={() => setSelectedType('buy')}
        >
          Buy
        </Button>
        <Button
          size="sm"
          variant={selectedType === 'sell' ? 'default' : 'outline'}
          onClick={() => setSelectedType('sell')}
        >
          Sell
        </Button>
      </div>

      {selectedType === 'expense' && <NewExpense fragmentRef={data} />}
      {selectedType === 'income' && <NewIncome fragmentRef={data} />}
      {selectedType === 'transfer' && <NewTransfer fragmentRef={data} />}
      {selectedType === 'buy' && <NewBuy fragmentRef={data} />}
      {selectedType === 'sell' && <NewSell fragmentRef={data} />}
    </Item>
  )
}
