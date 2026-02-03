import { env } from '@/env'

const LOGO_DEV_BASE_URL = 'https://img.logo.dev'

export function getLogoDomainURL(domain: string): string {
  return `${LOGO_DEV_BASE_URL}/${domain}?token=${env.VITE_LOGO_DEV_PUBLISHABLE_KEY}`
}

export function getLogoTickerURL(ticker: string): string {
  return `${LOGO_DEV_BASE_URL}/ticker/${ticker}?token=${env.VITE_LOGO_DEV_PUBLISHABLE_KEY}`
}

export function getLogoCryptoURL(symbol: string): string {
  return `${LOGO_DEV_BASE_URL}/crypto/${symbol}?token=${env.VITE_LOGO_DEV_PUBLISHABLE_KEY}`
}
