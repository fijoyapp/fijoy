# Contribution

## gRPC

We use [gRPC](https://grpc.io/) to exchange data between the server and the web.
All Proto files are located in `packages/proto`.

Just remember to run:

```bash
just buf # regenerate gRPC files
```

after you make changes to the Proto files.

Note: We are using [buf](https://buf.build/) to manage our Proto files.

## Server

Nothing special here for the moment. Just a plain old Go server.

## Database

We are using [ent](https://entgo.io/) to define our database schema
and generate migrations.

---

To add a new entity, you can run:

```bash
just ent-new <EntityName>
```

then your new entity will be created in `apps/server/ent/schema`.

To modify an existing entity, just head over to `apps/server/ent/schema`
and update as you need.

---

After you make the modifications you need, just run

```bash
just ent-generate
just migrate-diff <migration_name>
```

**The migration will automatically be applied when the application reloads.**

---

To start a local Postgres instance with Docker, you can use:

```bash
just postgres
```

## Web

Nothing special here for the moment. Just a plain old React front end.

## Test

This will run all the tests for the server and the web.

```bash
just test
```
