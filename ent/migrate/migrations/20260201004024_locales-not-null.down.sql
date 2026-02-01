-- reverse: modify "currencies" table
ALTER TABLE "currencies" ALTER COLUMN "locales" DROP NOT NULL;
