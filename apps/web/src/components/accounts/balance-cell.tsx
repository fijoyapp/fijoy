import { accountTypeConfigMap } from "@/config/account";
import { Account, AccountType } from "@/gen/proto/fijoy/v1/account_pb";
import { currencyToDisplay, moneyToCurrency } from "@/lib/money";

import { useProfile } from "@/hooks/use-profile";
import { Row } from "@tanstack/react-table";

export function BalanceCell({ row }: { row: Row<Account> }) {
  const { workspace } = useProfile();
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
