import { describe, expect, it } from 'vitest'

import {
  calculateAllocationPercentage,
  getAccountGroupAllocation,
} from './account-ledger-utils'

describe('calculateAllocationPercentage', () => {
  it('calculates a liability share against the total liability magnitude', () => {
    expect(calculateAllocationPercentage(-250, -1000)).toBe(25)
  })

  it('handles mixed signs and empty totals safely', () => {
    expect(calculateAllocationPercentage(-250, 1000)).toBe(25)
    expect(calculateAllocationPercentage(250, 0)).toBe(0)
  })
})

describe('getAccountGroupAllocation', () => {
  it('calculates a liability group against total assets', () => {
    expect(getAccountGroupAllocation(-250, 2000)).toEqual({
      share: 12.5,
      basis: 'assets',
    })
  })
})
