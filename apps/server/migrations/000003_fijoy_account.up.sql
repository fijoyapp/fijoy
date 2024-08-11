CREATE TYPE "fijoy_account_type" AS ENUM(
  'liquidity',
  'investment',
  'property',
  'receivable',
  'liability'
);

CREATE TABLE "fijoy_account" (
  -- the standard stuff
  id TEXT PRIMARY KEY NOT NULL,
  profile_id TEXT NOT NULL,
  name TEXT NOT NULL,
  account_type fijoy_account_type NOT NULL,
  active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  -- stock and cryoto
  symbol TEXT, -- for stock and crypto accounts
  amount NUMERIC(16, 8), -- for stock and crypto accounts
  -- fx related stuff
  currency TEXT NOT NULL, -- the underlying currency
  value NUMERIC(16, 8) NOT NULL, -- in ORIGINAL currency
  exchange_rate NUMERIC(16, 8), -- for foreign currency accounts
  FOREIGN KEY (profile_id) REFERENCES fijoy_profile (id) ON DELETE CASCADE
);
