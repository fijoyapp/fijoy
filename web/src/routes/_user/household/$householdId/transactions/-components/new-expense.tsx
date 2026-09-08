import { TransactionAccountPicker } from './transaction-account-picker'
import { TransactionCategoryPicker } from './transaction-category-picker'
import { graphql } from 'relay-runtime'
import { useForm, useStore } from '@tanstack/react-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { useFragment, useMutation } from 'react-relay'
import currency from 'currency.js'
import invariant from 'tiny-invariant'
import { match } from 'ts-pattern'
import { useEffect } from 'react'
import type { newExpenseMutation } from './__generated__/newExpenseMutation.graphql'
import type { newExpenseFragment$key } from './__generated__/newExpenseFragment.graphql'
import { useLogTransaction } from '@/hooks/use-log-transaction'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useHousehold } from '@/hooks/use-household'
import { useUser } from '@/hooks/use-user'
import { useDefaultOwnerUserID } from '@/hooks/use-default-owner-user-id'
import { useHouseholdMembers } from '@/hooks/use-household-members'
import { OwnerSelect } from '../../-components/owner-select'
import { CurrencyInput } from '@/components/currency-input'
import { commitMutationResult } from '@/lib/relay'
import { Calendar } from '@/components/ui/calendar'
import { useDisplayCurrency } from '@/hooks/use-display-currency'

const formSchema = z.object({
  description: z
    .string()
    .max(256, 'Description must be at most 256 characters.'),
  amount: z.number().positive('Amount must be positive'),
  datetime: z.date(),
  ownerUserID: z.string().min(1, 'Please select an owner'),
  accountId: z.string().min(1, 'Please select an account'),
  categoryId: z.string().min(1, 'Please select a category'),
  excludeFromReports: z.boolean(),
})

const newExpenseFragment = graphql`
  fragment newExpenseFragment on Household
  @argumentDefinitions(viewUserIds: { type: "[ID!]" }) {
    accounts(where: { archived: false, userIDIn: $viewUserIds }) {
      edges {
        node {
          id
          type
          ...transactionAccountPickerFragment
          householdCurrency {
            code
          }
        }
      }
    }
    transactionCategories {
      edges {
        node {
          id
          type
          ...transactionCategoryPickerFragment
        }
      }
    }
  }
`

const newExpenseMutation = graphql`
  mutation newExpenseMutation($input: CreateExpenseInputCustom!) {
    createExpense(input: $input) {
      node {
        ...transactionCardFragment
        id
        description
        datetime
        category {
          name
        }
      }
    }
  }
`

type NewExpenseProps = {
  fragmentRef: newExpenseFragment$key
}

export function NewExpense({ fragmentRef }: NewExpenseProps) {
  const data = useFragment(newExpenseFragment, fragmentRef)

  const [commitMutation, isMutationInFlight] =
    useMutation<newExpenseMutation>(newExpenseMutation)

  const { displayCurrencyCode } = useDisplayCurrency()

  const { household } = useHousehold()
  const { user } = useUser()

  const ownerOptions = useHouseholdMembers()
  const defaultOwnerUserID = useDefaultOwnerUserID(user.id)
  // Filter accounts - show all non-investment accounts
  const availableAccounts =
    data.accounts.edges?.map((account) => {
      invariant(account?.node, 'Account node is null')
      return account.node
    }) ?? []

  // Filter categories - only expense categories
  const expenseCategories =
    data.transactionCategories.edges
      ?.map((category) => {
        invariant(category?.node, 'Category node is null')
        return category.node
      })
      .filter((category) => category.type === 'expense') ?? []

  const form = useForm({
    defaultValues: {
      description: '',
      amount: undefined as unknown as number,
      datetime: new Date(),
      ownerUserID: defaultOwnerUserID,
      accountId: '',
      categoryId: '',
      excludeFromReports: false,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const formData = formSchema.parse(value)

      // Amount is negative for expenses
      const amount = currency(formData.amount).multiply(-1)

      const result = await commitMutationResult<newExpenseMutation>(
        commitMutation,
        {
          variables: {
            input: {
              transaction: {
                description: formData.description,
                datetime: formData.datetime.toISOString(),
                categoryID: formData.categoryId,
                excludeFromReports: formData.excludeFromReports,
                userID: formData.ownerUserID,
              },
              transactionEntry: {
                amount: amount.toString(),
                accountID: formData.accountId,
              },
              fees: [],
            },
          },
          updater: (store) => {
            store.get(household.id)?.invalidateRecord()
          },
        },
      )

      match(result)
        .with({ status: 'success' }, ({ data: resultData }) => {
          invariant(
            resultData.createExpense.node,
            'No data returned from mutation',
          )

          toast.success('Expense created successfully!')
        })
        .with({ status: 'error' }, ({ error }) => {
          toast.error(error.toString())
        })
        .exhaustive()
    },
  })

  const selectedAccountId = useStore(
    form.store,
    (state) => state.values.accountId,
  )

  const selectedAccount = availableAccounts.find(
    (acc) => acc.id === selectedAccountId,
  )

  const { defaults, setDefaults } = useLogTransaction()
  useEffect(() => {
    if (!defaults) return
    if (defaults.accountId !== undefined) {
      form.setFieldValue('accountId', defaults.accountId)
    }
    setDefaults(undefined)
  }, [defaults, form, setDefaults])

  return (
    <Card className="w-full">
      <CardContent>
        <form
          id="new-expense-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="categoryId"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field
                    data-invalid={isInvalid}
                    data-transaction-initial-focus
                  >
                    <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                    <TransactionCategoryPicker
                      categories={expenseCategories}
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                      onBlur={field.handleBlur}
                      invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <form.Field
              name="accountId"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid} className="max-md:gap-1">
                    <FieldLabel htmlFor={field.name}>Account</FieldLabel>
                    <TransactionAccountPicker
                      preferredTypes={['liquidity', 'liability']}
                      accounts={availableAccounts}
                      name={field.name}
                      label="Account"
                      value={field.state.value}
                      onValueChange={field.handleChange}
                      onBlur={field.handleBlur}
                      invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <form.Field
              name="amount"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
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
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <form.Field
              name="description"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Input
                      data-1p-ignore
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Coffee at Starbucks"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            {ownerOptions.length > 1 && (
              <form.Field
                name="ownerUserID"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Owner</FieldLabel>
                      <OwnerSelect
                        id={field.name}
                        name={field.name}
                        options={ownerOptions}
                        value={field.state.value}
                        onValueChange={(value) => field.handleChange(value)}
                        onBlur={field.handleBlur}
                        ariaInvalid={isInvalid}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
            )}

            <form.Field
              name="datetime"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Date</FieldLabel>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            id={field.name}
                            name={field.name}
                            type="button"
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            {field.state.value.toLocaleDateString(
                              household.locale,
                              {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              },
                            )}
                          </Button>
                        }
                      />
                      <DropdownMenuContent className="w-auto p-0" side="top">
                        <Calendar
                          mode="single"
                          selected={field.state.value}
                          onSelect={(date) => {
                            if (date) {
                              field.handleChange(date)
                            }
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <FieldSet>
              <FieldLegend variant="label">Options</FieldLegend>
              <FieldGroup data-slot="checkbox-group">
                <form.Field
                  name="excludeFromReports"
                  children={(field) => {
                    return (
                      <Field orientation={'horizontal'}>
                        <Button
                          type="button"
                          id={field.name}
                          name={field.name}
                          aria-pressed={field.state.value}
                          variant="outline"
                          onClick={() => field.handleChange(!field.state.value)}
                          onBlur={field.handleBlur}
                          className="aria-pressed:border-primary"
                        >
                          Exclude from reports
                        </Button>
                      </Field>
                    )
                  }}
                />
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button
            disabled={isMutationInFlight}
            type="submit"
            form="new-expense-form"
          >
            {isMutationInFlight ? 'Creating...' : 'Create'}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
