import { useNavigate } from '@tanstack/react-router'
import { format, parseISO } from 'date-fns'
import { useState, useTransition } from 'react'
import type { DateRange } from 'react-day-picker'
import { fetchQuery } from 'react-relay'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DATE_RANGE_PRESETS,
  getDateRangeForPreset,
  type DateRangePreset,
} from '@/lib/date-range'
import { environment } from '@/environment'
import { categoriesQuery } from '../-categories-query'
import type { CategoriesQuery } from '../__generated__/CategoriesQuery.graphql'
import { Spinner } from '@/components/ui/spinner'

const PRESET_LABELS: Record<DateRangePreset, string> = {
  [DATE_RANGE_PRESETS.LAST_7_DAYS]: 'Last 7 Days',
  [DATE_RANGE_PRESETS.LAST_30_DAYS]: 'Last 30 Days',
  [DATE_RANGE_PRESETS.LAST_90_DAYS]: 'Last 90 Days',
  [DATE_RANGE_PRESETS.THIS_MONTH]: 'This Month',
  [DATE_RANGE_PRESETS.LAST_MONTH]: 'Last Month',
  [DATE_RANGE_PRESETS.THIS_YEAR]: 'This Year',
  [DATE_RANGE_PRESETS.LAST_YEAR]: 'Last Year',
}

type DateRangeFilterProps = {
  startDate: string
  endDate: string
}

export function DateRangeFilter({ startDate, endDate }: DateRangeFilterProps) {
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>({
    from: new Date(startDate),
    to: new Date(endDate),
  })

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'MMM d, yyyy')
    } catch {
      return dateStr
    }
  }

  const formatDateForURL = (date: Date) => {
    return format(date, 'yyyy-MM-dd')
  }

  const handlePresetChange = (preset: DateRangePreset) => {
    const range = getDateRangeForPreset(preset)
    if (range) {
      const start = formatDateForURL(range.startDate)
      const end = formatDateForURL(range.endDate)

      startTransition(async () => {
        // Fetch the query and wait for it to complete (populates Relay store)
        await fetchQuery<CategoriesQuery>(environment, categoriesQuery, {
          startDate: parseISO(start).toISOString(),
          endDate: parseISO(end).toISOString(),
        }).toPromise()

        // Now navigate - the route loader will read from Relay store cache
        navigate({
          from: '/household/$householdId/categories',
          to: '/household/$householdId/categories',
          search: {
            start,
            end,
          },
        })
      })
    }
  }

  const handleApply = () => {
    if (tempDateRange?.from && tempDateRange?.to) {
      const start = formatDateForURL(tempDateRange.from)
      const end = formatDateForURL(tempDateRange.to)

      startTransition(async () => {
        // Fetch the query and wait for it to complete (populates Relay store)
        await fetchQuery<CategoriesQuery>(environment, categoriesQuery, {
          startDate: parseISO(start).toISOString(),
          endDate: parseISO(end).toISOString(),
        }).toPromise()

        // Now navigate - the route loader will read from Relay store cache
        navigate({
          from: '/household/$householdId/categories',
          to: '/household/$householdId/categories',
          search: {
            start,
            end,
          },
          replace: true,
        })
      })
      setIsCalendarOpen(false)
    }
  }

  const handleCancel = () => {
    setTempDateRange({
      from: new Date(startDate),
      to: new Date(endDate),
    })
    setIsCalendarOpen(false)
  }

  // Determine current preset if any
  const getCurrentPreset = (): string => {
    // Validate dates first
    if (!startDate || !endDate) {
      return 'Custom'
    }

    try {
      const currentStart = new Date(startDate)
      const currentEnd = new Date(endDate)

      // Check if dates are valid
      if (isNaN(currentStart.getTime()) || isNaN(currentEnd.getTime())) {
        return 'Custom'
      }

      const currentStartStr = format(currentStart, 'yyyy-MM-dd')
      const currentEndStr = format(currentEnd, 'yyyy-MM-dd')

      for (const [preset, label] of Object.entries(PRESET_LABELS)) {
        const range = getDateRangeForPreset(preset as DateRangePreset)
        if (range) {
          const presetStart = formatDateForURL(range.startDate)
          const presetEnd = formatDateForURL(range.endDate)
          if (currentStartStr === presetStart && currentEndStr === presetEnd) {
            return label
          }
        }
      }
    } catch {
      return 'Custom'
    }

    return 'Custom'
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <DropdownMenu open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            {formatDate(startDate)} - {formatDate(endDate)}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-auto p-0">
            <div className="p-3">
              <Calendar
                mode="range"
                selected={tempDateRange}
                onSelect={setTempDateRange}
                numberOfMonths={2}
                disabled={(date) => date > new Date()}
              />
            </div>
            <div className="flex gap-2 p-3 pt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleApply}
                disabled={!tempDateRange?.from || !tempDateRange?.to}
                className="flex-1"
              >
                Apply
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {isPending && <Spinner />}
      </div>

      <Select value={getCurrentPreset()} onValueChange={handlePresetChange}>
        <SelectTrigger className="w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(PRESET_LABELS).map(([preset, label]) => (
            <SelectItem key={preset} value={preset}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
