import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/household/accounts/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/household/accounts/"!</div>
}
