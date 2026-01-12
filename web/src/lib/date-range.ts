export const DATE_RANGE_PRESETS = {
  LAST_7_DAYS: 'LAST_7_DAYS',
  LAST_30_DAYS: 'LAST_30_DAYS',
  LAST_90_DAYS: 'LAST_90_DAYS',
  THIS_MONTH: 'THIS_MONTH',
  LAST_MONTH: 'LAST_MONTH',
  THIS_YEAR: 'THIS_YEAR',
  LAST_YEAR: 'LAST_YEAR',
  ALL_TIME: 'ALL_TIME',
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

  switch (preset) {
    case DATE_RANGE_PRESETS.LAST_7_DAYS: {
      const start = new Date(now)
      start.setDate(now.getDate() - 7)
      return { startDate: start, endDate: now }
    }

    case DATE_RANGE_PRESETS.LAST_30_DAYS: {
      const start = new Date(now)
      start.setDate(now.getDate() - 30)
      return { startDate: start, endDate: now }
    }

    case DATE_RANGE_PRESETS.LAST_90_DAYS: {
      const start = new Date(now)
      start.setDate(now.getDate() - 90)
      return { startDate: start, endDate: now }
    }

    case DATE_RANGE_PRESETS.THIS_MONTH: {
      const start = new Date(now.getFullYear(), now.getMonth(), 1)
      return { startDate: start, endDate: now }
    }

    case DATE_RANGE_PRESETS.LAST_MONTH: {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const end = new Date(now.getFullYear(), now.getMonth(), 1)
      return { startDate: start, endDate: end }
    }

    case DATE_RANGE_PRESETS.THIS_YEAR: {
      const start = new Date(now.getFullYear(), 0, 1)
      return { startDate: start, endDate: now }
    }

    case DATE_RANGE_PRESETS.LAST_YEAR: {
      const start = new Date(now.getFullYear() - 1, 0, 1)
      const end = new Date(now.getFullYear(), 0, 1)
      return { startDate: start, endDate: end }
    }

    case DATE_RANGE_PRESETS.ALL_TIME:
      // Return null to indicate no date filtering (all time)
      return null

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
