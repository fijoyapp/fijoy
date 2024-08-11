CREATE TABLE fijoy_profile (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  primary_currency TEXT NOT NULL,
  supported_currencies TEXT NOT NULL,
  locale TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  FOREIGN KEY (user_id) REFERENCES fijoy_user (id) ON DELETE CASCADE
);
