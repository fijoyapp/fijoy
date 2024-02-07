CREATE TABLE "fijoy_workspace_user" (
  "workspace_id" text NOT NULL,
  "user_id" text NOT NULL,
  "role" text NOT NULL,
  CONSTRAINT "fijoy_workspace_user_workspace_id_user_id_pk" PRIMARY KEY ("workspace_id", "user_id")
);
