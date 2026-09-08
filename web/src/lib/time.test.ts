import { afterEach, describe, expect, it, vi } from 'vitest'
import { getRelativeDate } from './time'

describe('getRelativeDate', () => {
  afterEach(() => vi.useRealTimers())

  it.each([
    ['2026-09-08T01:00:00Z', 'Today'],
    ['2026-09-07T12:00:00Z', 'Yesterday'],
    ['2026-08-25T12:00:00Z', '14 days ago'],
    ['2026-07-10T12:00:00Z', '2 months ago'],
    ['2024-09-08T12:00:00Z', '2 years ago'],
  ])('formats %s as %s', (input, expected) => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-08T12:00:00Z'))
    expect(getRelativeDate(new Date(input))).toBe(expected)
  })
})
