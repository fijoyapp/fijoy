-- modify "lots" table
ALTER TABLE "lots" ADD COLUMN "transaction_lots" bigint NOT NULL, ADD CONSTRAINT "lots_transactions_lots" FOREIGN KEY ("transaction_lots") REFERENCES "transactions" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;
