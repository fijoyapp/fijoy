import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_user/household/$householdId/categories/new',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/household/$householdId/categories/new"!</div>
}
