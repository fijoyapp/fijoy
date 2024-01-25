set dotenv-load := true

build:
  go build -o ./tmp/main ./cmd/main.go

db-up:
  migrate -database ${DB_URL} -path internal/database/migrations up

db-down:
  migrate -database ${DB_URL} -path internal/database/migrations down

db-force version:
  migrate -database ${DB_URL} -path internal/database/migrations force {{version}}

jet:
  jet -dsn=${DB_URL} -schema=public -path=./.gen
