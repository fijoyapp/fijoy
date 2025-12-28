-- reverse: modify "transactions" table
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_households_transactions", DROP COLUMN "household_id", ADD COLUMN "household_transactions" bigint NOT NULL, ADD CONSTRAINT "transactions_households_transactions" FOREIGN KEY ("household_transactions") REFERENCES "households" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;
-- reverse: modify "transaction_entries" table
ALTER TABLE "transaction_entries" DROP CONSTRAINT "transaction_entries_households_transaction_entries", DROP COLUMN "household_id";
-- reverse: modify "transaction_categories" table
ALTER TABLE "transaction_categories" DROP CONSTRAINT "transaction_categories_households_transaction_categories", DROP COLUMN "household_id";
-- reverse: modify "lots" table
ALTER TABLE "lots" DROP CONSTRAINT "lots_households_lots", DROP COLUMN "household_id";
-- reverse: modify "investments" table
ALTER TABLE "investments" DROP CONSTRAINT "investments_households_investments", DROP COLUMN "household_id", ADD COLUMN "household_investments" bigint NOT NULL, ADD CONSTRAINT "investments_households_investments" FOREIGN KEY ("household_investments") REFERENCES "households" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;
-- reverse: modify "accounts" table
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_households_accounts", DROP COLUMN "household_id", ADD COLUMN "household_accounts" bigint NOT NULL, ADD CONSTRAINT "accounts_households_accounts" FOREIGN KEY ("household_accounts") REFERENCES "households" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;
