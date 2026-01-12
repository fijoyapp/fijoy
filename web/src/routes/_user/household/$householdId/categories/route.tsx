import { Outlet, createFileRoute } from '@tanstack/react-router'
import { loadQuery, usePreloadedQuery } from 'react-relay'
import { Fragment } from 'react/jsx-runtime'
import * as z from 'zod'
import { CategoriesPanel } from './-components/categories-panel'
import { Separator } from '@/components/ui/separator'
import { environment } from '@/environment'
import { useDualPaneDisplay } from '@/hooks/use-screen-size'
import { PendingComponent } from '@/components/pending-component'
import { ScrollArea } from '@/components/ui/scroll-area'
import { categoriesQuery } from './-categories-query'
import { type CategoriesQuery } from './__generated__/CategoriesQuery.graphql'
import {
  dateRangeToISO,
  getDateRangeForPreset,
  DATE_RANGE_PRESETS,
} from '@/lib/date-range'
import { format, parseISO } from 'date-fns'

// Get default "This Month" dates
const getDefaultDates = () => {
  const range = getDateRangeForPreset(DATE_RANGE_PRESETS.THIS_MONTH)
  if (!range) return { start: '', end: '' }
  return {
    start: format(range.startDate, 'yyyy-MM-dd'),
    end: format(range.endDate, 'yyyy-MM-dd'),
  }
}

const defaults = getDefaultDates()

const SearchSchema = z.object({
  start: z.string().default(defaults.start),
  end: z.string().default(defaults.end),
})

export const Route = createFileRoute(
  '/_user/household/$householdId/categories',
)({
  component: RouteComponent,
  validateSearch: (search) => SearchSchema.parse(search),
  beforeLoad: ({ search }) => {
    const start = search.start
    const end = search.end

    // Parse dates and convert to ISO for GraphQL
    let period = {}
    try {
      const startDate = parseISO(start)
      const endDate = parseISO(end)
      period = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }
    } catch {
      // If parsing fails, use defaults
      const range = getDateRangeForPreset(DATE_RANGE_PRESETS.THIS_MONTH)
      if (range) {
        period = dateRangeToISO(range) || {}
      }
    }

    return loadQuery<CategoriesQuery>(
      environment,
      categoriesQuery,
      period,
      { fetchPolicy: 'store-or-network' },
    )
  },
  pendingComponent: PendingComponent,
})

function RouteComponent() {
  const queryRef = Route.useRouteContext()
  const search = Route.useSearch()

  const data = usePreloadedQuery<CategoriesQuery>(categoriesQuery, queryRef)

  const duelPaneDisplay = useDualPaneDisplay()

  // Get dates from URL (already has defaults from schema)
  const start = search.start
  const end = search.end

  // Convert to ISO for display
  let startISO = ''
  let endISO = ''
  try {
    startISO = parseISO(start).toISOString()
    endISO = parseISO(end).toISOString()
  } catch {
    // Fallback to defaults if parsing fails
    const range = getDateRangeForPreset(DATE_RANGE_PRESETS.THIS_MONTH)
    if (range) {
      const isoRange = dateRangeToISO(range)
      if (isoRange) {
        startISO = isoRange.startDate
        endISO = isoRange.endDate
      }
    }
  }

  return (
    <Fragment>
      {duelPaneDisplay ? (
        <div className="flex h-[calc(100vh-48px)]">
          <ScrollArea className="flex-1 overflow-y-auto p-4">
            <CategoriesPanel
              fragmentRef={data}
              startDate={startISO}
              endDate={endISO}
            />
          </ScrollArea>
          <Separator orientation="vertical" className="w-px" />
          <ScrollArea
            className="flex-1 overflow-y-auto p-4"
            key={location.pathname}
          >
            <Outlet />
          </ScrollArea>
        </div>
      ) : (
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      )}
    </Fragment>
  )
}
