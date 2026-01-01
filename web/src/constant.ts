export const LOCAL_STORAGE_HOUSEHOLD_ID_KEY = 'householdId'
export const LOCAL_STORAGE_TOKEN_KEY = 'token'
export const LOCAL_STORAGE_PRIVACY_MODE_KEY = 'privacyMode'
export const LOCAL_STORAGE_THEME = 'theme'

export const ACCOUNT_TYPE_LIST = [
  'liquidity',
  'investment',
  'property',
  'receivable',
  'liability',
] as const

export const INVESTMENT_TYPE_LIST = ['stock', 'crypto'] as const

export const ACCOUNT_TYPE_DESCRIPTION: Record<string, string> = {
  liquidity: 'Cash or cash-equivalent accounts, such as checking or savings',
  investment: 'Accounts that hold investments, such as brokerage accounts',
  property: 'Real estate or other valuable property',
  receivable: 'Money owed to you, such as invoices or loans you have given',
  liability:
    'Debts or obligations you owe to others, such as credit cards or loans',
}
