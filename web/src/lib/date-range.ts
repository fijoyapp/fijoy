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
} | null {
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
      return null
  }
}

/**
 * Convert date range to ISO strings for GraphQL
 */
export function dateRangeToISO(
  range: {
    startDate: Date
    endDate: Date
  } | null,
): { startDate: string; endDate: string } | null {
  if (!range) return null

  return {
    startDate: range.startDate.toISOString(),
    endDate: range.endDate.toISOString(),
  }
}
