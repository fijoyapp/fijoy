import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/household/$householdId/accounts/$accountId')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-full">
      <div className="flex-1">
        <div>Hello "/_user/household/accounts/$accountId"!</div>
      </div>
    </div>
  )
}

function AccountDetailsPage() {}
