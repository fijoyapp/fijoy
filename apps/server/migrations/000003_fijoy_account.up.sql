CREATE TYPE "fijoy_account_type" AS ENUM(
  'liquidity',
  'investment',
  'property',
  'receivable',
  'liability'
);

CREATE TABLE "fijoy_account" (
  id TEXT PRIMARY KEY NOT NULL,
  profile_id TEXT NOT NULL,
  name TEXT NOT NULL,
  symbol TEXT,
  account_type fijoy_account_type NOT NULL,
  alance NUMERIC(16, 8) NOT NULL,
  currency TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES fijoy_profile (id) ON DELETE CASCADE
);
