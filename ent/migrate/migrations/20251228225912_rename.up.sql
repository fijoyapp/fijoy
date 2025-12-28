-- modify "user_keys" table
ALTER TABLE "user_keys" DROP COLUMN "user_keys", ADD COLUMN "user_user_keys" bigint NOT NULL, ADD CONSTRAINT "user_keys_users_user_keys" FOREIGN KEY ("user_user_keys") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;
