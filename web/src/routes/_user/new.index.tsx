import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/new/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/new/"!</div>
}
