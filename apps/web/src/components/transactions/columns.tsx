import { transactionTypeConfigMap } from "@/config/transaction";
import {
  Transaction,
  TransactionType,
} from "@/gen/proto/fijoy/v1/transaction_pb";
import { currencyToDisplay, moneyToCurrency } from "@/lib/money";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "amount",
    header: "Amount",

    cell: ({ row }) => {
      if (!row.original.amount) {
        return "Unknown";
      }
      if (row.original.transactionType === TransactionType.UNSPECIFIED) {
        return "Unknown";
      }

      return currencyToDisplay(
        moneyToCurrency(row.original.amount, {}),
        row.original.currency,
      );
    },
  },
  {
    accessorKey: "transactionType",
    header: "Type",
    cell: ({ row }) => {
      if (row.original.transactionType === TransactionType.UNSPECIFIED) {
        return "Unknown";
      }
      return transactionTypeConfigMap[row.original.transactionType].name;
    },
  },
];

// import { accountTypeConfigMap } from "@/config/account";
// import { Account, AccountType } from "@/gen/proto/fijoy/v1/account_pb";
// import { currencyToDisplay, moneyToCurrency } from "@/lib/money";
// import { ColumnDef } from "@tanstack/react-table";
//
// export const columns: ColumnDef<Account>[] = [
//   {
//     accessorKey: "name",
//     header: "Name",
//   },
//   {
//     accessorKey: "accountType",
//     header: "Account Type",
//     cell: ({ row }) => {
//       if (row.original.accountType === AccountType.UNSPECIFIED) {
//         return "Unknown";
//       }
//       return accountTypeConfigMap[row.original.accountType].name;
//     },
//   },
//   {
//     accessorKey: "institution",
//     header: "Institution",
//   },
//   {
//     accessorKey: "balance",
//     header: "Balance",
//     cell: ({ row }) => {
//       if (!row.original.balance) {
//         return "Unknown";
//       }
//       if (row.original.accountType === AccountType.UNSPECIFIED) {
//         return "Unknown";
//       }
//
//       return currencyToDisplay(
//         moneyToCurrency(row.original.balance, {
//           reverse: accountTypeConfigMap[row.original.accountType].isDebt,
//         }),
//         row.original.currency,
//       );
//     },
//   },
// ];
