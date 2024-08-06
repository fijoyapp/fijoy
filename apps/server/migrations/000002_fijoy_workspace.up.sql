CREATE TABLE fijoy_workspace (
  id TEXT PRIMARY KEY,
  namespace TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  primary_currency TEXT NOT NULL,
  supported_currencies TEXT NOT NULL,
  locale TEXT NOT NULL
);

CREATE TYPE "fijoy_workspace_role" AS ENUM('owner', 'editor', 'viewer', 'pending');

CREATE TABLE "fijoy_workspace_user" (
  workspace_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  role fijoy_workspace_role NOT NULL,
  FOREIGN KEY (workspace_id) REFERENCES fijoy_workspace (id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES fijoy_user (id) ON DELETE CASCADE,
  PRIMARY KEY (workspace_id, user_id)
);
