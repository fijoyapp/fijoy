# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Beaver Money is a personal finance management application with a Go backend and React frontend. The stack uses:

- **Backend**: Go with GraphQL (gqlgen), Ent ORM, PostgreSQL
- **Frontend**: React 19, TanStack Router, Relay, Vite, Tailwind CSS v4

## Key Technologies

### Ent Framework

- ORM for Go that generates type-safe database code
- Schema definitions in `ent/schema/*.go`
- Generates code in `ent/` directory
- Run `just codegen` after schema changes

### GraphQL Architecture

- **Two GraphQL schemas**:
  - `ent.graphql`: Auto-generated from Ent schema
  - `beavermoney.graphql`: Custom types, queries, mutations, and extensions
- Schemas are merged into `relay.graphql` for frontend consumption
- Use `just dev` to merge schemas (watches for changes)

### gqlgen Configuration

- Field-level resolvers for selective computation
- Configure in `gqlgen.yml` with `resolver: true` on specific fields
- Resolvers implemented in `beavermoney.resolvers.go`
- Run `just codegen` to regenerate after GraphQL schema changes

### Relay (Frontend)

- Fragment colocation pattern - components declare their data requirements
- Connection pattern for pagination with `@connection` directive
- Fragments on specific types (e.g., `TransactionCategory`, `FinancialReport`)
- Use `just dev` to run relay-compiler (watches for changes)
- Generated files in `__generated__` directories

## Development Commands

### Environment Setup

```bash
# mise provides all development tools
mise install
```

### Database

```bash
just compose up # Start PostgreSQL
just compose down # Stop PostgreSQL
```

### Backend Development

```bash
just server # Run Go server
just codegen # Generate Ent + GraphQL code
```

### Frontend Development

```bash
just web # Run Vite dev server (port 5173)
just dev # Run GQL schema merge + Relay compiler in parallel
cd web && pnpm check  # Format and lint
```

### Database Migrations

```bash
just migrate <name>        # Create new migration
just migrate-hash          # Hash migrations for Atlas
```

## Architecture Patterns

### Backend: Multi-Currency Financial Aggregations

When implementing financial aggregations (income, expenses, etc.):

1. **Always group by currency first** in SQL queries

   ```go
   // Group by category AND currency
   s.Select(
       sql.As(cu.C(currency.FieldCode), "currency_code"),
       sql.As(sql.Sum(te.C(transactionentry.FieldAmount)), "total"),
   )
   s.GroupBy(categoryID, currencyCode)
   ```

2. **Convert to household currency in Go** using FX rates

   ```go
   for _, row := range results {
       rate, err := r.fxrateClient.GetRate(ctx, row.CurrencyCode, householdCurrency, time.Now())
       total = total.Add(row.Total.Mul(rate))
   }
   ```

3. **Use Ent constants** for table/column names - never hardcode strings

   ```go
   // Good
   te := sql.Table(transactionentry.Table)
   te.C(transactionentry.TransactionColumn)  // FK columns use XColumn
   te.C(transactionentry.FieldAmount)        // Regular fields use FieldX

   // Bad
   sql.Table("transaction_entries")
   te.C("transaction_id")
   ```

### Backend: GraphQL Field Resolvers

For types with expensive computed fields:

1. Mark fields with `resolver: true` in `gqlgen.yml`
2. Implement field-level resolvers that only compute when requested
3. Always add error logging: `r.logger.Error("message", "error", err)`

### Frontend: Fragment Colocation

Components declare their data requirements via fragments:

```typescript
const MyComponentFragment = graphql`
  fragment myComponentFragment on SomeType {
    field1
    field2
    ...childComponentFragment
  }
`;

// Parent spreads fragment in query
const ParentQuery = graphql`
  query ParentQuery {
    someType {
      ...myComponentFragment
    }
  }
`;
```

Multiple fragments per component:

- Use descriptive names like `categoryCardCategoryFragment` and `categoryCardFinancialReportFragment`
- Props should be named `categoryRef`, `financialReportRef` etc. for clarity
- Use `useMemo` for lookups to avoid recomputation

### Frontend: Component Patterns

Follow the accounts panel/card pattern for list views:

- Accordion triggers show type name + total (right-aligned, monospace)
- Cards show item name (left) + value/details (right, monospace)
- Use `<span className="grow"></span>` to push content right
- Multi-currency amounts computed server-side, formatted with privacy mode

## Code Style

### Backend (Go)

- Use Ent-generated constants for all database field/column references
- Foreign key columns: Use `XColumn` constant (e.g., `transactionentry.TransactionColumn`)
- Regular fields: Use `FieldX` constant (e.g., `transaction.FieldID`)
- Always use `r.logger` for error logging in resolvers

### Frontend (React/TypeScript)

- Functional programming: Use `.map()`, `.filter()`, `.find()`, `.flatMap()` - no for loops
- Fragment colocation: Components declare all data needs
- No prop drilling computed data - components fetch and compute their own data
- Use `currency.js` for money calculations
- Privacy mode support for all financial displays

## Important Files

- `ent/schema/*.go` - Database schema definitions
- `beavermoney.graphql` - Custom GraphQL schema
- `gqlgen.yml` - GraphQL code generation config
- `beavermoney.resolvers.go` - GraphQL resolver implementations
- `web/relay.config.json` - Relay compiler configuration
- `justfile` - Task runner commands
- `web/src/routes/` - File-based routing with TanStack Router

## Resources

Essential tutorials for this stack:

- [Relay Tutorial](https://relay.dev/docs/tutorial/intro/)
- [Ent Getting Started](https://entgo.io/docs/getting-started/)
