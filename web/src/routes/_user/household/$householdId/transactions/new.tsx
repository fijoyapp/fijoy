import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_user/household/$householdId/transactions/new',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/household/$householdId/transactions/new"!</div>
}
