-- reverse: modify "transactions" table
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_transaction_categories_transactions", DROP COLUMN "transaction_category_transactions";
-- reverse: create "transaction_categories" table
DROP TABLE "transaction_categories";
