CREATE TABLE "fijoy_snapshot" (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL,
  date DATE NOT NULL,
  liquidity NUMERIC(16, 8) NOT NULL,
  investment NUMERIC(16, 8) NOT NULL,
  property NUMERIC(16, 8) NOT NULL,
  receivable NUMERIC(16, 8) NOT NULL,
  liability NUMERIC(16, 8) NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES fijoy_profile (id) ON DELETE CASCADE,
  UNIQUE (profile_id, date)
);
