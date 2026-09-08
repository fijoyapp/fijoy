// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { afterEach, expect, it, vi } from 'vitest'
import { TransactionInvestmentPicker } from './transaction-investment-picker'

vi.mock('@/hooks/use-mobile', () => ({ useIsMobile: () => true }))
vi.mock('./selection-rows', () => ({
  SelectionRows: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))
vi.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
  AvatarImage: () => null,
}))

const investments = [
  {
    id: 'index-fund',
    name: 'Index Fund',
    symbol: 'IDX',
    type: 'stock',
    latestTransaction: { datetime: '2026-09-08T00:00:00Z' },
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    type: 'crypto',
    latestTransaction: { datetime: '2026-09-07T00:00:00Z' },
  },
]

function Picker() {
  const [value, setValue] = useState('')
  return (
    <TransactionInvestmentPicker
      investments={investments}
      name="investment"
      label="Investment"
      value={value}
      onValueChange={setValue}
      onBlur={() => undefined}
      invalid={false}
    >
      <div>Desktop picker</div>
    </TransactionInvestmentPicker>
  )
}

afterEach(cleanup)

it('collapses to the selected investment and expands when clicked', () => {
  render(<Picker />)

  fireEvent.click(screen.getByRole('radio', { name: /Index Fund/ }))
  const summary = screen.getByRole('button', {
    name: 'Investment: Index Fund',
  })
  expect(screen.queryByRole('radio', { name: /Bitcoin/ })).toBeNull()

  fireEvent.click(summary)
  expect(screen.getByRole('radio', { name: /Bitcoin/ })).not.toBeNull()
})
