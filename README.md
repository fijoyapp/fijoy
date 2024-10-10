# Fijoy - Joyful Net Worth Tracking

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

![All Contributors](https://img.shields.io/github/all-contributors/fijoyapp/fijoy?style=for-the-badge&color=yellow)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

Personal finance made simple.
Track your net worth, manage your assets, and grow your wealth.

**Looking for collaborators!** [https://discord.gg/HwZarY9Aas](https://discord.gg/HwZarY9Aas)

![Fijoy Home](./assets/readme.png)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://jyu.dev"><img src="https://avatars.githubusercontent.com/u/25695219?v=4?s=100" width="100px;" alt="Joey Yu"/><br /><sub><b>Joey Yu</b></sub></a><br /><a href="https://github.com/fijoyapp/fijoy/commits?author=itsjoeoui" title="Code">💻</a> <a href="https://github.com/fijoyapp/fijoy/commits?author=itsjoeoui" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://akwan.my.id"><img src="https://avatars.githubusercontent.com/u/46861007?v=4?s=100" width="100px;" alt="Akwan Maroso"/><br /><sub><b>Akwan Maroso</b></sub></a><br /><a href="https://github.com/fijoyapp/fijoy/commits?author=akwanmaroso" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://cs.mcgill.ca/~szhang139"><img src="https://avatars.githubusercontent.com/u/112342947?v=4?s=100" width="100px;" alt="Sam Zhang"/><br /><sub><b>Sam Zhang</b></sub></a><br /><a href="https://github.com/fijoyapp/fijoy/commits?author=SamZhang02" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hanzili"><img src="https://avatars.githubusercontent.com/u/96609857?v=4?s=100" width="100px;" alt="hanzi"/><br /><sub><b>hanzi</b></sub></a><br /><a href="https://github.com/fijoyapp/fijoy/commits?author=hanzili" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## Contribution

Make sure you have [Just](https://github.com/casey/just) installed to run just commands.
And do a quick `just init` to grab all the dependencies.

The next step is to setup all the environment variables.

You can find more details in `apps/server/.env.example` and
`apps/web/.env.example`.

For local development, you can just copy the `.env.example` file to `.env`
and you do not need to change anything!

To start the project, you can run `just dev`. (Make sure Docker is running!)

### gRPC

We use [gRPC](https://grpc.io/) to exchange data between the server and the web.
All Proto files are located in `packages/proto`.

Just remember to run:

```bash
just buf # regenerate gRPC files
```

after you make changes to the Proto files.

Note: We are using [buf](https://buf.build/) to manage our Proto files.

### Server

Nothing special here for the moment. Just a plain old Go server.

### Database

We are using [ent](https://entgo.io/) to define our database schema
and generate migrations. I think it is a very underrated ORM tool.

To add a new entity, you can run:

```bash
just ent-new <entity-name>
```

then your new entity will be created in `apps/server/ent/schema`.

After you make the modifications you need, just run

```bash
just ent-generate
```

which generates all the migration files for you.

The migration will automatically be applied when the application reloads.

To update an existing entity, simply modify the schema in `apps/server/ent/schema`
and run `just ent-generate`.

To start a local Postgres instance with Docker, you can use:

```bash
just postgres
```

### Web

Make sure you have `pnpm` installed.

### Test

This will run all the tests for the server and the web.

```bash
just test
```
