-- create index "transactioncategory_name_household_id" to table: "transaction_categories"
CREATE UNIQUE INDEX "transactioncategory_name_household_id" ON "transaction_categories" ("name", "household_id");
