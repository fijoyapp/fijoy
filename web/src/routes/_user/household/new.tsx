import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { graphql, ROOT_ID } from 'relay-runtime'
import {
  loadQuery,
  useFragment,
  useMutation,
  usePreloadedQuery,
  useSubscribeToInvalidationState,
} from 'react-relay'
import invariant from 'tiny-invariant'
import { match } from 'ts-pattern'
import { HugeiconsIcon } from '@hugeicons/react'
import { Home01Icon } from '@hugeicons/core-free-icons'

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
import { commitMutationResult } from '@/lib/relay'
import { environment } from '@/environment'
import { PendingComponent } from '@/components/pending-component'

import type { newHouseholdQuery } from './__generated__/newHouseholdQuery.graphql'
import type { newHouseholdFragment$key } from './__generated__/newHouseholdFragment.graphql'
import type { newHouseholdMutation } from './__generated__/newHouseholdMutation.graphql'

const newHouseholdQuery = graphql`
  query newHouseholdQuery {
    ...newHouseholdFragment
  }
`

const newHouseholdFragment = graphql`
  fragment newHouseholdFragment on Query {
    currencies {
      id
      code
    }
  }
`

const newHouseholdMutation = graphql`
  mutation newHouseholdMutation($input: CreateHouseholdInput!) {
    createHousehold(input: $input) {
      id
      name
    }
  }
`

export const Route = createFileRoute('/_user/household/new')({
  component: RouteComponent,
  loader: () => {
    return loadQuery<newHouseholdQuery>(
      environment,
      newHouseholdQuery,
      {},
      { fetchPolicy: 'store-or-network' },
    )
  },
  pendingComponent: PendingComponent,
})

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Household name is required.')
    .max(64, 'Household name must be at most 64 characters.'),
  currencyCode: z.string().min(1, 'Currency is required.'),
  locale: z.string().min(1, 'Locale is required.'),
})

const LOCALE_OPTIONS = [
  { value: 'en-CA', label: 'English (Canada)', flag: '🇨🇦' },
  { value: 'en-US', label: 'English (United States)', flag: '🇺🇸' },
  { value: 'en-GB', label: 'English (United Kingdom)', flag: '🇬🇧' },
  { value: 'en-AU', label: 'English (Australia)', flag: '🇦🇺' },
  { value: 'fr-CA', label: 'French (Canada)', flag: '🇨🇦' },
  { value: 'fr-FR', label: 'French (France)', flag: '🇫🇷' },
  { value: 'de-DE', label: 'German (Germany)', flag: '🇩🇪' },
  { value: 'es-ES', label: 'Spanish (Spain)', flag: '🇪🇸' },
  { value: 'es-MX', label: 'Spanish (Mexico)', flag: '🇲🇽' },
  { value: 'pt-BR', label: 'Portuguese (Brazil)', flag: '🇧🇷' },
  { value: 'ja-JP', label: 'Japanese (Japan)', flag: '🇯🇵' },
  { value: 'zh-CN', label: 'Chinese (China)', flag: '🇨🇳' },
  { value: 'zh-TW', label: 'Chinese (Taiwan)', flag: '🇹🇼' },
  { value: 'ko-KR', label: 'Korean (South Korea)', flag: '🇰🇷' },
] as const

function RouteComponent() {
  const queryRef = Route.useLoaderData()
  const data = usePreloadedQuery<newHouseholdQuery>(newHouseholdQuery, queryRef)

  useSubscribeToInvalidationState([ROOT_ID], () => {
    return loadQuery<newHouseholdQuery>(
      environment,
      newHouseholdQuery,
      {},
      { fetchPolicy: 'network-only' },
    )
  })

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <NewHouseholdForm fragmentRef={data} />
    </div>
  )
}

type NewHouseholdFormProps = {
  fragmentRef: newHouseholdFragment$key
}

function NewHouseholdForm({ fragmentRef }: NewHouseholdFormProps) {
  const data = useFragment(newHouseholdFragment, fragmentRef)
  const navigate = useNavigate()

  const [commitMutation, isMutationInFlight] =
    useMutation<newHouseholdMutation>(newHouseholdMutation)

  const form = useForm({
    defaultValues: {
      name: '',
      currencyCode: 'CAD',
      locale: 'en-CA',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const formData = formSchema.parse(value)

      const currency = data.currencies.find(
        (curr) => curr.code === formData.currencyCode,
      )
      invariant(currency, 'Currency not found')

      const result = await commitMutationResult<newHouseholdMutation>(
        commitMutation,
        {
          variables: {
            input: {
              name: formData.name,
              locale: formData.locale,
              currencyID: currency.id,
            },
          },
        },
      )

      match(result)
        .with({ status: 'success' }, ({ data: resultData }) => {
          invariant(resultData.createHousehold, 'No data returned from mutation')

          form.reset()
          navigate({
            to: '/household/$householdId',
            params: {
              householdId: resultData.createHousehold.id,
            },
          })
          toast.success(
            `Welcome to ${resultData.createHousehold.name}! Your household is ready.`,
          )
        })
        .with({ status: 'error' }, ({ error }) => {
          toast.error(error.toString())
        })
        .exhaustive()
    },
  })

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="text-center">
        <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <HugeiconsIcon
            icon={Home01Icon}
            className="text-primary h-8 w-8"
            strokeWidth={2}
          />
        </div>
        <CardTitle className="text-2xl">Create Your Household</CardTitle>
        <CardDescription>
          Set up your household to start tracking your finances together
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="new-household-form"
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
                    <FieldLabel htmlFor={field.name}>Household Name</FieldLabel>
                    <FieldDescription>
                      Give your household a memorable name
                    </FieldDescription>
                    <Input
                      data-1p-ignore
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="My Family"
                      autoComplete="off"
                      autoFocus
                    />
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
                    <FieldDescription>
                      Your household's primary currency for reporting
                    </FieldDescription>
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
                        <ComboboxEmpty>No currency found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item: string) => (
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
              name="locale"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                const selectedLocale = LOCALE_OPTIONS.find(
                  (l) => l.value === field.state.value,
                )
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Locale</FieldLabel>
                    <FieldDescription>
                      Determines date and number formatting
                    </FieldDescription>
                    <Combobox
                      items={LOCALE_OPTIONS.map((l) => l.value)}
                      value={field.state.value}
                      onValueChange={(value) => {
                        field.handleChange(value || '')
                      }}
                    >
                      <ComboboxInput
                        id={field.name}
                        name={field.name}
                        placeholder="Select a locale"
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        displayValue={() =>
                          selectedLocale
                            ? `${selectedLocale.flag} ${selectedLocale.label}`
                            : ''
                        }
                      />
                      <ComboboxContent>
                        <ComboboxEmpty>No locale found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item: string) => {
                            const locale = LOCALE_OPTIONS.find(
                              (l) => l.value === item,
                            )
                            return (
                              <ComboboxItem key={item} value={item}>
                                <span className="mr-2">{locale?.flag}</span>
                                {locale?.label}
                              </ComboboxItem>
                            )
                          }}
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
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Button
          disabled={isMutationInFlight}
          type="submit"
          form="new-household-form"
          className="w-full"
          size="lg"
        >
          {isMutationInFlight ? 'Creating...' : 'Create Household'}
        </Button>
      </CardFooter>
    </Card>
  )
}
