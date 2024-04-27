import { accountTypeConfigMap } from "@/config/account";
import { Account, AccountType } from "@/gen/proto/fijoy/v1/account_pb";
import { currencyToDisplay, moneyToCurrency } from "@/lib/money";

import { useWorkspace } from "@/hooks/use-workspace";
import { Row } from "@tanstack/react-table";

export function BalanceCell({ row }: { row: Row<Account> }) {
  const { workspace } = useWorkspace();
  if (!row.original.balance) {
    return "Unknown";
  }
  if (row.original.accountType === AccountType.UNSPECIFIED) {
    return "Unknown";
  }

  return currencyToDisplay(
    moneyToCurrency(row.original.balance),
    row.original.balance.currencyCode,
    {
      compact: false,
      locale: workspace.locale,
      isDebt: accountTypeConfigMap[row.original.accountType].isDebt,
    },
  );
}
