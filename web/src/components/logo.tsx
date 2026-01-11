import BeaverMoneyLogo from 'public/favicon.svg'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: number
  className?: string
}

export function Logo({ size = 100, className = '' }: LogoProps) {
  return (
    <img
      width={size}
      height={size}
      className={cn('bg-transparent', className)}
      src={BeaverMoneyLogo}
    />
  )
}
