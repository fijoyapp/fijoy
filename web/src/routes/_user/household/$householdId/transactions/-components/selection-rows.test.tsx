// @vitest-environment jsdom
import { act, cleanup, render, screen } from '@testing-library/react'
import { useEffect } from 'react'
import { afterEach, expect, it, vi } from 'vitest'
import { SelectionRows } from './selection-rows'

vi.mock('@/components/ui/scroll-area', () => ({
  ScrollArea: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

const observe = vi.fn()
const disconnect = vi.fn()
const mounts = vi.fn()
let observers = 0
vi.stubGlobal(
  'ResizeObserver',
  class {
    constructor() {
      observers++
    }
    observe = observe
    disconnect = disconnect
  },
)

function Card({ id, selected }: { id: number; selected: boolean }) {
  useEffect(() => {
    mounts(id)
  }, [id])
  return (
    <label>
      <input
        type="radio"
        aria-label={`Card ${id}`}
        checked={selected}
        readOnly
      />
      Card {id}
    </label>
  )
}
function Picker({ selected }: { selected: number }) {
  return (
    <SelectionRows label="Test">
      {Array.from({ length: 6 }, (_, id) => (
        <Card key={id} id={id} selected={id === selected} />
      ))}
    </SelectionRows>
  )
}

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  mounts.mockClear()
  observers = 0
})

it('keeps cards mounted and skips layout measurement when selection changes', () => {
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(300)
  const measure = vi
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockImplementation(() => ({
      width: 120,
      height: 44,
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 120,
      bottom: 44,
      toJSON: () => ({}),
    }))
  const view = render(<Picker selected={0} />)
  const firstInput = screen.getByRole('radio', { name: 'Card 0' })
  const measurementCount = measure.mock.calls.length
  const observerCount = observers
  act(() => view.rerender(<Picker selected={1} />))
  expect(screen.getByRole('radio', { name: 'Card 0' })).toBe(firstInput)
  expect(mounts).toHaveBeenCalledTimes(6)
  expect(observers).toBe(observerCount)
  expect(measure).toHaveBeenCalledTimes(measurementCount)
})

it('uses as many rows as needed to display every card', () => {
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(300)
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
    () => ({
      width: 120,
      height: 44,
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 120,
      bottom: 44,
      toJSON: () => ({}),
    }),
  )

  render(
    <SelectionRows label="All cards">
      {Array.from({ length: 10 }, (_, id) => (
        <Card key={id} id={id} selected={false} />
      ))}
    </SelectionRows>,
  )

  expect(screen.getByRole('group', { name: 'All cards' }).style.height).toBe(
    '252px',
  )
})
