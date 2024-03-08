CREATE TYPE "fijoy_workspace_role" AS ENUM('owner', 'editor', 'viewer', 'pending');

CREATE TABLE "fijoy_workspace_user" (
  "workspace_id" text NOT NULL,
  "user_id" text NOT NULL,
  "role" fijoy_workspace_role NOT NULL,
  CONSTRAINT "fijoy_workspace_user_workspace_id_user_id_pk" PRIMARY KEY ("workspace_id", "user_id")
);
