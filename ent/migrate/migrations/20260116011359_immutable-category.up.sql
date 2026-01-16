-- modify "transaction_categories" table
ALTER TABLE "transaction_categories" ADD COLUMN "is_immutable" boolean NOT NULL DEFAULT false;
