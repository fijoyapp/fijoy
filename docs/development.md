# Development

## Tutorials

Here are some **very important** tutorials to get you started with the technologies used in this project:

- [Relay](https://relay.dev/docs/tutorial/intro/)
- [Ent](https://entgo.io/docs/getting-started/)

## Setup

We use [mise](https://mise.jdx.dev/) to manage the development environment.

### Configured tools

The following tools are managed by mise (see `mise.toml`):
- **atlas** (latest) - Database schema management
- **docker-compose** (latest)
- **just** (latest) - Command runner
- **go** (1.25.5)
- **node** (24.12.0)
- **pnpm** (latest)
- **watchexec** (latest)

### Using mise

**Install all tools** (first time setup):
```bash
mise install
```

**Activate mise in your shell** (if not already configured):
```bash
# Add to your ~/.bashrc or ~/.zshrc
eval "$(mise activate bash)"  # or zsh, fish, etc.
```

**Check installed tools**:
```bash
mise list
```

**Update tools**:
```bash
mise upgrade
```

## Commands

### Database

```bash
just compose up
just compose down
```

### Server

```bash
just server
just codegen # Ent, GQL, etc.
```

### Web

```bash
just web
```

### GraphQL / Relay

```bash
just dev

```
