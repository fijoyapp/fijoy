codegen:
  go generate .

web:
  cd web && pnpm dev

server:
  go run ./cmd/server/main.go

merge-graphql:
  watchexec -w ent.graphql -w fijoy.graphql '(rm relay.graphql || true) && node ./scripts/merge-graphql.js'

relay-watch:
  cd web && pnpm relay-compiler --watch

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
