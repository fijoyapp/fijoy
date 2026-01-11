import { Outlet, createFileRoute } from '@tanstack/react-router'

import { loadQuery, usePreloadedQuery } from 'react-relay'
import { Fragment } from 'react/jsx-runtime'
import { CategoriesPanel } from './-components/categories-panel'
import { Separator } from '@/components/ui/separator'
import { environment } from '@/environment'
import { useDualPaneDisplay } from '@/hooks/use-screen-size'
import { PendingComponent } from '@/components/pending-component'
import { ScrollArea } from '@/components/ui/scroll-area'
import { categoriesQuery } from './-categories-query'
import { type CategoriesQuery } from './__generated__/CategoriesQuery.graphql'

export const Route = createFileRoute(
  '/_user/household/$householdId/categories',
)({
  component: RouteComponent,
  beforeLoad: () => {
    return loadQuery<CategoriesQuery>(
      environment,
      categoriesQuery,
      {},
      { fetchPolicy: 'store-or-network' },
    )
  },
  pendingComponent: PendingComponent,
})

function RouteComponent() {
  const queryRef = Route.useRouteContext()

  const data = usePreloadedQuery<CategoriesQuery>(categoriesQuery, queryRef)

  const duelPaneDisplay = useDualPaneDisplay()

  return (
    <Fragment>
      {duelPaneDisplay ? (
        <div className="flex h-[calc(100vh-48px)]">
          <ScrollArea className="flex-1 overflow-y-auto p-4">
            <CategoriesPanel fragmentRef={data} />
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
