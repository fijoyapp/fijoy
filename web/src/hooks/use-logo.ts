import { env } from '@/env'
import { useTheme } from '@/components/theme-provider'
import { useMemo } from 'react'

const LOGO_DEV_BASE_URL = 'https://img.logo.dev'

function getResolvedTheme(
  theme: 'dark' | 'light' | 'system',
): 'dark' | 'light' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  return theme
}

export function useLogo() {
  const { theme } = useTheme()

  return useMemo(() => {
    const resolvedTheme = getResolvedTheme(theme)

    return {
      getLogoDomainURL: (domain: string): string => {
        return `${LOGO_DEV_BASE_URL}/${domain}?token=${env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&theme=${resolvedTheme}&format=webp&retina=true`
      },

      getLogoTickerURL: (ticker: string): string => {
        return `${LOGO_DEV_BASE_URL}/ticker/${ticker}?token=${env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&theme=${resolvedTheme}&format=webp&retina=true`
      },

      getLogoCryptoURL: (symbol: string): string => {
        return `${LOGO_DEV_BASE_URL}/crypto/${symbol}?token=${env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&theme=${resolvedTheme}&format=webp&retina=true`
      },
    }
  }, [theme])
}
