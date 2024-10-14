-- Modify "accounts" table
ALTER TABLE "accounts" DROP COLUMN "include_in_net_worth", ADD COLUMN "include_in_stats" boolean NOT NULL DEFAULT true, ADD COLUMN "include_in_charts" boolean NOT NULL DEFAULT true;
