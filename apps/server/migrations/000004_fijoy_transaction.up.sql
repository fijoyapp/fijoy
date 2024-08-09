CREATE TYPE fijoy_transaction_type AS ENUM('expense', 'transfer', 'adjustment');

CREATE TABLE "fijoy_transaction" (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  workspace_id TEXT NOT NULL,
  transaction_type fijoy_transaction_type NOT NULL,
  amount NUMERIC(16, 8) NOT NULL,
  currency TEXT NOT NULL,
  datetime TIMESTAMPTZ NOT NULL,
  note TEXT,
  FOREIGN KEY (account_id) REFERENCES fijoy_account (id) ON DELETE CASCADE,
  FOREIGN KEY (workspace_id, user_id) REFERENCES fijoy_workspace_user (workspace_id, user_id) ON DELETE CASCADE
);

CREATE INDEX ON fijoy_transaction (account_id);

CREATE INDEX ON fijoy_transaction (transaction_type);
