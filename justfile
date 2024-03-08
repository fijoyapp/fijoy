build:
  just apps/server/build

db-up:
  just apps/server/db-up

db-down:
  just apps/server/db-down

db-force version:
  just apps/server/db-force {{version}}

jet:
  just apps/server/jet

kanel:
  just apps/web/kanel

buf:
  just packages/proto/buf

init:
  pnpm install
  just packages/proto/init

update:
  pnpm update -r
  just apps/server/update
  pnpm outdated -r

test:
  just apps/server/test
  just apps/web/test

format:
  just apps/server/format
  just apps/web/format

db-gen:
  just apps/server/jet
  just apps/web/kenel
