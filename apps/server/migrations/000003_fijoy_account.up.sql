CREATE TYPE "fijoy_account_type" AS ENUM(
  'liquidity',
  'investment',
  'property',
  'receivable',
  'liability'
);

CREATE TYPE "fijoy_account_symbol_type" AS ENUM('currency', 'crypto', 'stock');

CREATE TABLE "fijoy_account" (
  -- the standard stuff
  id TEXT PRIMARY KEY NOT NULL,
  profile_id TEXT NOT NULL,
  name TEXT NOT NULL,
  account_type fijoy_account_type NOT NULL,
  -- some parameters
  archived BOOLEAN DEFAULT FALSE NOT NULL,
  include_in_net_worth BOOLEAN DEFAULT TRUE NOT NULL,
  -- symbol can be currency code, stock symbol, crypto symbol, depending on the type
  -- this is used to automatically fetch the value of the asset
  symbol TEXT NOT NULL,
  symbol_type fijoy_account_symbol_type NOT NULL,
  -- the amount of shares, or the amount of money
  amount NUMERIC(16, 8) NOT NULL,
  -- the value of the share, or the value of the money (just 1)
  value NUMERIC(16, 8) NOT NULL,
  -- fx related stuff, if the currency is not the same as the profile currency
  fx_rate NUMERIC(16, 8),
  -- balance is amount * value * fx_rate, thus is in the default currency
  -- for example, assume default currency is CAD, and 1 CAD = 0.8 USD
  -- if i have 100 USD, then
  -- amount = 100, value = 1, fx_rate = 0.8, balance = 80
  -- if i have 2 shares of APPL, each worth 100 USD, then
  -- amount = 2, value = 100, fx_rate = 0.8, balance = 160
  balance NUMERIC(16, 8) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES fijoy_profile (id) ON DELETE CASCADE
);
