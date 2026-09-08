import { expect, it } from 'vitest'
import { newestActivityFirst } from './sort-by-update-time'

it('orders newest transaction activity first and unused records last', () => {
  const items = [
    { id: 'oldest', latestTransaction: { datetime: '2025-01-01T00:00:00Z' } },
    { id: 'unused', latestTransaction: null },
    { id: 'newest', latestTransaction: { datetime: '2026-09-07T12:00:00Z' } },
    { id: 'middle', latestTransaction: { datetime: '2026-04-01T00:00:00Z' } },
  ]

  expect(newestActivityFirst(items).map((item) => item.id)).toEqual([
    'newest',
    'middle',
    'oldest',
    'unused',
  ])
  expect(items.map((item) => item.id)).toEqual([
    'oldest',
    'unused',
    'newest',
    'middle',
  ])
})
