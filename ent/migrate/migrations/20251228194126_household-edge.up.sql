-- modify "accounts" table
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_households_accounts", DROP COLUMN "household_accounts", ADD COLUMN "household_id" bigint NOT NULL, ADD CONSTRAINT "accounts_households_accounts" FOREIGN KEY ("household_id") REFERENCES "households" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;
-- modify "investments" table
ALTER TABLE "investments" DROP CONSTRAINT "investments_households_investments", DROP COLUMN "household_investments", ADD COLUMN "household_id" bigint NOT NULL, ADD CONSTRAINT "investments_households_investments" FOREIGN KEY ("household_id") REFERENCES "households" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;
-- modify "lots" table
ALTER TABLE "lots" ADD COLUMN "household_id" bigint NOT NULL, ADD CONSTRAINT "lots_households_lots" FOREIGN KEY ("household_id") REFERENCES "households" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;
-- modify "transaction_categories" table
ALTER TABLE "transaction_categories" ADD COLUMN "household_id" bigint NOT NULL, ADD CONSTRAINT "transaction_categories_households_transaction_categories" FOREIGN KEY ("household_id") REFERENCES "households" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;
-- modify "transaction_entries" table
ALTER TABLE "transaction_entries" ADD COLUMN "household_id" bigint NOT NULL, ADD CONSTRAINT "transaction_entries_households_transaction_entries" FOREIGN KEY ("household_id") REFERENCES "households" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;
-- modify "transactions" table
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_households_transactions", DROP COLUMN "household_transactions", ADD COLUMN "household_id" bigint NOT NULL, ADD CONSTRAINT "transactions_households_transactions" FOREIGN KEY ("household_id") REFERENCES "households" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;
