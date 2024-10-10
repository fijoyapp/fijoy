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

Make sure you have the following dependencies installed:

- [Go](https://go.dev/doc/install)
- [Node.js](https://nodejs.org/en/download)
- [Just](https://github.com/casey/just)
- [Atlas](https://atlasgo.io/docs)
- [Docker](https://docs.docker.com/get-started/get-docker/) or [OrbStack](https://orbstack.dev/)
  (Recommanded)

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

Happy coding!
