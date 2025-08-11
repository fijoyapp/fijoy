import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
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
import { useMemo, useState } from "react";
import { useProfile } from "@/hooks/use-profile";
// import { getCurrencyDisplay } from "@/lib/money";
// import invariant from "tiny-invariant";
// import { match } from "ts-pattern";
import type {
  transactionDataTableFragment$data,
  transactionDataTableFragment$key,
} from "./__generated__/transactionDataTableFragment.graphql";
import { useFormat } from "@/hooks/use-format";
import invariant from "tiny-invariant";

const TransactionDataTableFragment = graphql`
  fragment transactionDataTableFragment on Query {
    transactions(first: 20)
      @connection(key: "TransactionsDataTable_transactions") {
      edges {
        node {
          id
          note
          datetime @required(action: THROW)
          balance @required(action: THROW)
          # transactionEntries {
          #   id
          #   amount
          #   value
          #   fxRate
          #   balance
          #   account {
          #     name
          #     currencySymbol
          #   }
          # }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

type Transaction = NonNullable<
  NonNullable<
    transactionDataTableFragment$data["transactions"]["edges"]
  >[number]
>["node"];

type TransactionDataTableProps = {
  transactionDataTableFragment: transactionDataTableFragment$key;
};

export default function TransactionDataTable({
  transactionDataTableFragment,
}: TransactionDataTableProps) {
  const data = useFragment(
    TransactionDataTableFragment,
    transactionDataTableFragment,
  );
  const { defaultCurrency } = useProfile();
  const { getCurrencyDisplay } = useFormat();

  const columns: ColumnDef<Transaction>[] = useMemo(
    (): ColumnDef<Transaction>[] => [
      {
        id: "note",
        accessorKey: "note",
        header: "Note",
        cell: ({ row }) => {
          return <div>{row.original?.note}</div>;
        },
      },
      {
        id: "datetime",
        accessorKey: "datetime",
        header: "Datetime",
        cell: ({ row }) => {
          return <div>{row.original?.datetime}</div>;
        },
      },
      {
        id: "balance",
        accessorKey: "balance",
        header: "",
        cell: ({ row }) => {
          invariant(row.original, "Row original should not be null");
          return (
            <div>
              {getCurrencyDisplay(row.original.balance, defaultCurrency)}
            </div>
          );
        },
      },
      // {
      //   accessorKey: "amount",
      //   header: "Amount",
      //   cell: ({ row }) => {
      //     invariant(row.original, "Row original should not be null");
      //     const money = row.original.amount;
      //     const currencySymbol = row.original.account.currencySymbol;
      //     const accountType = row.original.account.accountType;
      //
      //     return (
      //       <div className="">
      //         {match(accountType)
      //           .with("investment", () => <div>{money} share(s)</div>)
      //           .otherwise(() => (
      //             <div className="font-mono">
      //               {getCurrencyDisplay(money, currencySymbol, profile.locale, {
      //                 compact: false,
      //               })}
      //             </div>
      //           ))}
      //       </div>
      //     );
      //   },
      // },
      // {
      //   accessorKey: "balance",
      //   header: () => {
      //     return <div className="text-right">Balance</div>;
      //   },
      //   sortingFn: "basic",
      //   cell: ({ row }) => {
      //     invariant(row.original, "Row original should not be null");
      //     const money = row.original.balance;
      //     return (
      //       <div className="text-right font-mono">
      //         {getCurrencyDisplay(
      //           money,
      //           profile.currencies[0],
      //           profile.locale,
      //           {
      //             compact: false,
      //           },
      //         )}
      //       </div>
      //     );
      //   },
      // },
    ],
    [defaultCurrency, getCurrencyDisplay],
  );

  const filteredData = useMemo(() => {
    return (
      data.transactions.edges
        ?.map((edge) => edge?.node)
        .filter((node) => !!node) ?? []
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
    <div className="bg-card rounded-md border">
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
