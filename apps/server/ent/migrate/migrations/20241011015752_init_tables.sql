-- Create "users" table
CREATE TABLE "users" ("id" character varying NOT NULL, "email" character varying NOT NULL, "created_at" timestamptz NOT NULL, PRIMARY KEY ("id"));
-- Create index "users_email_key" to table: "users"
CREATE UNIQUE INDEX "users_email_key" ON "users" ("email");
-- Create "profiles" table
CREATE TABLE "profiles" ("id" character varying NOT NULL, "locale" character varying NOT NULL, "currencies" character varying NOT NULL, "net_worth_goal" numeric(38,18) NOT NULL, "created_at" timestamptz NOT NULL, "user_profile" character varying NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "profiles_users_profile" FOREIGN KEY ("user_profile") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION);
-- Create "accounts" table
CREATE TABLE "accounts" ("id" character varying NOT NULL, "name" character varying NOT NULL, "account_type" character varying NOT NULL, "archived" boolean NOT NULL DEFAULT false, "include_in_net_worth" boolean NOT NULL DEFAULT false, "symbol" character varying NOT NULL, "symbol_type" character varying NOT NULL, "amount" numeric(38,18) NOT NULL, "value" numeric(18,10) NOT NULL, "fx_rate" numeric(18,10) NULL, "balance" numeric(38,18) NOT NULL, "created_at" timestamptz NOT NULL, "updated_at" timestamptz NOT NULL, "profile_account" character varying NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "accounts_profiles_account" FOREIGN KEY ("profile_account") REFERENCES "profiles" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION);
-- Create "account_snapshots" table
CREATE TABLE "account_snapshots" ("id" character varying NOT NULL, "datehour" timestamptz NOT NULL DEFAULT date_trunc('hour'::text, now()), "balance" numeric(38,18) NOT NULL, "account_account_snapshot" character varying NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "account_snapshots_accounts_account_snapshot" FOREIGN KEY ("account_account_snapshot") REFERENCES "accounts" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION);
-- Create "overall_snapshots" table
CREATE TABLE "overall_snapshots" ("id" character varying NOT NULL, "datehour" timestamptz NOT NULL DEFAULT date_trunc('hour'::text, now()), "liquidity" numeric(38,18) NOT NULL, "investment" numeric(38,18) NOT NULL, "property" numeric(38,18) NOT NULL, "receivable" numeric(38,18) NOT NULL, "liablity" numeric(38,18) NOT NULL, "profile_overall_snapshot" character varying NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "overall_snapshots_profiles_overall_snapshot" FOREIGN KEY ("profile_overall_snapshot") REFERENCES "profiles" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION);
-- Create "transactions" table
CREATE TABLE "transactions" ("id" character varying NOT NULL, "amount" numeric(38,18) NOT NULL, "amount_delta" numeric(38,18) NOT NULL, "value" numeric(18,10) NOT NULL, "fx_rate" numeric(18,10) NULL, "balance" numeric(38,18) NOT NULL, "balance_delta" numeric(38,18) NOT NULL, "note" text NULL, "created_at" timestamptz NOT NULL, "updated_at" timestamptz NOT NULL, "account_transaction" character varying NOT NULL, "profile_transaction" character varying NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "transactions_accounts_transaction" FOREIGN KEY ("account_transaction") REFERENCES "accounts" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT "transactions_profiles_transaction" FOREIGN KEY ("profile_transaction") REFERENCES "profiles" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION);
-- Create "user_keys" table
CREATE TABLE "user_keys" ("id" character varying NOT NULL, "hashed_password" character varying NOT NULL, "user_user_key" character varying NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "user_keys_users_user_key" FOREIGN KEY ("user_user_key") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION);