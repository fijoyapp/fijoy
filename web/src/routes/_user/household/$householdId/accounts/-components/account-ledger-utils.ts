export const ACCOUNT_TYPE_ACCENT_CLASSES: Record<string, string> = {
  liquidity: 'bg-chart-liquidity',
  investment: 'bg-chart-investment',
  property: 'bg-chart-property',
  receivable: 'bg-chart-receivable',
  liability: 'bg-chart-liability',
  asset: 'bg-chart-asset',
}

export function formatPercentageWithPrivacyMode(
  value: number,
  locale: string,
  isPrivacyModeEnabled: boolean,
) {
  if (isPrivacyModeEnabled) return '•••'
  if (!Number.isFinite(value) || value <= 0) return '0%'
  if (value < 0.01) return '<0.01%'

  return Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: value < 1 ? 2 : 1,
  }).format(value / 100)
}

export function calculateAllocationPercentage(value: number, total: number) {
  if (!Number.isFinite(value) || !Number.isFinite(total) || total === 0)
    return 0
  return (Math.abs(value) / Math.abs(total)) * 100
}
