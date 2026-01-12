import { useMemo } from 'react'

/**
 * Returns the user's IANA timezone (e.g., "America/New_York")
 * from the browser's Intl API
 */
export function useTimezone() {
  return useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    [],
  )
}
