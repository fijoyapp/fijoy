-- reverse: modify "transactions" table
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_users_transactions", DROP CONSTRAINT "transactions_households_transactions", DROP COLUMN "user_transactions", ALTER COLUMN "household_transactions" DROP NOT NULL, ADD CONSTRAINT "transactions_households_transactions" FOREIGN KEY ("household_transactions") REFERENCES "households" ("id") ON UPDATE NO ACTION ON DELETE SET NULL;
-- reverse: modify "accounts" table
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_users_accounts", DROP COLUMN "user_accounts", ALTER COLUMN "balance" SET DEFAULT 0;
-- reverse: modify "users" table
ALTER TABLE "users" DROP COLUMN "name";
