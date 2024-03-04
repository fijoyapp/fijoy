CREATE TYPE "fijoy_account_type" AS ENUM ('cash', 'debt', 'investment', 'other_asset');

CREATE TABLE "fijoy_account" (
  "id" text PRIMARY KEY NOT NULL,
  "workspace_id" text NOT NULL,
  "name" text NOT NULL,
  "account_type" fijoy_account_type NOT NULL,
  "balance" numeric(16, 8) NOT NULL,
  "currency" text NOT NULL,
  "institution" text NOT NULL,
  "created_at" timestamptz DEFAULT now () NOT NULL,
  "updated_at" timestamptz DEFAULT now () NOT NULL,
  CONSTRAINT "fijoy_account_workspace_id_name_unique" UNIQUE ("workspace_id", "name")
);
