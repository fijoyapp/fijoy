-- reverse: modify "user_keys" table
ALTER TABLE "user_keys" DROP CONSTRAINT "user_keys_users_user_keys", DROP COLUMN "user_user_keys", ADD COLUMN "user_keys" bigint NOT NULL;
