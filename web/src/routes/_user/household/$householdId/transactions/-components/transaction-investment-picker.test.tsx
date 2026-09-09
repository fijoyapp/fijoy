// @vitest-environment jsdom
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { useState } from 'react'
import { afterEach, expect, it, vi } from 'vitest'
import { TransactionInvestmentPicker } from './transaction-investment-picker'

const mobileState = vi.hoisted(() => ({ value: true }))

vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: () => mobileState.value,
}))
vi.mock('@/lib/logo', () => ({
  getLogoCryptoURL: () => '',
  getLogoTickerURL: () => '',
}))
vi.mock('relay-runtime', async (importOriginal) => ({
  ...(await importOriginal<typeof import('relay-runtime')>()),
  readInlineData: (_fragment: unknown, fragmentRef: unknown) => fragmentRef,
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

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Element.prototype.scrollIntoView = vi.fn()

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
      investments={investments as never}
      name="investment"
      label="Investment"
      value={value}
      onValueChange={setValue}
      onBlur={() => undefined}
      invalid={false}
    />
  )
}

afterEach(() => {
  cleanup()
  mobileState.value = true
})

it('keeps the mobile trigger stable while selecting an investment', async () => {
  render(<Picker />)

  const trigger = screen.getByRole('button', {
    name: 'Investment: Select an investment',
  })
  const triggerClassName = trigger.className

  fireEvent.click(trigger)
  fireEvent.click(await screen.findByText('Index Fund'))

  const selectedTrigger = await screen.findByRole('button', {
    name: 'Investment: Index Fund, IDX',
  })
  expect(selectedTrigger.className).toBe(triggerClassName)

  fireEvent.click(selectedTrigger)
  expect(await screen.findByText('Bitcoin')).toBeTruthy()
})

it('shows investment identity in desktop options and the selected trigger', async () => {
  mobileState.value = false
  render(<Picker />)

  fireEvent.click(
    screen.getByRole('button', {
      name: 'Investment: Select an investment',
    }),
  )
  fireEvent.click(await screen.findByText('Index Fund'))

  expect(
    screen.getByRole('button', { name: 'Investment: Index Fund, IDX' }),
  ).toBeTruthy()
})

it('clears an investment selection that falls outside the current view scope', async () => {
  const onValueChange = vi.fn()
  const commonProps = {
    name: 'investment',
    label: 'Investment',
    value: 'index-fund',
    onValueChange,
    onBlur: vi.fn(),
    invalid: false,
  }
  const { rerender } = render(
    <TransactionInvestmentPicker
      investments={investments as never}
      {...commonProps}
    />,
  )

  expect(onValueChange).not.toHaveBeenCalled()

  rerender(<TransactionInvestmentPicker investments={[]} {...commonProps} />)

  await waitFor(() => expect(onValueChange).toHaveBeenCalledWith(''))
})
