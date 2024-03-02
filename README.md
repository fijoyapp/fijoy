# Fijoy

Joyful personal finance management for everyone.

**Looking for collaborators!** [https://discord.gg/xcEs33PpTR](https://discord.gg/xcEs33PpTR)

![Fijoy Home](./assets/readme.png)

## Contribution

Make sure you have [Just](https://github.com/casey/just) installed to run just commands.
And do a quick `pnpm install` to grab all the NPM dependencies.

### Proto

We use protobuf to define the API for the server and the web.
To generate all the necessary code, run the following commands:

```bash
just packages/proto/buf
```

### Server

2 different code generation tools are being used on the server side:

- [Jet](https://github.com/go-jet/jet): Used to generate DB related stuff for
  a type-safe query building experience.

```bash
just apps/server/jet
```

All database migrations are in `apps/server/internal/database/migrations`.
Here are all the migration commands:

```bash
just apps/server/db-up
just apps/server/db-down
just apps/server/db-force <version>
```

### Web

[Kanel](https://kristiandupont.github.io/kanel/) is used to generate all the
TypeScript types and [Zod](https://zod.dev/) schemas from Postgres schemas on
a live Postgres database instance. It will use the `DB_URL` from `apps/server/.env`.

```bash
just apps/web/kanel
```

---

To run the project, simply use `pnpm dev`.
