import { graphql, useFragment } from 'react-relay'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { X, GripVertical } from 'lucide-react'
import type { newTransactionFragment$key } from './__generated__/newTransactionFragment.graphql'
import { NewExpense } from './new-expense'
import { NewIncome } from './new-income'
import { NewTransfer } from './new-transfer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

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
  const navigate = useNavigate()

  const handleClose = () => {
    navigate({
      search: (prev) => ({ ...prev, showNewTransaction: false }),
    })
  }

  return (
    <Card className="w-full overflow-hidden shadow-2xl">
      {/* Drag Handle Header */}
      <div className="drag-handle flex items-center justify-between border-b bg-muted/50 px-4 py-2 cursor-move">
        <div className="flex items-center gap-2">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold text-sm">New Transaction</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Transaction Type Selector */}
      <div className="flex gap-2 border-b p-4">
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
      </div>

      {/* Form Content */}
      <div className="max-h-[70vh] overflow-y-auto">
        {selectedType === 'expense' && <NewExpense fragmentRef={data} />}
        {selectedType === 'income' && <NewIncome fragmentRef={data} />}
        {selectedType === 'transfer' && <NewTransfer fragmentRef={data} />}
      </div>
    </Card>
  )
}
