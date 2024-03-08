CREATE TYPE fijoy_transaction_type AS ENUM('expense', 'income', 'transfer', 'adjustment');

CREATE TABLE "fijoy_category" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "workspace_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "category_type" fijoy_transaction_type NOT NULL,
  CONSTRAINT "fijoy_category_workspace_id_name_unique" UNIQUE ("workspace_id", "name")
);

CREATE INDEX "fijoy_category_name_index" ON "fijoy_category" ("name");
