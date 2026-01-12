import { parseISO } from 'date-fns'

export const DATE_RANGE_PRESETS = {
  LAST_7_DAYS: 'LAST_7_DAYS',
  LAST_30_DAYS: 'LAST_30_DAYS',
  LAST_90_DAYS: 'LAST_90_DAYS',
  THIS_MONTH: 'THIS_MONTH',
  LAST_MONTH: 'LAST_MONTH',
  THIS_YEAR: 'THIS_YEAR',
  LAST_YEAR: 'LAST_YEAR',
} as const

export type DateRangePreset =
  (typeof DATE_RANGE_PRESETS)[keyof typeof DATE_RANGE_PRESETS]

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

  const startOfTomorrow = new Date(
    startOfToday.getFullYear(),
    startOfToday.getMonth(),
    startOfToday.getDate() + 1,
  )

  switch (preset) {
    case DATE_RANGE_PRESETS.LAST_7_DAYS: {
      const start = new Date(
        startOfToday.getFullYear(),
        startOfToday.getMonth(),
        startOfToday.getDate() - 7,
      )
      return { startDate: start, endDate: startOfTomorrow }
    }

    case DATE_RANGE_PRESETS.LAST_30_DAYS: {
      const start = new Date(
        startOfToday.getFullYear(),
        startOfToday.getMonth(),
        startOfToday.getDate() - 30,
      )
      return { startDate: start, endDate: startOfTomorrow }
    }

    case DATE_RANGE_PRESETS.LAST_90_DAYS: {
      const start = new Date(
        startOfToday.getFullYear(),
        startOfToday.getMonth(),
        startOfToday.getDate() - 90,
      )
      return { startDate: start, endDate: startOfTomorrow }
    }

    case DATE_RANGE_PRESETS.THIS_MONTH: {
      const start = new Date(
        startOfToday.getFullYear(),
        startOfToday.getMonth(),
        1,
      )
      return { startDate: start, endDate: startOfTomorrow }
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
        1,
      )
      return { startDate: start, endDate: end }
    }

    case DATE_RANGE_PRESETS.THIS_YEAR: {
      const start = new Date(startOfToday.getFullYear(), 0, 1)
      return { startDate: start, endDate: startOfTomorrow }
    }

    case DATE_RANGE_PRESETS.LAST_YEAR: {
      const start = new Date(startOfToday.getFullYear() - 1, 0, 1)
      const end = new Date(startOfToday.getFullYear(), 0, 1)
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
      endDate: endDate.toISOString(),
    }
  } catch (error) {
    console.error('Failed to parse date range from URL:', { start, end, error })
    const range = getDateRangeForPreset(fallbackPreset)
    return dateRangeToISO(range)
  }
}
