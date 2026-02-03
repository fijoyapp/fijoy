import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  LinkOptions,
  useNavigate,
  useParams,
  useSearch,
} from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { householdId } = useParams({ from: '/_user/household/$householdId' })

  const search = useSearch({
    from: '/_user/household/$householdId',
  })

  const [value, setValue] = useState(search.command_default_value ?? '')

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleSelect = (opts: LinkOptions) => {
    navigate(opts)
    setOpen(false)
    setValue('')
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput
          placeholder="Type a command or search..."
          value={value}
          onValueChange={setValue}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Create">
            <CommandItem
              onSelect={() =>
                handleSelect({
                  to: '/household/$householdId/transactions/new',
                  params: { householdId },
                })
              }
            >
              New Transaction
            </CommandItem>
            <CommandItem
              onSelect={() =>
                handleSelect({
                  to: '/household/$householdId/accounts/new',
                  params: { householdId },
                })
              }
            >
              New Account
            </CommandItem>
            <CommandItem
              onSelect={() =>
                handleSelect({
                  to: '/household/$householdId/investments/new',
                  params: { householdId },
                })
              }
            >
              New Investment
            </CommandItem>
            <CommandItem
              onSelect={() =>
                handleSelect({
                  to: '/household/$householdId/categories/new',
                  params: { householdId },
                })
              }
            >
              New Category
            </CommandItem>
            <CommandItem
              onSelect={() =>
                handleSelect({
                  to: '/household/$householdId/subscriptions/new',
                  params: { householdId },
                })
              }
            >
              New Subscription
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Navigate">
            <CommandItem
              onSelect={() =>
                handleSelect({
                  to: '/household/$householdId/transactions',
                  params: { householdId },
                })
              }
            >
              Transactions
            </CommandItem>
            <CommandItem
              onSelect={() =>
                handleSelect({
                  to: '/household/$householdId/accounts',
                  params: { householdId },
                })
              }
            >
              Accounts
            </CommandItem>
            <CommandItem
              onSelect={() =>
                handleSelect({
                  to: '/household/$householdId/investments',
                  params: { householdId },
                })
              }
            >
              Investments
            </CommandItem>
            <CommandItem
              onSelect={() =>
                handleSelect({
                  to: '/household/$householdId/categories',
                  params: { householdId },
                })
              }
            >
              Categories
            </CommandItem>
            <CommandItem
              onSelect={() =>
                handleSelect({
                  to: '/household/$householdId/subscriptions',
                  params: { householdId },
                })
              }
            >
              Subscriptions
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
