CREATE TABLE "fijoy_currency" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "code" TEXT NOT NULL
);

CREATE TABLE "fijoy_workspace_currency" (
  "workspace_id" TEXT NOT NULL,
  "currency_id" TEXT NOT NULL,
  CONSTRAINT "fijoy_workspace_currency_workspace_id_currency_id_pk" PRIMARY KEY ("workspace_id", "currency_id")
)
