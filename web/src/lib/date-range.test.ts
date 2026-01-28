import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { calculateNextPaymentDate, formatNextPaymentDate } from './date-range'

describe('calculateNextPaymentDate', () => {
  beforeEach(() => {
    // Set a fixed date for testing: 2024-02-15
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2024, 1, 15)) // February 15, 2024
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Weekly subscriptions', () => {
    it('should return start date if it is today', () => {
      const startDate = new Date(2024, 1, 15) // Today
      const result = calculateNextPaymentDate({
        startDate,
        interval: 'week',
        intervalCount: 1,
      })

      expect(result).toEqual(new Date(2024, 1, 15))
    })

    it('should return start date if it is in the future', () => {
      const startDate = new Date(2024, 1, 20) // 5 days in future
      const result = calculateNextPaymentDate({
        startDate,
        interval: 'week',
        intervalCount: 1,
      })

      expect(result).toEqual(new Date(2024, 1, 20))
    })

    it('should calculate next occurrence for weekly subscription', () => {
      const startDate = new Date(2024, 1, 1) // Feb 1, 2024
      const result = calculateNextPaymentDate({
        startDate,
        interval: 'week',
        intervalCount: 1,
      })

      // 2 weeks have elapsed (Feb 1, 8), next is Feb 22
      expect(result).toEqual(new Date(2024, 1, 22))
    })

    it('should handle bi-weekly subscriptions', () => {
      const startDate = new Date(2024, 1, 1) // Feb 1, 2024
      const result = calculateNextPaymentDate({
        startDate,
        interval: 'week',
        intervalCount: 2,
      })

      // 1 period elapsed (Feb 1-14), next is Feb 29
      expect(result).toEqual(new Date(2024, 1, 29))
    })

    it('should handle every 3 weeks', () => {
      const startDate = new Date(2024, 0, 4) // Jan 4, 2024
      const result = calculateNextPaymentDate({
        startDate,
        interval: 'week',
        intervalCount: 3,
      })

      // Periods: Jan 4, Jan 25, next is Feb 15 (today) - should give Mar 7
      expect(result).toEqual(new Date(2024, 2, 7))
    })
  })

  describe('Monthly subscriptions', () => {
    it('should calculate next occurrence for monthly subscription', () => {
      const startDate = new Date(2024, 0, 15) // Jan 15, 2024
      const result = calculateNextPaymentDate({
        startDate,
        interval: 'month',
        intervalCount: 1,
      })

      // 1 month elapsed (Jan 15), next is Mar 15
      expect(result).toEqual(new Date(2024, 2, 15))
    })

    it('should handle bi-monthly subscriptions', () => {
      const startDate = new Date(2023, 11, 15) // Dec 15, 2023
      const result = calculateNextPaymentDate({
        startDate,
        interval: 'month',
        intervalCount: 2,
      })

      // Periods: Dec 15, Feb 15 (today), next is Apr 15
      expect(result).toEqual(new Date(2024, 3, 15))
    })

    it('should handle quarterly subscriptions', () => {
      const startDate = new Date(2023, 10, 15) // Nov 15, 2023
      const result = calculateNextPaymentDate({
        startDate,
        interval: 'month',
        intervalCount: 3,
      })

      // Periods: Nov 15, Feb 15 (today), next is May 15
      expect(result).toEqual(new Date(2024, 4, 15))
    })

    it('should handle day folding - Jan 31 to Feb', () => {
      const startDate = new Date(2024, 0, 31) // Jan 31, 2024
      const result = calculateNextPaymentDate({
        startDate,
        interval: 'month',
        intervalCount: 1,
      })

      // We're on Feb 15. Last payment was Jan 31.
      // Normally next would be Feb 31 but Feb only has 29 days (leap year)
      // So it folds to Feb 29
      expect(result).toEqual(new Date(2024, 1, 29))
    })

    it('should handle day folding - Jan 31 to Apr', () => {
      const startDate = new Date(2024, 0, 31) // Jan 31, 2024
      const result = calculateNextPaymentDate({
        startDate,
        interval: 'month',
        intervalCount: 3,
      })

      // Every 3 months: Jan 31, next should be Apr 30 (Apr has 30 days)
      expect(result).toEqual(new Date(2024, 3, 30))
    })

    it('should handle day folding - Aug 31 to Feb in leap year', () => {
      vi.setSystemTime(new Date(2024, 2, 15)) // Set to Mar 15, 2024

      const startDate = new Date(2023, 7, 31) // Aug 31, 2023
      const result = calculateNextPaymentDate({
        startDate,
        interval: 'month',
        intervalCount: 6,
      })

      // Every 6 months: Aug 31, Feb 29 (leap year), next is Aug 31
      expect(result).toEqual(new Date(2024, 7, 31))
    })

    it('should preserve day 31 when moving from Feb back to 31-day month', () => {
      // Start on Jan 31, monthly subscription
      const startDate = new Date(2024, 0, 31) // Jan 31, 2024

      // We're in February, next payment should be Feb 29 (leap year)
      vi.setSystemTime(new Date(2024, 1, 15)) // Feb 15, 2024
      let result = calculateNextPaymentDate({
        startDate,
        interval: 'month',
        intervalCount: 1,
      })
      expect(result).toEqual(new Date(2024, 1, 29)) // Feb 29

      // Now we're in March, next payment should be Mar 31 (back to day 31!)
      vi.setSystemTime(new Date(2024, 2, 1)) // Mar 1, 2024
      result = calculateNextPaymentDate({
        startDate,
        interval: 'month',
        intervalCount: 1,
      })
      expect(result).toEqual(new Date(2024, 2, 31)) // Mar 31

      // In April, should fold to Apr 30 (April only has 30 days)
      vi.setSystemTime(new Date(2024, 3, 1)) // Apr 1, 2024
      result = calculateNextPaymentDate({
        startDate,
        interval: 'month',
        intervalCount: 1,
      })
      expect(result).toEqual(new Date(2024, 3, 30)) // Apr 30

      // In May, back to May 31
      vi.setSystemTime(new Date(2024, 4, 1)) // May 1, 2024
      result = calculateNextPaymentDate({
        startDate,
        interval: 'month',
        intervalCount: 1,
      })
      expect(result).toEqual(new Date(2024, 4, 31)) // May 31
    })
  })

  describe('Yearly subscriptions', () => {
    it('should calculate next occurrence for yearly subscription', () => {
      const startDate = new Date(2023, 1, 15) // Feb 15, 2023
      const result = calculateNextPaymentDate({
        startDate,
        interval: 'year',
        intervalCount: 1,
      })

      // 1 year elapsed (Feb 15, 2023), next is Feb 15, 2025
      expect(result).toEqual(new Date(2025, 1, 15))
    })

    it('should handle bi-yearly subscriptions', () => {
      const startDate = new Date(2022, 1, 15) // Feb 15, 2022
      const result = calculateNextPaymentDate({
        startDate,
        interval: 'year',
        intervalCount: 2,
      })

      // Periods: 2022, 2024 (today), next is 2026
      expect(result).toEqual(new Date(2026, 1, 15))
    })

    it('should handle Feb 29 on leap year', () => {
      const startDate = new Date(2020, 1, 29) // Feb 29, 2020 (leap year)
      const result = calculateNextPaymentDate({
        startDate,
        interval: 'year',
        intervalCount: 1,
      })

      // We're on Feb 15, 2024. Last payment was Feb 29, 2020
      // Periods elapsed: 2020, 2021, 2022, 2023 (4 years)
      // But we're still in 2024 so only 3 periods elapsed
      // Wait, actually 2024 is also a leap year, so it should be Feb 29, 2024
      // Since today is Feb 15, 2024, the next occurrence is still Feb 29, 2024
      expect(result).toEqual(new Date(2024, 1, 29))
    })

    it('should handle Feb 29 to next leap year', () => {
      vi.setSystemTime(new Date(2021, 5, 15)) // Set to Jun 15, 2021

      const startDate = new Date(2020, 1, 29) // Feb 29, 2020
      const result = calculateNextPaymentDate({
        startDate,
        interval: 'year',
        intervalCount: 4,
      })

      // Every 4 years: 2020, next is 2024 (both leap years)
      expect(result).toEqual(new Date(2024, 1, 29))
    })

    it('should handle Feb 29 cycle: leap → non-leap → leap', () => {
      // Start on leap year Feb 29, 2020
      const startDate = new Date(2020, 1, 29)

      // Test 2021 (non-leap): should be Feb 28
      vi.setSystemTime(new Date(2021, 0, 1)) // Jan 1, 2021
      let result = calculateNextPaymentDate({
        startDate,
        interval: 'year',
        intervalCount: 1,
      })
      expect(result).toEqual(new Date(2021, 1, 28)) // Feb 28, 2021

      // Test 2024 (leap year): should be Feb 29 again
      vi.setSystemTime(new Date(2023, 5, 1)) // Jun 1, 2023
      result = calculateNextPaymentDate({
        startDate,
        interval: 'year',
        intervalCount: 1,
      })
      expect(result).toEqual(new Date(2024, 1, 29)) // Feb 29, 2024
    })
  })

  describe('Edge cases', () => {
    it('should handle string date input', () => {
      const startDate = '2024-01-15'
      const result = calculateNextPaymentDate({
        startDate,
        interval: 'month',
        intervalCount: 1,
      })

      expect(result).toEqual(new Date(2024, 2, 15))
    })

    it('should strip time component from start date', () => {
      const startDate = new Date(2024, 0, 15, 14, 30, 0) // Jan 15 at 2:30 PM
      const result = calculateNextPaymentDate({
        startDate,
        interval: 'month',
        intervalCount: 1,
      })

      // Result should be at midnight
      expect(result.getHours()).toBe(0)
      expect(result.getMinutes()).toBe(0)
      expect(result.getSeconds()).toBe(0)
    })

    it('should handle subscription starting yesterday', () => {
      const startDate = new Date(2024, 1, 14) // Yesterday
      const result = calculateNextPaymentDate({
        startDate,
        interval: 'week',
        intervalCount: 1,
      })

      // Next week
      expect(result).toEqual(new Date(2024, 1, 21))
    })
  })
})

describe('formatNextPaymentDate', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2024, 1, 15)) // February 15, 2024
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should format today as "today"', () => {
    const date = new Date(2024, 1, 15)
    expect(formatNextPaymentDate(date)).toBe('today')
  })

  it('should format tomorrow as "tomorrow"', () => {
    const date = new Date(2024, 1, 16)
    expect(formatNextPaymentDate(date)).toBe('tomorrow')
  })

  it('should format 2 days as "in 2 days"', () => {
    const date = new Date(2024, 1, 17)
    expect(formatNextPaymentDate(date)).toBe('in 2 days')
  })

  it('should format 7 days as "in 7 days"', () => {
    const date = new Date(2024, 1, 22)
    expect(formatNextPaymentDate(date)).toBe('in 7 days')
  })

  it('should format 8+ days with full date', () => {
    const date = new Date(2024, 1, 23) // 8 days from now
    expect(formatNextPaymentDate(date)).toBe('Feb 23, 2024')
  })

  it('should format far future dates with full date', () => {
    const date = new Date(2024, 5, 15) // 4 months from now
    expect(formatNextPaymentDate(date)).toBe('Jun 15, 2024')
  })

  it('should handle dates with time component', () => {
    const date = new Date(2024, 1, 16, 14, 30, 0) // Tomorrow at 2:30 PM
    expect(formatNextPaymentDate(date)).toBe('tomorrow')
  })

  it('should use day-level precision only (no hours)', () => {
    // Even if technically less than 24 hours, should show as days
    const date = new Date(2024, 1, 17, 2, 0, 0) // 2 days from now at 2 AM
    const result = formatNextPaymentDate(date)

    // Should be "in 2 days", not "in 1 day" or "in 48 hours"
    expect(result).toBe('in 2 days')
  })
})
