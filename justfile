gen:
  go generate .

web:
  cd web && pnpm dev

server:
  go run ./cmd/server.go

relay:
  watchman-make -p 'ent.graphql' 'fijoy.graphql' --run '(rm relay.graphql || true) && node ./web/scripts/merge-graphql.js'
