-- Modify "accounts" table
ALTER TABLE "accounts" ALTER COLUMN "amount" TYPE numeric(36,18), ALTER COLUMN "balance" TYPE numeric(36,18);
-- Modify "profiles" table
ALTER TABLE "profiles" ALTER COLUMN "net_worth_goal" TYPE numeric(36,18);
-- Modify "transactions" table
ALTER TABLE "transactions" ALTER COLUMN "amount" TYPE numeric(36,18), DROP COLUMN "amount_delta", DROP COLUMN "value", DROP COLUMN "fx_rate", DROP COLUMN "balance", DROP COLUMN "balance_delta";
-- Drop "account_snapshots" table
DROP TABLE "account_snapshots";
-- Drop "overall_snapshots" table
DROP TABLE "overall_snapshots";
