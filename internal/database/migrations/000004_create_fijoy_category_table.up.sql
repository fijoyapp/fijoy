CREATE TABLE IF NOT EXISTS "fijoy_category" (
  "id" text PRIMARY KEY NOT NULL,
  "workspace_id" text NOT NULL,
  "name" text NOT NULL,
  "category_type" text NOT NULL,
  CONSTRAINT "fijoy_category_workspace_id_name_unique" UNIQUE ("workspace_id", "name")
);

CREATE INDEX IF NOT EXISTS "fijoy_category_name_index" ON "fijoy_category" ("name");
