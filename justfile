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
  just packages/proto/init

