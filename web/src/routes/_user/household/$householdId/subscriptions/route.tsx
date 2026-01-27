import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_user/household/$householdId/subscriptions',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/household/$householdId/subscriptions"!</div>
}
