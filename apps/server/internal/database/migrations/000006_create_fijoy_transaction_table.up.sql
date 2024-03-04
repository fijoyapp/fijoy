CREATE TABLE "fijoy_transaction" (
  "id" text PRIMARY KEY NOT NULL,
  "transaction_type" fijoy_transaction_type NOT NULL,
  "amount" numeric(16, 8) NOT NULL,
  "currency" text NOT NULL,
  "account_id" text,
  "user_id" text NOT NULL,
  "workspace_id" text NOT NULL,
  "datetime" timestamptz NOT NULL,
  "note" text,
  "category_id" text,
  "entity" text
);

CREATE INDEX "fijoy_transaction_account_id_index" ON "fijoy_transaction" ("account_id");

CREATE INDEX "fijoy_transaction_transaction_type_index" ON "fijoy_transaction" ("transaction_type");

CREATE INDEX "fijoy_transaction_entity_index" ON "fijoy_transaction" ("entity");
