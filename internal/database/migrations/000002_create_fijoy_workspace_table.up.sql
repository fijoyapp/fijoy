CREATE TABLE fijoy_workspace (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  namespace TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now (),
  CONSTRAINT "fijoy_workspace_namespace_unique" UNIQUE ("namespace")
);

CREATE INDEX "fijoy_workspace_namespace_index" ON "fijoy_workspace" ("namespace");
