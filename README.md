# Fijoy

Joyful personal finance management for everyone.

![Fijoy Home](./assets/readme.png)

## Contribution

Make sure you have [Just](https://github.com/casey/just) installed to run just commands.

### Server

2 different code generation tools are being used on the server side:
- [Jet](https://github.com/go-jet/jet): Used to generate DB related stuff for a type-safe query building experience.
- [Buf](https://github.com/bufbuild/buf): A protobuf compiler used for [Connect](https://connectrpc.com/docs/go/getting-started).

```bash
just apps/server/jet
just apps/server/buf
```

All database migrations are in `apps/server/internal/database/migrations`. Here are all the migration commands:

```bash
just apps/server/db-up
just apps/server/db-down
just apps/server/db-force <version>
```

### Web

Will setup Kanel soon for code generation.

```bash
```

---

To run the project, simply use `pnpm dev`.
