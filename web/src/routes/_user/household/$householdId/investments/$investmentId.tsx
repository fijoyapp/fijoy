import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_user/household/$householdId/investments/$investmentId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/_user/household/$householdId/investments/$investmentId"!</div>
  )
}
