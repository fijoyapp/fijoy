import { accountTypeConfigMap } from "@/config/account";
import { Account, AccountType } from "@/gen/proto/fijoy/v1/account_pb";

import { ColumnDef } from "@tanstack/react-table";
import { BalanceCell } from "./balance-cell";
import { AccountDetailButton } from "./account-detail-button";
import { getPrettyTime } from "@/lib/time";

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "accountType",
    header: "Account Type",
    cell: ({ row }) => {
      if (row.original.accountType === AccountType.UNSPECIFIED) {
        return "Unknown";
      }
      return accountTypeConfigMap[row.original.accountType].name;
    },
  },
  // {
  //   accessorKey: "institution",
  //   header: "Institution",
  // },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: BalanceCell,
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => {
      if (!row.original.updatedAt) {
        return "Unknown";
      }
      return <div>{getPrettyTime(row.original.updatedAt.toDate())}</div>;
    },
  },
  {
    id: "actions",
    cell: AccountDetailButton,
  },
];
