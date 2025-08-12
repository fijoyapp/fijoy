import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  type ExpandedState,
} from "@tanstack/react-table";
import { graphql } from "relay-runtime";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFragment } from "react-relay";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useProfile } from "@/hooks/use-profile";
import invariant from "tiny-invariant";
import { match } from "ts-pattern";
import { capitalize } from "lodash";
import currency from "currency.js";
import { getRouteApi } from "@tanstack/react-router";
import { useFormat } from "@/hooks/use-format";
import type {
  accountsDataTableFragment$data,
  accountsDataTableFragment$key,
} from "./__generated__/accountsDataTableFragment.graphql";
import { ScrollArea } from "@/components/ui/scroll-area";

const AccountsDataTableFragment = graphql`
  fragment accountsDataTableFragment on Query {
    accounts(first: 1000) @connection(key: "AccountsDataTable_accounts") {
      edges {
        node {
          id @required(action: THROW)
          name @required(action: THROW)
          accountType
          balance
          institution @required(action: THROW)
          value @required(action: THROW)
          currencyCode
          amount
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

type Account = NonNullable<
  NonNullable<accountsDataTableFragment$data["accounts"]["edges"]>[number]
>["node"];

type AccountDataTableProps = {
  accountsDataTableFragment: accountsDataTableFragment$key;
};

const routeApi = getRouteApi("/_protected/_profile/accounts");

export default function AccountDataTable({
  accountsDataTableFragment,
}: AccountDataTableProps) {
  const { groupby } = routeApi.useSearch();

  const data = useFragment(
    AccountsDataTableFragment,
    accountsDataTableFragment,
  );
  const { defaultCurrency } = useProfile();
  const { getCurrencyDisplay } = useFormat();

  const columns: ColumnDef<Account>[] = useMemo(
    (): ColumnDef<Account>[] => [
      {
        id: "name" satisfies keyof NonNullable<Account>,
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          if (row.getIsGrouped()) {
            return null;
          }
          return <div>{row.original?.name}</div>;
        },
      },
      {
        id: "accountType" satisfies keyof NonNullable<Account>,
        accessorKey: "accountType",
        header: "Type",
        cell: ({ row }) => {
          if (row.getIsGrouped()) {
            return null;
          }
          return <div>{capitalize(row.original?.accountType)}</div>;
        },
        enableGrouping: groupby === "accountType",
      },
      {
        id: "institution" satisfies keyof NonNullable<Account>,
        accessorKey: "institution",
        header: "Institution",
        cell: ({ row }) => {
          if (row.getIsGrouped()) {
            return null;
          }
          return <div>{row.original?.institution}</div>;
        },
        enableGrouping: groupby === "institution",
      },
      {
        id: "amount" satisfies keyof NonNullable<Account>,
        accessorKey: "amount",
        header: () => {
          return <div className="text-right">Amount</div>;
        },
        cell: ({ row }) => {
          if (row.getIsGrouped()) {
            return null;
          }

          invariant(row.original, "Row original should not be null");
          const money = row.original.amount;
          const value = row.original.value;
          const currencyCode = row.original.currencyCode;
          const accountType = row.original.accountType;

          return (
            <div className="text-right">
              {match(accountType)
                .with("investment", () => (
                  <div className="font-mono">
                    {money} x {getCurrencyDisplay(value, currencyCode)}
                  </div>
                ))
                .otherwise(() => (
                  <div className="font-mono">
                    {getCurrencyDisplay(money, currencyCode)}
                  </div>
                ))}
            </div>
          );
        },
      },
      {
        id: "balance" satisfies keyof NonNullable<Account>,
        accessorKey: "balance",
        header: () => {
          return <div className="text-right">Balance</div>;
        },
        cell: ({ row }) => {
          if (row.getIsGrouped()) {
            const total = row
              .getLeafRows()
              ?.filter((a) => {
                if (groupby === "accountType") {
                  return a.original?.accountType === row.original?.accountType;
                } else if (groupby === "institution") {
                  return a.original?.institution === row.original?.institution;
                }
              })
              .reduce(
                (c, p) => currency(p?.original?.balance || 0).add(c),
                currency(0),
              );

            return (
              <div className="text-right font-mono">
                {getCurrencyDisplay(total?.toString() || "", defaultCurrency)}
              </div>
            );
          }

          invariant(row.original, "Row original should not be null");
          const money = row.original.balance;
          return (
            <div className="text-right font-mono">
              {getCurrencyDisplay(money, defaultCurrency)}
            </div>
          );
        },
      },
    ],
    [defaultCurrency, groupby, getCurrencyDisplay],
  );

  const filteredData = useMemo(() => {
    return (
      data.accounts.edges?.map((edge) => edge?.node).filter((node) => !!node) ??
      []
    );
  }, [data]);

  return <DataTable columns={columns} data={filteredData} />;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // NOTE: https://github.com/TanStack/table/issues/5026
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [sorting, setSorting] = useState<SortingState>([]);

  const grouping = useMemo(() => {
    const target = columns.find((col) => col.enableGrouping)?.id;
    if (!target) return [];
    return [target];
  }, [columns]);

  const columnOrder = useMemo(() => columns.map((col) => col.id!), [columns]);

  const [expanded, setExpanded] = useState<ExpandedState>(true);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      expanded,
      grouping,
      columnOrder,
    },
    onExpandedChange: setExpanded,

    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  if (!hasMounted) return null;

  return (
    <ScrollArea className="bg-card overflow-y-auto rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => {
            const orderedHeaders = columnOrder
              .map(
                (id) => headerGroup.headers.find((header) => header.id === id)!,
              )
              .filter(Boolean);
            return (
              <TableRow key={headerGroup.id}>
                {orderedHeaders.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            );
          })}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => {
              const orderedCells = row.getIsGrouped()
                ? row.getVisibleCells()
                : columnOrder.map(
                    (id) =>
                      row
                        .getVisibleCells()
                        .find((cell) => cell.column.id === id)!,
                  );
              return (
                <TableRow key={row.id}>
                  {orderedCells.map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.getIsGrouped() ? (
                        // Render group header with expand/collapse
                        <button
                          onClick={() => row.toggleExpanded()}
                          style={{ fontWeight: "bold" }}
                        >
                          {row.getIsExpanded() ? "▼" : "▶"}{" "}
                          {cell.getValue() as ReactNode} ({row.subRows.length})
                        </button>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
