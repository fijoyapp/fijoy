CREATE TYPE "fijoy_group_type" AS ENUM ('cash', 'debt', 'investment', 'other_asset');

CREATE TYPE "fijoy_account_type" AS ENUM (
  'chequing',
  'savings',
  'credit',
  'mortgage',
  'gic',
  'tfsa',
  'rrsp',
  'fhsa',
  'cash'
);

CREATE TABLE "fijoy_account" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "account_type" fijoy_account_type NOT NULL,
  "group_type" fijoy_group_type NOT NULL,
  "institution" text NOT NULL,
  "workspace_id" text NOT NULL,
  "currency" text NOT NULL,
  "updated_at" timestamptz DEFAULT now () NOT NULL,
  CONSTRAINT "fijoy_account_workspace_id_name_unique" UNIQUE ("workspace_id", "name")
);
