dev:
    mprocs

build:
    just apps/server/build
    just apps/web/build

buf:
    rm -rf apps/server/proto
    rm -rf apps/web/src/gen/proto
    just packages/proto/buf

init:
    pnpm install
    just packages/proto/init
    just apps/server/init
    @echo "You are good to go!"

update:
    pnpm update -r
    just apps/server/update
    pnpm outdated -r

test:
    just apps/server/test
    just apps/web/test

format:
    just --fmt --unstable
    just apps/server/format
    just apps/web/format
    just apps/database/format
    just packages/proto/format

format-check:
    just apps/server/format-check
    just apps/web/format-check

lint:
    just apps/server/lint
    just apps/web/lint

postgres:
    docker compose -f docker-compose.dev.yml up

postgres-nuke:
    docker compose -f docker-compose.dev.yml down -v

psql:
    psql -h 127.0.0.1 -p 2345 -U user -d fijoy

migrate-diff name:
    just apps/server/migrate-diff {{ name }}

migrate-lint:
    just apps/server/migrate-lint

ent-new name:
    just apps/server/ent-new {{ name }}

ent-generate:
    just apps/server/ent-generate
