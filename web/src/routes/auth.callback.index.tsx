import { createFileRoute, Navigate } from '@tanstack/react-router'
import { z } from 'zod'

const SearchSchema = z.object({
  token: z.string(),
})

export const Route = createFileRoute('/auth/callback/')({
  component: RouteComponent,
  validateSearch: (search) => SearchSchema.parse(search),
})

function RouteComponent() {
  localStorage.setItem('token', Route.useSearch().token)

  return <Navigate to="/household" />
}
