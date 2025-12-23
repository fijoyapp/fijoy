gen:
  go generate .

web:
  cd web && pnpm dev

server:
  go run ./cmd/server

