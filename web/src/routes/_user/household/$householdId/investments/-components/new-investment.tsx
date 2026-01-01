import { ConnectionHandler, ROOT_ID, graphql } from 'relay-runtime'
import { useForm, useStore } from '@tanstack/react-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { useFragment, useMutation } from 'react-relay'
import { capitalize } from 'lodash-es'
import currency from 'currency.js'
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
import {
  ACCOUNT_TYPE_DESCRIPTION,
  ACCOUNT_TYPE_LIST,
  INVESTMENT_TYPE_LIST,
} from '@/constant'
import { useHousehold } from '@/hooks/use-household'
import { CurrencyInput } from '@/components/currency-input'
import { commitMutationResult } from '@/lib/relay'
import { type newInvestmentMutation } from './__generated__/newInvestmentMutation.graphql'
import { newInvestmentFragment$key } from './__generated__/newInvestmentFragment.graphql'

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
    currencies {
      id
      code
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
  fragmentRef: newInvestmentFragment$key
}

export function NewInvestment({ fragmentRef }: NewInvestmentProps) {
  const data = useFragment(newInvestmentFragment, fragmentRef)
  const navigate = useNavigate()

  const [commitMutation, isMutationInFlight] =
    useMutation<newInvestmentMutation>(newInvestmentMutation)
  const { household } = useHousehold()

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
        'accountsPanel_accounts',
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

  // const currencyCode = useStore(
  //   form.store,
  //   (state) => state.values.currencyCode,
  // )

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
          id="new-account-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
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
                      placeholder="Wealthsimple Chequing"
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
                              <span className="font-semibold">
                                {capitalize(item)}
                              </span>
                              <span>{ACCOUNT_TYPE_DESCRIPTION[item]}</span>
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
            {/* <form.Field */}
            {/*   name="currencyCode" */}
            {/*   children={(field) => { */}
            {/*     const isInvalid = */}
            {/*       field.state.meta.isTouched && !field.state.meta.isValid */}
            {/*     return ( */}
            {/*       <Field data-invalid={isInvalid}> */}
            {/*         <FieldLabel htmlFor={field.name}>Currency</FieldLabel> */}
            {/*         <Combobox */}
            {/*           items={data.currencies.map((c) => c.code)} */}
            {/*           value={field.state.value} */}
            {/*           onValueChange={(value) => { */}
            {/*             field.handleChange(value || '') */}
            {/*           }} */}
            {/*         > */}
            {/*           <ComboboxInput */}
            {/*             id={field.name} */}
            {/*             name={field.name} */}
            {/*             placeholder="Select a currency" */}
            {/*             onBlur={field.handleBlur} */}
            {/*             aria-invalid={isInvalid} */}
            {/*           /> */}
            {/*           <ComboboxContent> */}
            {/*             <ComboboxEmpty>No items found.</ComboboxEmpty> */}
            {/*             <ComboboxList> */}
            {/*               {(item: string) => ( */}
            {/*                 <ComboboxItem key={item} value={item}> */}
            {/*                   {item} */}
            {/*                 </ComboboxItem> */}
            {/*               )} */}
            {/*             </ComboboxList> */}
            {/*           </ComboboxContent> */}
            {/*         </Combobox> */}
            {/*         {isInvalid && ( */}
            {/*           <FieldError errors={field.state.meta.errors} /> */}
            {/*         )} */}
            {/*       </Field> */}
            {/*     ) */}
            {/*   }} */}
            {/* /> */}
            {/* <form.Field */}
            {/*   name="balance" */}
            {/*   children={(field) => { */}
            {/*     const isInvalid = */}
            {/*       field.state.meta.isTouched && !field.state.meta.isValid */}
            {/*     return ( */}
            {/*       <Field data-invalid={isInvalid}> */}
            {/*         <FieldLabel htmlFor={field.name}> */}
            {/*           Balance / Value */}
            {/*         </FieldLabel> */}
            {/*         <FieldDescription> </FieldDescription> */}
            {/*         <CurrencyInput */}
            {/*           id={field.name} */}
            {/*           name={field.name} */}
            {/*           placeholder="Please enter a number" */}
            {/*           onValueChange={(e) => { */}
            {/*             field.handleChange(e.floatValue!) */}
            {/*           }} */}
            {/*           value={field.state.value} */}
            {/*           locale={household.locale} */}
            {/*           currency={currencyCode} */}
            {/*           onBlur={field.handleBlur} */}
            {/*           aria-invalid={isInvalid} */}
            {/*         /> */}
            {/*         {isInvalid && ( */}
            {/*           <FieldError errors={field.state.meta.errors} /> */}
            {/*         )} */}
            {/*       </Field> */}
            {/*     ) */}
            {/*   }} */}
            {/* /> */}
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
            form="new-account-form"
          >
            {isMutationInFlight ? 'Creating...' : 'Create'}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
