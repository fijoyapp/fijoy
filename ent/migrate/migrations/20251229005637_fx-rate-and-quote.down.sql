-- reverse: modify "investments" table
ALTER TABLE "investments" DROP COLUMN "quote";
-- reverse: modify "accounts" table
ALTER TABLE "accounts" DROP COLUMN "fx_rate";
