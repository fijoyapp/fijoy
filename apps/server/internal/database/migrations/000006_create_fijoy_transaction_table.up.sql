CREATE TABLE "fijoy_transaction" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "account_id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "workspace_id" TEXT NOT NULL,
  "transaction_type" fijoy_transaction_type NOT NULL,
  "amount" numeric(16, 8) NOT NULL,
  "currency" TEXT NOT NULL,
  "datetime" timestamptz NOT NULL,
  "category_id" TEXT,
  "entity" TEXT,
  "note" TEXT
);

CREATE INDEX "fijoy_transaction_account_id_index" ON "fijoy_transaction" ("account_id");

CREATE INDEX "fijoy_transaction_transaction_type_index" ON "fijoy_transaction" ("transaction_type");

CREATE INDEX "fijoy_transaction_entity_index" ON "fijoy_transaction" ("entity");
