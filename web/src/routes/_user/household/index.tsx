import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/household/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/household/"!</div>
}
