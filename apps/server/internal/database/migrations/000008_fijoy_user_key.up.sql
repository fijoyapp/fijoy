CREATE TABLE "fijoy_user_key" (
  "id" TEXT PRIMARY KEY NOT NULL,
  "user_id" TEXT NOT NULL,
  "hashed_password" TEXT,
  CONSTRAINT "fijoy_user_key_user_id_fijoy_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "fijoy_user" ("id") ON DELETE cascade ON UPDATE no action
);
