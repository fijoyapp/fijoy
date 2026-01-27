import {
  format,
  parseISO,
  formatDistanceToNow,
  differenceInDays,
} from 'date-fns'

export const DATE_RANGE_PRESETS = {
  THIS_MONTH: 'THIS_MONTH',
  LAST_MONTH: 'LAST_MONTH',
  THIS_YEAR: 'THIS_YEAR',
  LAST_YEAR: 'LAST_YEAR',
} as const

export type DateRangePreset =
  (typeof DATE_RANGE_PRESETS)[keyof typeof DATE_RANGE_PRESETS]

export const getDefaultDates = () => {
  const range = getDateRangeForPreset(DATE_RANGE_PRESETS.THIS_MONTH)
  return {
    start: format(range.startDate, 'yyyy-MM-dd'),
    end: format(range.endDate, 'yyyy-MM-dd'),
  }
}

/**
 * Get UTC date range for common time period presets
 */
export function getDateRangeForPreset(preset: DateRangePreset): {
  startDate: Date
  endDate: Date
} {
  const now = new Date()

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  )

  switch (preset) {
    case DATE_RANGE_PRESETS.THIS_MONTH: {
      const start = new Date(
        startOfToday.getFullYear(),
        startOfToday.getMonth(),
        1,
      )
      const end = new Date(
        startOfToday.getFullYear(),
        startOfToday.getMonth() + 1,
        0,
      )
      return { startDate: start, endDate: end }
    }

    case DATE_RANGE_PRESETS.LAST_MONTH: {
      const start = new Date(
        startOfToday.getFullYear(),
        startOfToday.getMonth() - 1,
        1,
      )
      const end = new Date(
        startOfToday.getFullYear(),
        startOfToday.getMonth(),
        0,
      )
      return { startDate: start, endDate: end }
    }

    case DATE_RANGE_PRESETS.THIS_YEAR: {
      const start = new Date(startOfToday.getFullYear(), 0, 1)
      const end = new Date(startOfToday.getFullYear(), 11, 31)
      return { startDate: start, endDate: end }
    }

    case DATE_RANGE_PRESETS.LAST_YEAR: {
      const start = new Date(startOfToday.getFullYear() - 1, 0, 1)
      const end = new Date(startOfToday.getFullYear() - 1, 11, 31)
      return { startDate: start, endDate: end }
    }

    default:
      throw new Error(`Unsupported date range preset: ${preset}`)
  }
}

/**
 * Convert date range to ISO strings for GraphQL
 */
export function dateRangeToISO(range: { startDate: Date; endDate: Date }): {
  startDate: string
  endDate: string
} {
  return {
    startDate: range.startDate.toISOString(),
    endDate: range.endDate.toISOString(),
  }
}

/**
 * Parse date strings from URL and convert to ISO strings for GraphQL
 * Falls back to default preset if parsing fails
 */
export function parseDateRangeFromURL(
  start: string,
  end: string,
  fallbackPreset: DateRangePreset = DATE_RANGE_PRESETS.THIS_MONTH,
): {
  startDate: string
  endDate: string
} {
  try {
    // Import parseISO dynamically to avoid circular dependency
    const startDate = parseISO(start)
    const endDate = parseISO(end)

    // Check if dates are valid
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('Invalid date values')
    }

    return {
      startDate: startDate.toISOString(),
      endDate: new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate() + 1,
      ).toISOString(),
    }
  } catch (error) {
    console.error('Failed to parse date range from URL:', { start, end, error })
    const range = getDateRangeForPreset(fallbackPreset)
    return dateRangeToISO(range)
  }
}

/**
 * Calculate next payment date for recurring subscription
 * Handles day folding (e.g., Jan 31 → Feb 28)
 */
export function calculateNextPaymentDate(params: {
  startDate: Date | string
  interval: 'day' | 'week' | 'month' | 'year'
  intervalCount: number
}): Date {
  const { startDate, interval, intervalCount } = params

  // Parse start date
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  // If start date is in the future, that's the next payment date
  if (start >= today) {
    return start
  }

  // Calculate next occurrence based on interval
  let nextDate: Date

  switch (interval) {
    case 'day': {
      // Calculate days since start
      const daysSinceStart = Math.floor(
        (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
      )
      const intervalDays = intervalCount
      const periodsElapsed = Math.floor(daysSinceStart / intervalDays)
      nextDate = new Date(start)
      nextDate.setDate(start.getDate() + (periodsElapsed + 1) * intervalDays)
      break
    }

    case 'week': {
      // Calculate weeks since start
      const daysSinceStart = Math.floor(
        (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
      )
      const intervalDays = intervalCount * 7
      const periodsElapsed = Math.floor(daysSinceStart / intervalDays)
      nextDate = new Date(start)
      nextDate.setDate(start.getDate() + (periodsElapsed + 1) * intervalDays)
      break
    }

    case 'month': {
      // Calculate months since start
      const yearsSinceStart = today.getFullYear() - start.getFullYear()
      const monthsSinceStart =
        yearsSinceStart * 12 + (today.getMonth() - start.getMonth())
      const periodsElapsed = Math.floor(monthsSinceStart / intervalCount)

      // Add periods to get next occurrence
      const monthsToAdd = (periodsElapsed + 1) * intervalCount
      nextDate = new Date(start)
      nextDate.setMonth(start.getMonth() + monthsToAdd)

      // Handle day folding (e.g., Jan 31 → Feb 28)
      // If the day changed (folded backward), it means we overflowed
      if (nextDate.getDate() !== start.getDate()) {
        // Go to last day of the target month
        nextDate = new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 0)
      }
      break
    }

    case 'year': {
      // Calculate years since start
      const yearsSinceStart = today.getFullYear() - start.getFullYear()
      const periodsElapsed = Math.floor(yearsSinceStart / intervalCount)

      // Add periods to get next occurrence
      const yearsToAdd = (periodsElapsed + 1) * intervalCount
      nextDate = new Date(start)
      nextDate.setFullYear(start.getFullYear() + yearsToAdd)

      // Handle Feb 29 on non-leap years
      if (start.getMonth() === 1 && start.getDate() === 29) {
        if (nextDate.getMonth() !== 1) {
          // Folded to March, go back to Feb 28
          nextDate = new Date(nextDate.getFullYear(), 1, 28)
        }
      }
      break
    }

    default:
      throw new Error(`Unknown interval: ${interval}`)
  }

  return nextDate
}

/**
 * Format payment date for display
 * Returns "in X days" if within 7 days, otherwise formatted date
 */
export function formatNextPaymentDate(date: Date): string {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const daysUntil = differenceInDays(date, today)

  if (daysUntil <= 7 && daysUntil >= 0) {
    return formatDistanceToNow(date, { addSuffix: true })
  }

  return format(date, 'MMM d, yyyy')
}
