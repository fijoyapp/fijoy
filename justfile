gen:
  go generate .

web:
  cd web && pnpm dev

server:
  go run ./cmd/server.go

merge-graphql:
  watchman-make -p 'ent.graphql' 'fijoy.graphql' --run '(rm relay.graphql || true) && node ./scripts/merge-graphql.js'

relay-watch:
  cd web && pnpm relay-compiler --watch

relay:
  cd web && pnpm relay-compiler

db-up:
  docker-compose -f docker-compose.dev.yml up

db-down:
  docker-compose -f docker-compose.dev.yml down
