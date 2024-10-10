-- Create "accounts" table
CREATE TABLE "accounts" ("id" bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY, "name" character varying NOT NULL, "account_type" character varying NOT NULL, "archived" boolean NOT NULL DEFAULT false, "include_in_net_worth" boolean NOT NULL DEFAULT false, "symbol" character varying NOT NULL, "symbol_type" character varying NOT NULL, "amount" numeric(38,18) NOT NULL, "value" numeric(18,10) NOT NULL, "fx_rate" numeric(18,10) NULL, "balance" numeric(38,18) NOT NULL, "created_at" timestamptz NOT NULL, "updated_at" timestamptz NOT NULL, PRIMARY KEY ("id"));
-- Create "account_snapshots" table
CREATE TABLE "account_snapshots" ("id" bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY, "datehour" timestamptz NOT NULL DEFAULT date_trunc('hour'::text, now()), "balance" numeric(38,18) NOT NULL, PRIMARY KEY ("id"));
-- Create "account_account_snapshot" table
CREATE TABLE "account_account_snapshot" ("account_id" bigint NOT NULL, "account_snapshot_id" bigint NOT NULL, PRIMARY KEY ("account_id", "account_snapshot_id"), CONSTRAINT "account_account_snapshot_account_id" FOREIGN KEY ("account_id") REFERENCES "accounts" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "account_account_snapshot_account_snapshot_id" FOREIGN KEY ("account_snapshot_id") REFERENCES "account_snapshots" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- Create "transactions" table
CREATE TABLE "transactions" ("id" bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY, "amount" numeric(38,18) NOT NULL, "amount_delta" numeric(38,18) NOT NULL, "value" numeric(18,10) NOT NULL, "fx_rate" numeric(18,10) NULL, "balance" numeric(38,18) NOT NULL, "balance_delta" numeric(38,18) NOT NULL, "note" text NULL, "created_at" timestamptz NOT NULL, "updated_at" timestamptz NOT NULL, PRIMARY KEY ("id"));
-- Create "account_transaction" table
CREATE TABLE "account_transaction" ("account_id" bigint NOT NULL, "transaction_id" bigint NOT NULL, PRIMARY KEY ("account_id", "transaction_id"), CONSTRAINT "account_transaction_account_id" FOREIGN KEY ("account_id") REFERENCES "accounts" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "account_transaction_transaction_id" FOREIGN KEY ("transaction_id") REFERENCES "transactions" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- Create "users" table
CREATE TABLE "users" ("id" bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY, "email" character varying NOT NULL, "created_at" timestamptz NOT NULL, PRIMARY KEY ("id"));
-- Create index "users_email_key" to table: "users"
CREATE UNIQUE INDEX "users_email_key" ON "users" ("email");
-- Create "profiles" table
CREATE TABLE "profiles" ("id" bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY, "user_profile" bigint NULL, PRIMARY KEY ("id"), CONSTRAINT "profiles_users_profile" FOREIGN KEY ("user_profile") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE SET NULL);
-- Create "profile_account" table
CREATE TABLE "profile_account" ("profile_id" bigint NOT NULL, "account_id" bigint NOT NULL, PRIMARY KEY ("profile_id", "account_id"), CONSTRAINT "profile_account_account_id" FOREIGN KEY ("account_id") REFERENCES "accounts" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "profile_account_profile_id" FOREIGN KEY ("profile_id") REFERENCES "profiles" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- Create "overall_snapshots" table
CREATE TABLE "overall_snapshots" ("id" bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY, "datehour" timestamptz NOT NULL DEFAULT date_trunc('hour'::text, now()), "liquidity" numeric(38,18) NOT NULL, "investment" numeric(38,18) NOT NULL, "property" numeric(38,18) NOT NULL, "receivable" numeric(38,18) NOT NULL, "liablity" numeric(38,18) NOT NULL, PRIMARY KEY ("id"));
-- Create "profile_overall_snapshot" table
CREATE TABLE "profile_overall_snapshot" ("profile_id" bigint NOT NULL, "overall_snapshot_id" bigint NOT NULL, PRIMARY KEY ("profile_id", "overall_snapshot_id"), CONSTRAINT "profile_overall_snapshot_overall_snapshot_id" FOREIGN KEY ("overall_snapshot_id") REFERENCES "overall_snapshots" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "profile_overall_snapshot_profile_id" FOREIGN KEY ("profile_id") REFERENCES "profiles" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- Create "profile_transaction" table
CREATE TABLE "profile_transaction" ("profile_id" bigint NOT NULL, "transaction_id" bigint NOT NULL, PRIMARY KEY ("profile_id", "transaction_id"), CONSTRAINT "profile_transaction_profile_id" FOREIGN KEY ("profile_id") REFERENCES "profiles" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "profile_transaction_transaction_id" FOREIGN KEY ("transaction_id") REFERENCES "transactions" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- Create "user_keys" table
CREATE TABLE "user_keys" ("id" bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY, "hashed_password" character varying NOT NULL, PRIMARY KEY ("id"));
-- Create "user_user_key" table
CREATE TABLE "user_user_key" ("user_id" bigint NOT NULL, "user_key_id" bigint NOT NULL, PRIMARY KEY ("user_id", "user_key_id"), CONSTRAINT "user_user_key_user_id" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "user_user_key_user_key_id" FOREIGN KEY ("user_key_id") REFERENCES "user_keys" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);