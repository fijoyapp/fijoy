import { accountTypeConfigMap } from "@/config/account";
import { Account, AccountType } from "@/gen/proto/fijoy/v1/account_pb";

import { ColumnDef, Row } from "@tanstack/react-table";
import { BalanceCell } from "./balance-cell";
import { ChevronRight } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import { useWorkspace } from "@/hooks/use-workspace";

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

function AccountDetailButton({ row }: { row: Row<Account> }) {
  const router = useRouter();
  const { workspace } = useWorkspace();

  return (
    <ChevronRight
      onClick={() =>
        router.navigate({
          to: "/workspace/$namespace/accounts/$accountId",
          params: {
            accountId: row.original.id,
            namespace: workspace.namespace,
          },
        })
      }
    />
  );
}
