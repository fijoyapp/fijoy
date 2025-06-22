import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
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
import { useMemo } from "react";

const AccountDataTableFragment = graphql`
  fragment accountDataTableFragment on Query {
    accounts(first: 5) {
      edges {
        node {
          id
          name
          accountType
          balance
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

const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "accountType",
    header: "Account Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

type AccountDataTableProps = {
  accountDataTableFragment: accountDataTableFragment$key;
};

export default function AccountDataTable({
  accountDataTableFragment,
}: AccountDataTableProps) {
  const data = useFragment(AccountDataTableFragment, accountDataTableFragment);

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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
