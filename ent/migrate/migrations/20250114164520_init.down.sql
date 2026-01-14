-- reverse: create index "userkey_provider_key" to table: "user_keys"
DROP INDEX "userkey_provider_key";
-- reverse: create "user_keys" table
DROP TABLE "user_keys";
-- reverse: create index "userhousehold_user_id_household_id" to table: "user_households"
DROP INDEX "userhousehold_user_id_household_id";
-- reverse: create "user_households" table
DROP TABLE "user_households";
-- reverse: create "transaction_entries" table
DROP TABLE "transaction_entries";
-- reverse: create "investment_lots" table
DROP TABLE "investment_lots";
-- reverse: create index "transaction_datetime" to table: "transactions"
DROP INDEX "transaction_datetime";
-- reverse: create "transactions" table
DROP TABLE "transactions";
-- reverse: create index "transactioncategory_name_household_id" to table: "transaction_categories"
DROP INDEX "transactioncategory_name_household_id";
-- reverse: create "transaction_categories" table
DROP TABLE "transaction_categories";
-- reverse: create "investments" table
DROP TABLE "investments";
-- reverse: create "accounts" table
DROP TABLE "accounts";
-- reverse: create index "users_email_key" to table: "users"
DROP INDEX "users_email_key";
-- reverse: create "users" table
DROP TABLE "users";
-- reverse: create "households" table
DROP TABLE "households";
-- reverse: create index "currencies_code_key" to table: "currencies"
DROP INDEX "currencies_code_key";
-- reverse: create "currencies" table
DROP TABLE "currencies";
