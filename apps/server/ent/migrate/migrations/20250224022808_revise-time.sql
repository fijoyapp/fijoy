-- Modify "profiles" table
ALTER TABLE "profiles" ADD COLUMN "updated_at" timestamptz NOT NULL;
-- Modify "transactions" table
ALTER TABLE "transactions" ADD COLUMN "datetime" timestamptz NOT NULL;
-- Modify "users" table
ALTER TABLE "users" ADD COLUMN "updated_at" timestamptz NOT NULL;
