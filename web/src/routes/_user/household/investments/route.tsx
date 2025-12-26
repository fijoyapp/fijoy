import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/household/investments')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/household/investments"!</div>
}
