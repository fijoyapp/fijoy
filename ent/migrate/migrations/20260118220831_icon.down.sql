-- reverse: modify "transaction_categories" table
ALTER TABLE "transaction_categories" DROP COLUMN "icon";
-- reverse: modify "accounts" table
ALTER TABLE "accounts" DROP COLUMN "icon", ADD COLUMN "icon_path" character varying NULL;
