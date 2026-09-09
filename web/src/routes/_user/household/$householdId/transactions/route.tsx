import {
  Outlet,
  createFileRoute,
  stripSearchParams,
} from '@tanstack/react-router'
import * as z from 'zod'
import { getDefaultDates } from '@/lib/date-range'
import { GenericError } from '@/components/generic-error'

const defaults = getDefaultDates()

const SearchSchema = z.object({
  start: z.string().optional().default(defaults.start),
  end: z.string().optional().default(defaults.end),
})

export const Route = createFileRoute(
  '/_user/household/$householdId/transactions',
)({
  component: RouteComponent,
  errorComponent: GenericError,
  validateSearch: SearchSchema,
  search: {
    middlewares: [stripSearchParams(defaults)],
  },
})

function RouteComponent() {
  return (
    <div className="h-[calc(100dvh-2.5rem)] min-h-0 min-w-0 overflow-hidden">
      <div className="mx-auto flex h-full min-h-0 w-full max-w-5xl min-w-0 flex-col overflow-hidden p-4">
        <Outlet />
      </div>
    </div>
  )
}
