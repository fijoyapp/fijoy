import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
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
import { useMemo, useState } from "react";
import { useProfile } from "@/hooks/use-profile";
import { getCurrencyDisplay } from "@/lib/money";
import invariant from "tiny-invariant";
import { match } from "ts-pattern";
import { capitalize } from "lodash";

const AccountDataTableFragment = graphql`
  fragment accountDataTableFragment on Query {
    accounts(first: 5) {
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
