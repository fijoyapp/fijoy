# Fijoy

Joyful personal finance management for everyone.

**Looking for collaborators!** [https://discord.gg/HwZarY9Aas](https://discord.gg/HwZarY9Aas)

![Fijoy Home](./assets/readme.png)

## Contribution

Make sure you have [Just](https://github.com/casey/just) installed to run just commands.
And do a quick `just init` to grab all the dependencies.

The next step is to setup all the environment variables.

You can find more details in `apps/server/.env.example` and
`apps/web/.env.example`.

### Proto

We use protobuf to define the API for the server and the web.
To generate all the necessary code, run the following commands:

```bash
just buf
```

### Server

We are using [Jet](https://github.com/go-jet/jet) to generate DB related stuff for
a type-safe query building experience.

```bash
just jet
```

### Database

All database migrations are in `apps/server/internal/database/migrations`.
Here are all the migration commands:

```bash
just db-up
just db-down
just db-force <version>
```

To start a local Postgres instance with Docker, you can use:

```bash
just postgres
```

### Web

[Kanel](https://kristiandupont.github.io/kanel/) is used to generate all the
TypeScript types and [Zod](https://zod.dev/) schemas from Postgres schemas on
a live Postgres database instance. It will use the `DB_URL` from `apps/server/.env`.

```bash
just kanel
```

### Test

This will run all the tests for the server and the web.

```bash
just test
```

---

To run the project, simply use `just dev`.
