import { accountTypeConfigMap } from "@/config/account";
import { Account } from "@/gen/proto/fijoy/v1/account_pb";
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
      if (row.original.accountType in accountTypeConfigMap) {
        return accountTypeConfigMap[row.original.accountType].name;
      }
      return "Unknown";
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
      if (!(row.original.accountType in accountTypeConfigMap)) {
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
