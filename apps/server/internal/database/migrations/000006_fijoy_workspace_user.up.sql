CREATE TYPE "fijoy_workspace_role" AS ENUM('owner', 'editor', 'viewer', 'pending');

CREATE TABLE "fijoy_workspace_user" (
  "workspace_id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "role" fijoy_workspace_role NOT NULL,
  CONSTRAINT "fijoy_workspace_user_workspace_id_user_id_pk" PRIMARY KEY ("workspace_id", "user_id"),
  CONSTRAINT "fijoy_workspace_user_workspace_id_fijoy_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "fijoy_workspace" ("id") ON DELETE cascade ON UPDATE no action,
  CONSTRAINT "fijoy_workspace_user_user_id_fijoy_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "fijoy_user" ("id") ON DELETE cascade ON UPDATE no action
);
