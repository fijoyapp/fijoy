gen:
  go generate .

web:
  cd web && pnpm dev

server:
  go run ./cmd/server.go

relay:
  watchman-make -p 'ent.graphql' 'fijoy.graphql' --run '(rm relay.graphql || true) && node ./scripts/merge-graphql.js'

db-up:
  docker-compose -f docker-compose.dev.yml up

db-down:
  docker-compose -f docker-compose.dev.yml down
