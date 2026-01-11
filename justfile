codegen:
  go generate .

web:
  cd web && pnpm dev

server:
  go run ./cmd/server/main.go

merge-graphql:
  watchexec -w ent.graphql -w beavermoney.graphql --shell=bash '(rm relay.graphql || true) && node ./scripts/merge-graphql.js'

relay-watch:
  watchexec --exts tsx,ts -w web 'cd web && pnpm relay-compiler'

relay:
  cd web && pnpm relay-compiler

db-up:
  docker-compose -f docker-compose.dev.yml up

db-down:
  docker-compose -f docker-compose.dev.yml down

migrate-hash:
  atlas migrate hash --dir file://ent/migrate/migrations

migrate name:
  go run -mod=mod ent/migrate/main.go {{name}}

[parallel]
dev: merge-graphql relay-watch

