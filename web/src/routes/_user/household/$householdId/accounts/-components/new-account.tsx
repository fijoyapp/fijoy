import { graphql } from 'relay-runtime'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { useFragment } from 'react-relay'
import { capitalize } from 'lodash-es'
import type { newAccountFragment$key } from './__generated__/newAccountFragment.graphql'

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
import { ACCOUNT_TYPE_DESCRIPTION, ACCOUNT_TYPE_LIST } from '@/constant'
import { CurrencyInput, CurrencyInputV2 } from '@/components/currency-input'
import { useHousehold } from '@/hooks/use-household'
import invariant from 'tiny-invariant'

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Account name must be at least 1 character.')
    .max(32, 'Account name must be at most 32 characters.'),
  currencyCode: z.string(),
  type: z.literal([
    'liquidity',
    'investment',
    'property',
    'receivable',
    'liability',
  ]),
  balance: z.number(),
})

const newAccountFragment = graphql`
  fragment newAccountFragment on Query {
    currencies {
      id
      code
    }
    households {
      id
      currency {
        id
        code
      }
    }
  }
`

type NewAccountProps = {
  fragmentRef: newAccountFragment$key
}

export function NewAccount({ fragmentRef }: NewAccountProps) {
  const data = useFragment(newAccountFragment, fragmentRef)

  const { household } = useHousehold()

  const form = useForm({
    defaultValues: {
      name: '',
      type: '',
      currencyCode: household.currency.code,
      balance: 0,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      toast('You submitted the following values:', {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: 'bottom-right',
      })
    },
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>New Account</CardTitle>
        <CardDescription>Start tracking your account in Fijoy</CardDescription>
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
                      items={ACCOUNT_TYPE_LIST}
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value || '')}
                    >
                      <ComboboxInput
                        value={capitalize(field.state.value)}
                        id={field.name}
                        name={field.name}
                        placeholder="Select a type"
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                      />
                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList className="">
                          {(item) => (
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
            <form.Field
              name="currencyCode"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Currency</FieldLabel>
                    <Combobox
                      items={data.currencies.map((c) => c.code)}
                      value={field.state.value}
                      onValueChange={(value) => {
                        field.handleChange(value || '')
                      }}
                    >
                      <ComboboxInput
                        id={field.name}
                        name={field.name}
                        placeholder="Select a currency"
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                      />
                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
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
              name="balance"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Balance / Value
                    </FieldLabel>
                    <FieldDescription> </FieldDescription>
                    <form.Subscribe
                      selector={(state) => state.values.currencyCode}
                      children={(currencyCode) => {
                        return (
                          <CurrencyInput
                            key={currencyCode}
                            id={field.name}
                            name={field.name}
                            placeholder="Please enter a number"
                            onChange={(_, value) => {
                              field.handleChange(value)
                            }}
                            value={field.state.value}
                            currency={currencyCode}
                            onBlur={field.handleBlur}
                            locale={household.locale}
                            aria-invalid={isInvalid}
                          />
                        )
                      }}
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
          <Button type="submit" form="bug-report-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
