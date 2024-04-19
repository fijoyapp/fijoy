CREATE TABLE "fijoy_tag" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "workspace_id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  CONSTRAINT "fijoy_tag_workspace_id_name_unique" UNIQUE ("workspace_id", "name"),
  CONSTRAINT "fijoy_tag_workspace_id_fijoy_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "fijoy_workspace" ("id") ON DELETE cascade ON UPDATE no action
);

CREATE INDEX "fijoy_tag_name_index" ON "fijoy_tag" ("name");
