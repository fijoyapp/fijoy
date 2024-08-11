CREATE TYPE fijoy_transaction_type AS ENUM('expense', 'transfer', 'adjustment');

CREATE TABLE "fijoy_transaction" (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL,
  account_id TEXT NOT NULL,
  transaction_type fijoy_transaction_type NOT NULL,
  amount NUMERIC(16, 8) NOT NULL,
  currency TEXT NOT NULL,
  datetime TIMESTAMPTZ NOT NULL,
  note TEXT,
  FOREIGN KEY (account_id) REFERENCES fijoy_account (id) ON DELETE CASCADE,
  FOREIGN KEY (profile_id) REFERENCES fijoy_profile (id) ON DELETE CASCADE
);

CREATE INDEX ON fijoy_transaction (account_id);

CREATE INDEX ON fijoy_transaction (transaction_type);
