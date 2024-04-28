CREATE TYPE "fijoy_account_type" AS ENUM('cash', 'debt', 'investment', 'other_asset');

CREATE TABLE "fijoy_account" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "workspace_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "account_type" fijoy_account_type NOT NULL,
  "balance" NUMERIC(16, 8) NOT NULL,
  "currency" TEXT NOT NULL,
  "institution" TEXT NOT NULL,
  "active" BOOLEAN DEFAULT TRUE NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT now() NOT NULL,
  "updated_at" TIMESTAMPTZ DEFAULT now() NOT NULL,
  CONSTRAINT "fijoy_account_workspace_id_name_unique" UNIQUE ("workspace_id", "name"),
  CONSTRAINT "fijoy_account_workspace_id_fijoy_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "fijoy_workspace" ("id") ON DELETE cascade ON UPDATE no action
);
