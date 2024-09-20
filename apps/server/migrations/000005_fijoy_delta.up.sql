CREATE TABLE "fijoy_delta" (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL,
  -- before we add a new delta entry, we should check when
  -- was the last entry added. If it was within 1 hour, we should combine them
  -- to reduce the number of entries
  datetime TIMESTAMPTZ NOT NULL,
  -- all these values are delta, not absolute
  liquidity NUMERIC(16, 8) NOT NULL,
  investment NUMERIC(16, 8) NOT NULL,
  property NUMERIC(16, 8) NOT NULL,
  receivable NUMERIC(16, 8) NOT NULL,
  liability NUMERIC(16, 8) NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES fijoy_profile (id) ON DELETE CASCADE
);
