-- reverse: modify "lots" table
ALTER TABLE "lots" DROP CONSTRAINT "lots_transactions_lots", DROP COLUMN "transaction_lots";
