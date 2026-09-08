// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { afterEach, expect, it, vi } from 'vitest'
import { TransactionCategoryPicker } from './transaction-category-picker'

vi.mock('@/hooks/use-mobile', () => ({ useIsMobile: () => true }))
vi.mock('./selection-rows', () => ({
  SelectionRows: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))
vi.mock('@/components/category-icon', () => ({
  CategoryIcon: () => <span aria-hidden="true" />,
}))

const categories = [
  { id: 'groceries', name: 'Groceries', type: 'expense' },
  { id: 'transport', name: 'Transport', type: 'expense' },
]

function Picker() {
  const [value, setValue] = useState('')
  return (
    <TransactionCategoryPicker
      categories={categories}
      name="category"
      value={value}
      onValueChange={setValue}
      onBlur={() => undefined}
      invalid={false}
    />
  )
}

afterEach(cleanup)

it('collapses to the selected category and expands when clicked', () => {
  render(<Picker />)

  fireEvent.click(screen.getByRole('radio', { name: 'Groceries' }))
  const summary = screen.getByRole('button', { name: 'Category: Groceries' })
  expect(screen.queryByRole('radio', { name: 'Transport' })).toBeNull()

  fireEvent.click(summary)
  expect(screen.getByRole('radio', { name: 'Transport' })).not.toBeNull()
})
