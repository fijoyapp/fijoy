import {
  ArrowLeftRightIcon,
  BanknoteArrowDownIcon,
  BanknoteArrowUpIcon,
  TrendingUpIcon,
  WrenchIcon,
} from 'lucide-react'
import { dynamicIconImports, type IconName } from 'lucide-react/dynamic'
import { CategoryGlyph } from '@/components/category-glyph'
import { cn } from '@/lib/utils'

export function CategoryIcon({
  type,
  icon,
  size = 'default',
}: {
  type: string
  icon?: string | null
  size?: 'inline' | 'sm' | 'default'
}) {
  const TypeIcon =
    type === 'income'
      ? BanknoteArrowUpIcon
      : type === 'expense'
        ? BanknoteArrowDownIcon
        : type === 'investment'
          ? TrendingUpIcon
          : type === 'setup'
            ? WrenchIcon
            : ArrowLeftRightIcon
  const fallback = <TypeIcon className="size-4" />

  return (
    <span
      className={cn(
        'text-muted-foreground flex shrink-0 items-center justify-center rounded-full',
        size !== 'inline' && 'bg-muted',
        size === 'inline' && 'size-4',
        size === 'sm' && 'size-6',
        size === 'default' && 'size-8',
        type === 'expense' && 'text-destructive',
        type === 'investment' && 'text-chart-investment',
        type === 'income' && 'text-chart-net-worth',
      )}
      aria-hidden="true"
    >
      {icon && Object.hasOwn(dynamicIconImports, icon) ? (
        <CategoryGlyph
          name={icon as IconName}
          fallback={fallback}
          className="size-4"
        />
      ) : (
        fallback
      )}
    </span>
  )
}
