CREATE TABLE IF NOT EXISTS "fijoy_account" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "account_type" text NOT NULL,
  "institution" text NOT NULL,
  "workspace_id" text NOT NULL,
  "balance" double precision NOT NULL,
  "currency" text NOT NULL,
  "updated_at" timestamp DEFAULT now () NOT NULL,
  CONSTRAINT "fijoy_account_workspace_id_name_unique" UNIQUE ("workspace_id", "name")
);
