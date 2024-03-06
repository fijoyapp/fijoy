import { accountTypeConfigMap } from "@/config/account";
import { Account, AccountType } from "@/gen/proto/fijoy/v1/account_pb";
import { currencyToDisplay, moneyToCurrency } from "@/lib/money";
import { ColumnDef } from "@tanstack/react-table";

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
    cell: ({ row }) => {
      if (!row.original.balance) {
        return "Unknown";
      }
      if (row.original.accountType === AccountType.UNSPECIFIED) {
        return "Unknown";
      }

      return currencyToDisplay(
        moneyToCurrency(row.original.balance, {
          reverse: accountTypeConfigMap[row.original.accountType].isDebt,
        }),
        row.original.currency,
      );
    },
  },
];