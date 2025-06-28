import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
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

const AccountDataTableFragment = graphql`
  fragment accountDataTableFragment on Query {
    accounts(first: 20) {
      edges {
        node {
          id
          name
          accountType
          balance
          currencySymbol
          amount
          ...cardFragment
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

export default function AccountDataTable({
  accountDataTableFragment,
}: AccountDataTableProps) {
  const data = useFragment(AccountDataTableFragment, accountDataTableFragment);
  const { profile } = useProfile();

  const columns: ColumnDef<Account>[] = useMemo(
    (): ColumnDef<Account>[] => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "accountType",
        header: "Type",
        cell: ({ row }) => {
          return <div>{capitalize(row.original?.accountType)}</div>;
        },
        enableGrouping: true,
      },
      {
        accessorKey: "currencySymbol",
        header: "Currency",
      },
      {
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
          const currencySymbol = row.original.currencySymbol;
          const accountType = row.original.accountType;

          return (
            <div className="text-right">
              {match(accountType)
                .with("investment", () => <div>{money} share(s)</div>)
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
        accessorKey: "balance",
        header: () => {
          return <div className="text-right">Balance</div>;
        },
        sortingFn: "basic",
        cell: ({ row }) => {
          if (row.getIsGrouped()) {
            const total = data.accounts.edges
              ?.filter(
                (a) => a?.node?.accountType === row.original?.accountType,
              )
              .reduce(
                (c, p) => currency(p?.node?.balance || 0).add(c),
                currency(0),
              );

            return (
              <div className="text-right font-mono">
                {getCurrencyDisplay(
                  total?.toString() || "",
                  profile.currencies.split(",")[0],
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
                profile.currencies.split(",")[0],
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
    [profile],
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

  const [grouping, setGrouping] = useState<string[]>(["accountType"]);
  const [expanded, setExpanded] = useState({});

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
    },
    onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,

    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
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
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
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
