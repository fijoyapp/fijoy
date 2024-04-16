import { accountTypeConfigMap } from "@/config/account";
import { Account, AccountType } from "@/gen/proto/fijoy/v1/account_pb";

import { ColumnDef } from "@tanstack/react-table";
import { BalanceCell } from "./balance-cell";
import { AccountDetailButton } from "./account-detail-button";

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
  {
    accessorKey: "institution",
    header: "Institution",
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: BalanceCell,
  },
  {
    id: "actions",
    cell: AccountDetailButton,
  },
];
