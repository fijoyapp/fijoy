CREATE TABLE IF NOT EXISTS "fijoy_user_key" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL,
  "hashed_password" text
);
