codegen:
  go generate .

[working-directory: 'web']
web:
  pnpm dev

server:
  go tool air

merge-graphql:
  watchexec -w ./gql -e graphql --shell=bash '(rm relay.graphql || true) && node ./scripts/merge-graphql.js'

relay-watch:
  watchexec --exts tsx,ts -w web 'just relay'

[working-directory: 'web']
relay:
  pnpm relay-compiler

compose argument:
  docker-compose -f docker-compose.dev.yml '{{argument}}'

migrate-hash:
  atlas migrate hash --dir file://ent/migrate/migrations

migrate name:
  go run -mod=mod ent/migrate/main.go {{name}}

[parallel]
dev: merge-graphql relay-watch

[working-directory: 'web']
install-web:
  pnpm install
