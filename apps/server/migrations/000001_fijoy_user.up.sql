CREATE TABLE fijoy_user (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "fijoy_user_key" (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  hashed_password TEXT,
  FOREIGN KEY (user_id) REFERENCES fijoy_user (id) ON DELETE CASCADE
);
