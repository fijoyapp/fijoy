CREATE TABLE IF NOT EXISTS "fijoy_tag" (
  "id" text PRIMARY KEY NOT NULL,
  "workspace_id" text NOT NULL,
  "name" text NOT NULL,
  CONSTRAINT "fijoy_tag_workspace_id_name_unique" UNIQUE ("workspace_id", "name")
);

CREATE INDEX IF NOT EXISTS "fijoy_tag_name_index" ON "fijoy_tag" ("name");
