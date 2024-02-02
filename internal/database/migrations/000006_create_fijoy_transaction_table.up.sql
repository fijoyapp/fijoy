CREATE TABLE IF NOT EXISTS "fijoy_transaction" (
  "id" text PRIMARY KEY NOT NULL,
  "transaction_type" text NOT NULL,
  "amount" double precision NOT NULL,
  "currency" text NOT NULL,
  "account_id" text NOT NULL,
  "user_id" text NOT NULL,
  "workspace_id" text NOT NULL,
  "datetime" timestamp NOT NULL,
  "note" text,
  "category_id" text,
  "payee_id" text
);

CREATE INDEX IF NOT EXISTS "fijoy_transaction_account_id_index" ON "fijoy_transaction" ("account_id");

CREATE INDEX IF NOT EXISTS "fijoy_transaction_transaction_type_index" ON "fijoy_transaction" ("transaction_type");
