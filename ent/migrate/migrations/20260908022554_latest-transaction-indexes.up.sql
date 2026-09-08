-- create index "investmentlot_investment_id" to table: "investment_lots"
CREATE INDEX "investmentlot_investment_id" ON "investment_lots" ("investment_id");
-- create index "investmentlot_transaction_id" to table: "investment_lots"
CREATE INDEX "investmentlot_transaction_id" ON "investment_lots" ("transaction_id");
-- create index "transactionentry_account_id" to table: "transaction_entries"
CREATE INDEX "transactionentry_account_id" ON "transaction_entries" ("account_id");
-- create index "transactionentry_transaction_id" to table: "transaction_entries"
CREATE INDEX "transactionentry_transaction_id" ON "transaction_entries" ("transaction_id");
