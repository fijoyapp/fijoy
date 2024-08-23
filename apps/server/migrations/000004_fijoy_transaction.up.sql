CREATE TABLE "fijoy_transaction" (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL,
  account_id TEXT NOT NULL,
  -- updatable fields of any account
  amount NUMERIC(16, 8),
  amount_delta NUMERIC(16, 8),
  value NUMERIC(16, 8),
  fx_rate NUMERIC(16, 8),
  balance NUMERIC(16, 8),
  balance_delta NUMERIC(16, 8),
  -- more details
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  FOREIGN KEY (account_id) REFERENCES fijoy_account (id) ON DELETE CASCADE,
  FOREIGN KEY (profile_id) REFERENCES fijoy_profile (id) ON DELETE CASCADE
);

CREATE INDEX ON fijoy_transaction (account_id);
