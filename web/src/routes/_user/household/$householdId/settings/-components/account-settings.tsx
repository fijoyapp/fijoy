import { useState } from 'react'
import { graphql, useFragment, useMutation } from 'react-relay'
import { Archive, ArchiveRestore } from 'lucide-react'
import { toast } from 'sonner'
import type { accountSettingsFragment$key } from './__generated__/accountSettingsFragment.graphql'
import type { accountSettingsUnarchiveMutation } from './__generated__/accountSettingsUnarchiveMutation.graphql'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { useHousehold } from '@/hooks/use-household'
import { commitMutationResult } from '@/lib/relay'

const fragment = graphql`
  fragment accountSettingsFragment on Query {
    accounts(where: { archived: true }) {
      edges {
        node {
          id
          name
          type
          archived
          user {
            name
          }
          householdCurrency {
            code
          }
        }
      }
    }
  }
`

const mutation = graphql`
  mutation accountSettingsUnarchiveMutation($id: ID!) {
    unarchiveAccount(id: $id) {
      id
      archived
    }
  }
`

export function AccountSettings({
  fragmentRef,
}: {
  fragmentRef: accountSettingsFragment$key
}) {
  const data = useFragment(fragment, fragmentRef)
  const { household } = useHousehold()
  const [commit, isInFlight] =
    useMutation<accountSettingsUnarchiveMutation>(mutation)
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState('')
  const accounts = (data.accounts.edges ?? [])
    .flatMap((edge) => (edge?.node?.archived ? [edge.node] : []))
    .sort((a, b) => a.name.localeCompare(b.name, household.locale))

  async function unarchive(id: string, name: string) {
    setPendingId(id)
    setFeedback('')
    const result = await commitMutationResult<accountSettingsUnarchiveMutation>(
      commit,
      {
        variables: { id },
        updater: (store) => store.get(household.id)?.invalidateRecord(),
      },
    )
    setPendingId(null)
    if (result.status === 'error') {
      toast.error(`Could not unarchive ${name}. Please try again.`)
      return
    }
    setFeedback(`${name} is active again. You can find it in Accounts.`)
    toast.success(`${name} unarchived.`)
  }

  return (
    <section
      className="flex min-w-0 flex-col gap-5"
      aria-labelledby="account-settings-title"
    >
      <header className="flex flex-col gap-1">
        <h1
          id="account-settings-title"
          className="text-lg font-semibold tracking-tight"
        >
          Account settings
        </h1>
        <p className="text-muted-foreground text-xs/relaxed">
          Bring archived accounts back into your ledger.
        </p>
      </header>
      <section
        aria-labelledby="archived-accounts-title"
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col gap-1">
          <h2 id="archived-accounts-title" className="text-sm font-medium">
            Archived accounts
          </h2>
          <p className="text-muted-foreground max-w-prose text-xs/relaxed">
            Unarchiving makes an account available for new transactions again.
            Its history stays intact.
          </p>
        </div>
        {accounts.length === 0 ? (
          <Empty className="border py-8">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Archive aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>No archived accounts</EmptyTitle>
              <EmptyDescription>
                Accounts you archive will appear here when you need them again.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className="divide-y border-y">
            {accounts.map((account) => (
              <li
                key={account.id}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="text-sm font-medium wrap-anywhere">
                    {account.name}
                  </p>
                  <p className="text-muted-foreground text-xs/relaxed wrap-anywhere">
                    {account.user.name} ·{' '}
                    <span className="capitalize">{account.type}</span> ·{' '}
                    {account.householdCurrency.code}
                  </p>
                </div>
                <Button
                  variant="outline"
                  disabled={isInFlight}
                  aria-label={`Unarchive ${account.name}`}
                  onClick={() => unarchive(account.id, account.name)}
                >
                  <ArchiveRestore data-icon="inline-start" aria-hidden="true" />
                  {pendingId === account.id ? 'Unarchiving…' : 'Unarchive'}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
      <p
        role="status"
        className="text-muted-foreground text-xs/relaxed empty:hidden"
      >
        {feedback}
      </p>
    </section>
  )
}
