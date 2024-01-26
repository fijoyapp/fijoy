CREATE TABLE IF NOT EXISTS "fijoy_payee" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "workspace_id" text NOT NULL,
  CONSTRAINT "fijoy_payee_workspace_id_name_unique" UNIQUE ("workspace_id", "name")
);
