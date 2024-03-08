CREATE TABLE fijoy_workspace (
  id TEXT PRIMARY KEY,
  namespace TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now (),
  primary_currency TEXT NOT NULL,
  supported_currencies TEXT[] NOT NULL,
  locale TEXT NOT NULL,
  CONSTRAINT "fijoy_workspace_namespace_unique" UNIQUE ("namespace")
);

CREATE INDEX "fijoy_workspace_namespace_index" ON "fijoy_workspace" ("namespace");
