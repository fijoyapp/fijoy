-- modify "accounts" table
ALTER TABLE "accounts" ADD COLUMN "fx_rate" numeric(36,18) NOT NULL;
-- modify "investments" table
ALTER TABLE "investments" ADD COLUMN "quote" numeric(36,18) NOT NULL;
