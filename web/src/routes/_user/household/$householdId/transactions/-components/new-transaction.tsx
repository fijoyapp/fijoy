import { graphql, useFragment } from 'react-relay'
import { useState } from 'react'
import type { newTransactionFragment$key } from './__generated__/newTransactionFragment.graphql'
import { NewExpense } from './new-expense'
import { NewIncome } from './new-income'
import { NewTransfer } from './new-transfer'
import { Button } from '@/components/ui/button'

const newTransactionFragment = graphql`
  fragment newTransactionFragment on Query {
    ...newExpenseFragment
    ...newIncomeFragment
    ...newTransferFragment
  }
`

type TransactionType = 'expense' | 'income' | 'transfer'

type NewTransactionProps = {
  fragmentRef: newTransactionFragment$key
}

export function NewTransaction({ fragmentRef }: NewTransactionProps) {
  const data = useFragment(newTransactionFragment, fragmentRef)
  const [selectedType, setSelectedType] = useState<TransactionType>('expense')

  return (
    <div className="flex h-full flex-col w-full">
      <div className="mb-4 flex gap-2">
        <Button
          variant={selectedType === 'expense' ? 'default' : 'outline'}
          onClick={() => setSelectedType('expense')}
        >
          Expense
        </Button>
        <Button
          variant={selectedType === 'income' ? 'default' : 'outline'}
          onClick={() => setSelectedType('income')}
        >
          Income
        </Button>
        <Button
          variant={selectedType === 'transfer' ? 'default' : 'outline'}
          onClick={() => setSelectedType('transfer')}
        >
          Transfer
        </Button>
      </div>

      <div className="flex flex-1">
        <div className="w-full">
          {selectedType === 'expense' && <NewExpense fragmentRef={data} />}
          {selectedType === 'income' && <NewIncome fragmentRef={data} />}
          {selectedType === 'transfer' && <NewTransfer fragmentRef={data} />}
        </div>
      </div>
    </div>
  )
}
