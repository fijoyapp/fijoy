import type { LucideIcon } from 'lucide-react'
import {
  ChartNoAxesCombinedIcon,
  CheckIcon,
  CreditCardIcon,
  HandCoinsIcon,
  LandmarkIcon,
} from 'lucide-react'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ACCOUNT_TYPE_DESCRIPTION, ACCOUNT_TYPE_LIST } from '@/constant'

export type AccountType = (typeof ACCOUNT_TYPE_LIST)[number]

const ACCOUNT_TYPE_PRESENTATION = {
  liquidity: {
    label: 'Liquidity',
    icon: LandmarkIcon,
    iconClassName: 'text-chart-liquidity',
  },
  investment: {
    label: 'Investment',
    icon: ChartNoAxesCombinedIcon,
    iconClassName: 'text-chart-investment',
  },
  receivable: {
    label: 'Receivable',
    icon: HandCoinsIcon,
    iconClassName: 'text-chart-receivable',
  },
  liability: {
    label: 'Liability',
    icon: CreditCardIcon,
    iconClassName: 'text-chart-liability',
  },
} satisfies Record<
  AccountType,
  { label: string; icon: LucideIcon; iconClassName: string }
>

type AccountTypePickerProps = {
  value: string
  onValueChange: (value: AccountType) => void
  onBlur: () => void
  labelledBy: string
  describedBy?: string
  invalid?: boolean
}

function isAccountType(value: string | undefined): value is AccountType {
  return ACCOUNT_TYPE_LIST.some((type) => type === value)
}

export function AccountTypePicker({
  value,
  onValueChange,
  onBlur,
  labelledBy,
  describedBy,
  invalid = false,
}: AccountTypePickerProps) {
  const selectedValue = isAccountType(value) ? [value] : []

  return (
    <ToggleGroup
      value={selectedValue}
      onValueChange={(values) => {
        const nextValue = values[0]
        if (isAccountType(nextValue)) {
          onValueChange(nextValue)
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          onBlur()
        }
      }}
      variant="outline"
      spacing={2}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      aria-invalid={invalid}
      className="grid w-full grid-cols-1 items-stretch sm:grid-cols-2"
    >
      {ACCOUNT_TYPE_LIST.map((type) => {
        const {
          label,
          icon: Icon,
          iconClassName,
        } = ACCOUNT_TYPE_PRESENTATION[type]

        return (
          <ToggleGroupItem
            key={type}
            value={type}
            aria-invalid={invalid}
            className="aria-pressed:bg-muted aria-pressed:hover:bg-muted aria-pressed:outline-foreground/40 h-full min-h-16 w-full justify-start gap-2.5 px-3 py-2 text-left whitespace-normal aria-pressed:outline-1 aria-pressed:-outline-offset-1 aria-pressed:outline-solid"
          >
            <span
              aria-hidden="true"
              className="bg-muted ring-foreground/10 grid size-8 shrink-0 place-items-center rounded-lg ring-1"
            >
              <Icon className={iconClassName} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs/relaxed font-semibold">
                {label}
              </span>
              <span className="text-muted-foreground block text-xs/normal font-normal">
                {ACCOUNT_TYPE_DESCRIPTION[type]}
              </span>
            </span>
            <CheckIcon
              aria-hidden="true"
              className="text-foreground shrink-0 opacity-0 group-aria-pressed/toggle:opacity-100"
            />
          </ToggleGroupItem>
        )
      })}
    </ToggleGroup>
  )
}
