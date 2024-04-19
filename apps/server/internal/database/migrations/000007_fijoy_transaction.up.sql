CREATE TABLE "fijoy_transaction" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "account_id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "workspace_id" TEXT NOT NULL,
  "transaction_type" fijoy_transaction_type NOT NULL,
  "amount" NUMERIC(16, 8) NOT NULL,
  "currency" TEXT NOT NULL,
  "datetime" TIMESTAMPTZ NOT NULL,
  "category_id" TEXT,
  "entity" TEXT,
  "note" TEXT,
  CONSTRAINT "fijoy_transaction_account_id_fijoy_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "fijoy_account" ("id") ON DELETE restrict ON UPDATE no action,
  CONSTRAINT "fijoy_transaction_category_id_fijoy_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "fijoy_category" ("id") ON DELETE SET NULL ON UPDATE no action,
  CONSTRAINT "workspace_user_reference" FOREIGN KEY ("workspace_id", "user_id") REFERENCES "fijoy_workspace_user" ("workspace_id", "user_id") ON DELETE cascade ON UPDATE no action
);

CREATE INDEX "fijoy_transaction_account_id_index" ON "fijoy_transaction" ("account_id");

CREATE INDEX "fijoy_transaction_transaction_type_index" ON "fijoy_transaction" ("transaction_type");

CREATE INDEX "fijoy_transaction_entity_index" ON "fijoy_transaction" ("entity");
