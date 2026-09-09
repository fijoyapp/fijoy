import { graphql, useMutation } from 'react-relay'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { match } from 'ts-pattern'
import currency from 'currency.js'

import type { editTransactionEntryDialogUpdateMutation } from './__generated__/editTransactionEntryDialogUpdateMutation.graphql'

import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CurrencyInput } from '@/components/currency-input'
import { commitMutationResult } from '@/lib/relay'
import { getLogoDomainURL } from '@/lib/logo'
import { useCurrency } from '@/hooks/use-currency'
import { useHousehold } from '@/hooks/use-household'
import { useDisplayCurrency } from '@/hooks/use-display-currency'
import { useEffect } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { MobileSelectionDrawer } from '@/components/mobile-selection-drawer'
import { DesktopSelectionPopover } from '@/components/desktop-selection-popover'

const editTransactionEntryDialogUpdateMutation = graphql`
  mutation editTransactionEntryDialogUpdateMutation(
    $id: ID!
    $input: UpdateTransactionEntryInput!
  ) {
    updateTransactionEntry(id: $id, input: $input) {
      node {
        id
        amount
        accountID
        account {
          id
          balance
          value
          householdCurrency {
            id
            code
          }
        }
      }
    }
  }
`

const formSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  accountId: z.string().min(1, 'Please select an account'),
})

export type EditEntryAccount = {
  id: string
  name: string
  type: string
  icon: string | null
  value: string
  householdCurrency: { code: string }
  user: { name: string }
}

const ACCOUNT_GROUPS = [
  ['liquidity', 'Liquidity'],
  ['investment', 'Investment'],
  ['property', 'Property'],
  ['receivable', 'Receivable'],
  ['liability', 'Liability'],
] as const

type EditTransactionEntryDialogProps = {
  entryId: string
  currentAmount: string
  currentAccountId: string
  accounts: ReadonlyArray<EditEntryAccount>
  onClose: () => void
}

export function EditTransactionEntryDialog({
  entryId,
  currentAmount,
  currentAccountId,
  accounts,
  onClose,
}: EditTransactionEntryDialogProps) {
  const [commitUpdate, isUpdateInFlight] =
    useMutation<editTransactionEntryDialogUpdateMutation>(
      editTransactionEntryDialogUpdateMutation,
    )

  const { household } = useHousehold()
  const { displayCurrencyCode } = useDisplayCurrency()
  const { formatCurrencyWithPrivacyMode } = useCurrency()
  const isMobile = useIsMobile()

  const originalSign = parseFloat(currentAmount) < 0 ? -1 : 1

  const form = useForm({
    defaultValues: {
      amount: Math.abs(parseFloat(currentAmount)),
      accountId: currentAccountId,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const formData = formSchema.parse(value)
      const signedAmount = currency(formData.amount).multiply(originalSign)

      const result =
        await commitMutationResult<editTransactionEntryDialogUpdateMutation>(
          commitUpdate,
          {
            variables: {
              id: entryId,
              input: {
                amount: signedAmount.toString(),
                accountID: formData.accountId,
              },
            },
            updater: (store) => {
              store.get(household.id)?.invalidateRecord()
            },
          },
        )

      match(result)
        .with({ status: 'success' }, () => {
          toast.success('Entry updated successfully!')
          onClose()
        })
        .with({ status: 'error' }, ({ error }) => {
          toast.error(error.toString())
        })
        .exhaustive()
    },
  })

  const selectedAccountId = form.state.values.accountId
  const accountSelectionAvailable =
    !selectedAccountId ||
    accounts.some((account) => account.id === selectedAccountId)

  useEffect(() => {
    if (!accountSelectionAvailable) form.setFieldValue('accountId', '')
  }, [accountSelectionAvailable, form])

  const accountGroups = ACCOUNT_GROUPS.map(([type, label]) => ({
    label,
    items: accounts.filter((account) => account.type === type),
  })).filter((group) => group.items.length > 0)

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Entry</DialogTitle>
        <DialogDescription>
          Update entry details. Switching the account also switches the
          entry&apos;s currency.
        </DialogDescription>
      </DialogHeader>

      <form
        id="edit-entry-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field
            name="accountId"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Account</FieldLabel>
                  {isMobile ? (
                    <MobileSelectionDrawer
                      groups={accountGroups}
                      name={field.name}
                      value={field.state.value}
                      label="Account"
                      placeholder="Select an account"
                      emptyMessage="No accounts available."
                      getValue={(account) => account.id}
                      getLabel={(account) => account.name}
                      renderItem={(account) => (
                        <EditEntryAccountDetails
                          account={account}
                          formattedValue={formatCurrencyWithPrivacyMode({
                            value: account.value,
                            currencyCode: account.householdCurrency.code,
                            liability: account.type === 'liability',
                          })}
                        />
                      )}
                      onValueChange={field.handleChange}
                      onBlur={field.handleBlur}
                      invalid={isInvalid}
                    />
                  ) : (
                    <DesktopSelectionPopover
                      groups={accountGroups}
                      name={field.name}
                      value={field.state.value}
                      label="Account"
                      placeholder="Select an account"
                      emptyMessage="No accounts available."
                      getValue={(account) => account.id}
                      getLabel={(account) => account.name}
                      renderItem={(account) => (
                        <EditEntryAccountDetails
                          account={account}
                          formattedValue={formatCurrencyWithPrivacyMode({
                            value: account.value,
                            currencyCode: account.householdCurrency.code,
                            liability: account.type === 'liability',
                          })}
                        />
                      )}
                      onValueChange={field.handleChange}
                      onBlur={field.handleBlur}
                      invalid={isInvalid}
                      triggerClassName="h-12 justify-start p-2"
                    />
                  )}
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />
          <form.Field
            name="amount"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              const selectedAccount = accounts.find(
                (a) => a.id === form.state.values.accountId,
              )
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Amount</FieldLabel>
                  <CurrencyInput
                    id={field.name}
                    name={field.name}
                    placeholder="Please enter an amount"
                    onValueChange={(e) => {
                      field.handleChange(e.floatValue!)
                    }}
                    value={field.state.value}
                    locale={household.locale}
                    currency={
                      selectedAccount?.householdCurrency.code ??
                      displayCurrencyCode
                    }
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />
        </FieldGroup>
      </form>

      <DialogFooter>
        <Button variant="outline" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="edit-entry-form"
          disabled={isUpdateInFlight}
        >
          {isUpdateInFlight ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogFooter>
    </>
  )
}

function EditEntryAccountDetails({
  account,
  formattedValue,
}: {
  account: EditEntryAccount
  formattedValue: string
}) {
  return (
    <Item size="xs" className="min-w-0 flex-1 border-0 p-0">
      <ItemMedia variant="image">
        <Avatar className="size-6">
          {account.icon && (
            <AvatarImage src={getLogoDomainURL(account.icon)} alt="" />
          )}
          <AvatarFallback>{account.name}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent className="min-w-0 gap-0">
        <ItemTitle>{account.name}</ItemTitle>
        <ItemDescription>
          <span className="tabular-nums">{formattedValue}</span>
          <span aria-hidden="true"> · </span>
          {account.user.name}
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}
