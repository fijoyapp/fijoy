# Fijoy - Joyful Net Worth Tracking

Personal finance made simple.
Track your net worth, manage your assets, and grow your wealth.

**Looking for collaborators!** [https://discord.gg/HwZarY9Aas](https://discord.gg/HwZarY9Aas)

![Fijoy Home](./assets/readme.png)

## Contribution

Make sure you have the following dependencies installed:

- [Go](https://go.dev/doc/install)
- [Node.js](https://nodejs.org/en/download) with [pnpm](https://pnpm.io/installation)
- [Just](https://github.com/casey/just)
- [Atlas](https://atlasgo.io/docs)
- [Docker](https://docs.docker.com/get-started/get-docker/) or [OrbStack](https://orbstack.dev/)
  (Recommended)

Then you can do a quick

```bash
just init
```

to grab everything else.

### Environment Variables

You can find more details in `apps/server/.env.example` and
`apps/web/.env.example`.

TLDR: For local development, you can just copy the `.env.example` files to `.env`
and you do not need to change anything!

### Start

To start the project, you can run

```bash
just dev # Make sure Docker/OrbStack is running!
```

More details on how to get started can be found in [docs/contribution.md](docs/contribution.md).
Please also give [docs/design-choices.md](docs/design-choices.md) a read to understand
why things are done in the way they are :)

You can also visit our FAQ in [docs/faq.md](docs/faq.md) to find answers to common questions.

Happy coding!
