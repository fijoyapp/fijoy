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
import { TransactionCategoryPicker } from './transaction-category-picker'

const mobileState = vi.hoisted(() => ({ value: true }))

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }),
})
vi.stubGlobal(
  'ResizeObserver',
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
)
Element.prototype.scrollIntoView = vi.fn()

vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: () => mobileState.value,
}))
vi.mock('@/components/category-icon', () => ({
  CategoryIcon: () => <span aria-hidden="true" />,
}))
vi.mock('relay-runtime', async (importOriginal) => ({
  ...(await importOriginal<typeof import('relay-runtime')>()),
  readInlineData: (_fragment: unknown, fragmentRef: unknown) => fragmentRef,
}))

const categories = [
  { id: 'groceries', name: 'Groceries', type: 'expense' },
  { id: 'transport', name: 'Transport', type: 'expense' },
]

const manyCategories = Array.from({ length: 6 }, (_, index) => ({
  id: `category-${index + 1}`,
  name: `Category ${index + 1}`,
  type: 'expense',
  latestTransaction: {
    datetime: `2026-09-0${index + 1}T00:00:00Z`,
  },
}))

function Picker() {
  const [value, setValue] = useState('')
  return (
    <TransactionCategoryPicker
      categories={categories as never}
      name="category"
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

it('opens a searchable mobile drawer and closes after selection', async () => {
  render(<Picker />)

  fireEvent.click(
    screen.getByRole('button', { name: 'Category: Select a category' }),
  )
  expect(await screen.findByRole('dialog')).toBeTruthy()

  const search = screen.getByRole('combobox', { name: 'Search category' })
  fireEvent.change(search, { target: { value: 'Transport' } })
  expect(screen.queryByText('Groceries')).toBeNull()
  fireEvent.click(screen.getByText('Transport'))

  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
  expect(
    screen.getByRole('button', { name: 'Category: Transport' }),
  ).toBeTruthy()
})

it('searches desktop categories and shows the selected trigger', () => {
  mobileState.value = false
  render(<Picker />)

  fireEvent.click(
    screen.getByRole('button', { name: 'Category: Select a category' }),
  )
  fireEvent.change(screen.getByRole('combobox', { name: 'Search category' }), {
    target: { value: 'Groceries' },
  })
  expect(screen.queryByText('Transport')).toBeNull()
  fireEvent.click(screen.getByText('Groceries'))

  expect(screen.queryByRole('combobox')).toBeNull()
  expect(
    screen.getByRole('button', { name: 'Category: Groceries' }),
  ).toBeTruthy()
})

it('keeps every category in recency order in the desktop search', () => {
  mobileState.value = false
  render(
    <TransactionCategoryPicker
      categories={manyCategories as never}
      name="category"
      value=""
      onValueChange={() => undefined}
      onBlur={() => undefined}
      invalid={false}
    />,
  )

  fireEvent.click(
    screen.getByRole('button', { name: 'Category: Select a category' }),
  )

  const options = screen.getAllByRole('option')
  expect(options).toHaveLength(6)
  expect(options[0]?.textContent).toContain('Category 6')
  expect(options[5]?.textContent).toContain('Category 1')
})
