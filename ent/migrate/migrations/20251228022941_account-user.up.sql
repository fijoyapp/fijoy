-- modify "users" table
ALTER TABLE "users" ADD COLUMN "name" character varying NOT NULL;
-- modify "accounts" table
ALTER TABLE "accounts" ALTER COLUMN "balance" DROP DEFAULT, ADD COLUMN "user_accounts" bigint NOT NULL, ADD CONSTRAINT "accounts_users_accounts" FOREIGN KEY ("user_accounts") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;
-- modify "transactions" table
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_households_transactions", ALTER COLUMN "household_transactions" SET NOT NULL, ADD COLUMN "user_transactions" bigint NOT NULL, ADD CONSTRAINT "transactions_households_transactions" FOREIGN KEY ("household_transactions") REFERENCES "households" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION, ADD CONSTRAINT "transactions_users_transactions" FOREIGN KEY ("user_transactions") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;
