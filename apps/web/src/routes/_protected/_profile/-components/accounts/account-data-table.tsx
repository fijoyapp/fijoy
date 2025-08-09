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
import type {
  accountDataTableFragment$data,
  accountDataTableFragment$key,
} from "./__generated__/accountDataTableFragment.graphql";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFragment } from "react-relay";
import { useMemo, useState, type ReactNode } from "react";
import { useProfile } from "@/hooks/use-profile";
import { getCurrencyDisplay } from "@/lib/money";
import invariant from "tiny-invariant";
import { match } from "ts-pattern";
import { capitalize } from "lodash";
import currency from "currency.js";
import { getRouteApi } from "@tanstack/react-router";

const AccountDataTableFragment = graphql`
  fragment accountDataTableFragment on Query {
    accounts(first: 20) {
      edges {
        node {
          id @required(action: THROW)
          name @required(action: THROW)
          accountType
          balance
          institution @required(action: THROW)
          value @required(action: THROW)
          currencySymbol
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
  NonNullable<accountDataTableFragment$data["accounts"]["edges"]>[number]
>["node"];

type AccountDataTableProps = {
  accountDataTableFragment: accountDataTableFragment$key;
};

const routeApi = getRouteApi("/_protected/_profile/accounts");

export default function AccountDataTable({
  accountDataTableFragment,
}: AccountDataTableProps) {
  const { groupby } = routeApi.useSearch();

  const data = useFragment(AccountDataTableFragment, accountDataTableFragment);
  const { profile } = useProfile();

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
          const currencySymbol = row.original.currencySymbol;
          const accountType = row.original.accountType;

          return (
            <div className="text-right">
              {match(accountType)
                .with("investment", () => (
                  <div>
                    {money} x{" "}
                    {getCurrencyDisplay(value, currencySymbol, profile.locale, {
                      compact: false,
                    })}
                  </div>
                ))
                .otherwise(() => (
                  <div className="font-mono">
                    {getCurrencyDisplay(money, currencySymbol, profile.locale, {
                      compact: false,
                    })}
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
              ?.filter(
                (a) => a.original?.accountType === row.original?.accountType,
              )
              .reduce(
                (c, p) => currency(p?.original?.balance || 0).add(c),
                currency(0),
              );

            return (
              <div className="text-right font-mono">
                {getCurrencyDisplay(
                  total?.toString() || "",
                  profile.currencies[0],
                  profile.locale,
                  {
                    compact: false,
                  },
                )}
              </div>
            );
          }

          invariant(row.original, "Row original should not be null");
          const money = row.original.balance;
          return (
            <div className="text-right font-mono">
              {getCurrencyDisplay(
                money,
                profile.currencies[0],
                profile.locale,
                {
                  compact: false,
                },
              )}
            </div>
          );
        },
      },
    ],
    [profile, groupby],
  );

  const filteredData = useMemo(() => {
    return (
      data.accounts.edges?.map((edge) => edge?.node).filter((node) => !!node) ??
      []
    );
  }, [data]);

  if (!profile) {
    return null;
  }

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

  return (
    <div className="bg-card rounded-md border">
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
    </div>
  );
}
