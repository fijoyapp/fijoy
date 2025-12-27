-- reverse: create index "userhousehold_user_id_household_id" to table: "user_households"
DROP INDEX "userhousehold_user_id_household_id";
-- reverse: create "user_households" table
DROP TABLE "user_households";
-- reverse: create "users" table
DROP TABLE "users";
-- reverse: create "transaction_entries" table
DROP TABLE "transaction_entries";
-- reverse: create index "transaction_datetime" to table: "transactions"
DROP INDEX "transaction_datetime";
-- reverse: create "transactions" table
DROP TABLE "transactions";
-- reverse: create "lots" table
DROP TABLE "lots";
-- reverse: create "investments" table
DROP TABLE "investments";
-- reverse: create "accounts" table
DROP TABLE "accounts";
-- reverse: create "households" table
DROP TABLE "households";
-- reverse: create index "currencies_code_key" to table: "currencies"
DROP INDEX "currencies_code_key";
-- reverse: create "currencies" table
DROP TABLE "currencies";
