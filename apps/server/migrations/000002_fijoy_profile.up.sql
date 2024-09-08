CREATE TABLE fijoy_profile (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  currencies TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  net_worth_goal NUMERIC(16, 8) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES fijoy_user (id) ON DELETE CASCADE
);
