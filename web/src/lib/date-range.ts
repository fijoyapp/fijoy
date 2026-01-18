import { format, parseISO } from 'date-fns'

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
