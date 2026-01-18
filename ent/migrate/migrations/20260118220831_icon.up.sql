-- modify "accounts" table
ALTER TABLE "accounts" DROP COLUMN "icon_path", ADD COLUMN "icon" character varying NULL;
-- modify "transaction_categories" table
ALTER TABLE "transaction_categories" ADD COLUMN "icon" character varying NOT NULL;
