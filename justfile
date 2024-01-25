build:
  go build -o ./tmp/main ./cmd/main.go

migrateup:
  migrate -database ${DB_URL} -path internal/database/migrations up

migratedown:
  migrate -database ${DB_URL} -path internal/database/migrations down
