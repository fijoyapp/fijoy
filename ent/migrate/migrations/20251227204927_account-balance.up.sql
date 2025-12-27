-- modify "accounts" table
ALTER TABLE "accounts" ADD COLUMN "balance" numeric(36,18) NOT NULL DEFAULT 0;
