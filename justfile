dev:
  pnpm dev

build:
  pnpm build

buf:
  just packages/proto/buf

init:
  pnpm install
  just packages/proto/init
  just apps/server/init

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

postgres:
  docker compose -f docker-compose.dev.yml up

psql:
  psql -h 127.0.0.1 -p 2345 -U user -d fijoy

migrate-diff name:
  just apps/server/migrate-diff {{name}}

migrate-lint:
  just apps/server/migrate-lint

ent-new name:
  just apps/server/ent-new {{name}}

ent-generate:
  just apps/server/ent-generate

ent-drop:
  just apps/server/ent-drop
