import { transactionTypeConfigMap } from "@/config/transaction";
import {
  Transaction,
  TransactionType,
} from "@/gen/proto/fijoy/v1/transaction_pb";
import { currencyToDisplay, moneyToCurrency } from "@/lib/money";
import { useProfile } from "@/hooks/use-workspace";
import { ColumnDef, Row } from "@tanstack/react-table";

function AmountCell({ row }: { row: Row<Transaction> }) {
  const { workspace } = useProfile();
  if (!row.original.amount) {
    return "Unknown";
  }
  if (row.original.transactionType === TransactionType.UNSPECIFIED) {
    return "Unknown";
  }

  return currencyToDisplay(
    moneyToCurrency(row.original.amount),
    row.original.amount.currencyCode,
    { compact: false, locale: workspace.locale },
  );
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "datetime",
    header: "Date",
    cell: ({ row }) => {
      return row.original.datetime
        ?.toDate()
        .toLocaleDateString(navigator.language, {
          day: "numeric",
          month: "short",
          weekday: "short",
        });
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",

    cell: AmountCell,
  },
  {
    accessorKey: "transactionType",
    header: "Transaction Type",
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
