import { ConnectionHandler, ROOT_ID, graphql } from 'relay-runtime'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { useFragment, useMutation, useRefetchableFragment } from 'react-relay'
import { capitalize } from 'lodash-es'
import invariant from 'tiny-invariant'
import { match } from 'ts-pattern'
import { useNavigate } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import { INVESTMENT_TYPE_LIST } from '@/constant'
import { useHousehold } from '@/hooks/use-household'
import { CurrencyInput } from '@/components/currency-input'
import { commitMutationResult } from '@/lib/relay'
import { type newInvestmentMutation } from './__generated__/newInvestmentMutation.graphql'
import { newInvestmentFragment$key } from './__generated__/newInvestmentFragment.graphql'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getLogoStockTickerURL } from '@/lib/logo'
import { useCurrency } from '@/hooks/use-currency'
import { cn } from '@/lib/utils'
import { newInvestmentEquityQuoteFragment$key } from './__generated__/newInvestmentEquityQuoteFragment.graphql'
import { useEffect, useState, useTransition } from 'react'
import { Spinner } from '@/components/ui/spinner'

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Investment name must be at least 1 character.')
    .max(32, 'Investment name must be at most 32 characters.'),
  symbol: z
    .string()
    .min(1, 'Investment symbol must be at least 1 character.')
    .max(32, 'Investment symbol must be at most 32 characters.'),
  type: z.literal(['stock', 'crypto']),
  amount: z.number(),
  costBasis: z.number(),
  accountId: z.string(),
})

const newInvestmentFragment = graphql`
  fragment newInvestmentFragment on Query {
    accounts {
      edges {
        node {
          id
          type
          name
        }
      }
    }
  }
`

const newInvestmentEquityQuoteFragment = graphql`
  fragment newInvestmentEquityQuoteFragment on Query
  @refetchable(queryName: "newInvestmentEquityQuoteQuery")
  @argumentDefinitions(symbol: { type: "String", defaultValue: "" }) {
    equityQuote(symbol: $symbol) {
      currentPrice
      symbol
      exchange
      name
      currency
    }
  }
`

const newInvestmentMutation = graphql`
  mutation newInvestmentMutation(
    $input: CreateInvestmentInputCustom!
    $connections: [ID!]!
  ) {
    createInvestment(input: $input) @appendEdge(connections: $connections) {
      node {
        id
        name
        valueInHouseholdCurrency
        account {
          name
          id
        }
        ...investmentCardFragment
      }
    }
  }
`

type NewInvestmentProps = {
  newInvestmentFragmentRef: newInvestmentFragment$key
  newInvestmentEquityQuoteFragmentRef: newInvestmentEquityQuoteFragment$key
}

export function NewInvestment({
  newInvestmentFragmentRef,
  newInvestmentEquityQuoteFragmentRef,
}: NewInvestmentProps) {
  const [isPending, startTransition] = useTransition()
  const data = useFragment(newInvestmentFragment, newInvestmentFragmentRef)

  const [equityQuoteData, refetchEquityQuote] = useRefetchableFragment(
    newInvestmentEquityQuoteFragment,
    newInvestmentEquityQuoteFragmentRef,
  )
  const [queriedSymbol, setQueriedSymbol] = useState('')

  const navigate = useNavigate()

  const { formatCurrency } = useCurrency()

  const [commitMutation, isMutationInFlight] =
    useMutation<newInvestmentMutation>(newInvestmentMutation)
  const { household } = useHousehold()

  const investmentAccounts =
    data.accounts.edges
      ?.map((account) => {
        invariant(account?.node, 'Account node is null')
        return account.node
      })
      .filter((account) => account.type === 'investment') ?? []

  const form = useForm({
    defaultValues: {
      name: '',
      symbol: '',
      type: 'stock',
      amount: 0,
      costBasis: 0,
      accountId: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const formData = formSchema.parse(value)

      const connectionID = ConnectionHandler.getConnectionID(
        ROOT_ID,
        'investmentsPanel_investments',
      )

      const result = await commitMutationResult<newInvestmentMutation>(
        commitMutation,
        {
          variables: {
            input: {
              input: {
                name: formData.name,
                symbol: formData.symbol,
                type: formData.type,
                amount: formData.amount.toString(),
                accountID: formData.accountId,
              },
              costBasis: formData.costBasis.toString(),
            },
            connections: [connectionID],
          },
        },
      )

      // 2. Pattern match the result
      match(result)
        .with({ status: 'success' }, ({ data: resultData }) => {
          invariant(
            resultData.createInvestment.node,
            'No data returned from mutation',
          )

          form.reset()
          navigate({
            from: '/household/$householdId/investments/new',
            to: '/household/$householdId/investments/$investmentId',
            params: {
              investmentId: resultData.createInvestment.node.id,
            },
          })
          toast.success(
            `${resultData.createInvestment.node.name} is ready to go!`,
          )
        })
        .with({ status: 'error' }, ({ error }) => {
          toast.error(error.toString())
        })
        .exhaustive()
    },
  })

  useEffect(() => {
    form.validateField('symbol', 'change')
  }, [equityQuoteData, isPending, queriedSymbol, form])

  useEffect(() => {
    if (equityQuoteData.equityQuote) {
      form.setFieldValue('name', equityQuoteData.equityQuote.name)
    }
  }, [equityQuoteData, form])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>New Investment</CardTitle>
        <CardDescription>
          Start tracking your investment in Fijoy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="new-investment-form"
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
                    <Combobox
                      items={investmentAccounts.map((account) => account.id)}
                      itemToStringLabel={(item) =>
                        investmentAccounts.find((acc) => acc.id === item)
                          ?.name || ''
                      }
                      value={field.state.value}
                      onValueChange={(value) => {
                        field.handleChange(value || '')
                      }}
                    >
                      <ComboboxInput
                        data-1p-ignore
                        id={field.name}
                        name={field.name}
                        placeholder="Select an account"
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                      />
                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item: string) => (
                            <ComboboxItem key={item} value={item}>
                              {investmentAccounts.find((acc) => acc.id === item)
                                ?.name || ''}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name="type"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Type</FieldLabel>
                    <Combobox
                      items={INVESTMENT_TYPE_LIST}
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value || '')}
                    >
                      <ComboboxInput
                        id={field.name}
                        name={field.name}
                        placeholder="Select a type"
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        className="*:capitalize"
                      />
                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList className="">
                          {(item: string) => (
                            <ComboboxItem
                              key={item}
                              value={item}
                              className="flex flex-col items-start gap-0"
                            >
                              <span className="">{capitalize(item)}</span>
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name="symbol"
              validators={{
                onChangeAsync: ({ value }) => {
                  if (!value) return undefined // skip for empty value

                  // zod stuff
                  const parseResult = formSchema.shape.symbol.safeParse(value)
                  if (!parseResult.success) {
                    return parseResult.error.issues[0]
                  }

                  // value is different than queriedSymbol, meaning user is still typing
                  if (value !== queriedSymbol) return undefined

                  // is currently fetching
                  if (isPending) return undefined

                  // after fetch, no quote found
                  if (!equityQuoteData.equityQuote) {
                    return {
                      message: 'Unable to find a quote for this symbol.',
                    }
                  }

                  return undefined
                },
                onChangeAsyncDebounceMs: 500,
              }}
              listeners={{
                onChange: (value) => {
                  startTransition(() => {
                    setQueriedSymbol(value.value)
                    refetchEquityQuote({ symbol: value.value })
                  })
                },
                onChangeDebounceMs: 500,
              }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Symbol</FieldLabel>
                    <Input
                      data-1p-ignore
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="e.g. XEQT.TO"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            {equityQuoteData.equityQuote ? (
              <Item variant={'outline'}>
                <ItemMedia variant="image">
                  <Avatar className="">
                    <AvatarImage
                      src={getLogoStockTickerURL(
                        equityQuoteData.equityQuote.symbol || '',
                      )}
                      alt={equityQuoteData.equityQuote.symbol || 'unknown logo'}
                    />
                    <AvatarFallback>
                      {equityQuoteData.equityQuote.symbol}
                    </AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent className="gap-px">
                  <ItemTitle className={cn('font-semibold')}>
                    {equityQuoteData.equityQuote.name}
                  </ItemTitle>
                  <ItemDescription>
                    {formatCurrency({
                      value: equityQuoteData.equityQuote.currentPrice,
                      currencyCode: equityQuoteData.equityQuote.currency,
                    })}
                  </ItemDescription>
                </ItemContent>
                <ItemContent className="items-end gap-px">
                  <ItemTitle className="">
                    <span>{equityQuoteData.equityQuote.symbol}</span>
                  </ItemTitle>
                  <ItemDescription className="">
                    <span>{equityQuoteData.equityQuote.exchange}</span>
                  </ItemDescription>
                </ItemContent>
              </Item>
            ) : (
              <Item variant="outline">
                <ItemContent className="gap-px">
                  <ItemTitle className={cn('')}>
                    Start typing the symbol to fetch quote...
                  </ItemTitle>
                  <ItemDescription>
                    Symbols are formatted according to Yahoo Finance.
                  </ItemDescription>
                </ItemContent>

                <ItemContent className="items-end gap-px">
                  {isPending && <Spinner />}
                </ItemContent>
              </Item>
            )}
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      data-1p-ignore
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="e.g. iShares Core Equity ETF Portfolio"
                      autoComplete="off"
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
                    <Input
                      type="number"
                      data-1p-ignore
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        if (e.target.value === '') {
                          field.handleChange(undefined!)
                        } else {
                          field.handleChange(Number(e.target.value))
                        }
                      }}
                      aria-invalid={isInvalid}
                      placeholder="How many shares do you own?"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name="costBasis"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Cost Basis</FieldLabel>
                    <FieldDescription> </FieldDescription>
                    <CurrencyInput
                      id={field.name}
                      name={field.name}
                      placeholder="Please enter a number"
                      onValueChange={(e) => {
                        field.handleChange(e.floatValue!)
                      }}
                      value={field.state.value}
                      locale={household.locale}
                      currency={household.currency.code}
                      maximumFractionDigits={12}
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
            form="new-investment-form"
          >
            {isMutationInFlight ? 'Creating...' : 'Create'}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
