CREATE TABLE "fijoy_account_snapshot" (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  datehour TIMESTAMPTZ NOT NULL DEFAULT date_trunc('hour', now()),
  -- all these values are delta, not absolute
  balance NUMERIC(16, 8) NOT NULL,
  FOREIGN KEY (account_id) REFERENCES fijoy_account (id) ON DELETE CASCADE
);

CREATE TABLE "fijoy_overall_snapshot" (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL,
  datehour TIMESTAMPTZ NOT NULL DEFAULT date_trunc('hour', now()),
  liquidity NUMERIC(16, 8) NOT NULL,
  investment NUMERIC(16, 8) NOT NULL,
  property NUMERIC(16, 8) NOT NULL,
  receivable NUMERIC(16, 8) NOT NULL,
  liability NUMERIC(16, 8) NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES fijoy_profile (id) ON DELETE CASCADE
)
