import { AccountAccountType } from "@/components/accounts/__generated__/cardFragment.graphql";
import { accountsPageFragment$data } from "@/routes/_protected/_profile/__generated__/accountsPageFragment.graphql";
import currency from "currency.js";
import _ from "lodash";

export function accountsGroupBy(
  accounts: accountsPageFragment$data["accounts"],
): Record<
  Exclude<AccountAccountType, "%future added value">,
  accountsPageFragment$data["accounts"]
> {
  const groups = _.groupBy(accounts, (account) => account.accountType);

  return {
    liquidity: groups["liquidity"] || [],
    investment: groups["investment"] || [],
    property: groups["property"] || [],
    receivable: groups["receivable"] || [],
    liability: groups["liability"] || [],
  };
}

export const POSITIVE_ACCOUNT_TYPES: AccountAccountType[] = [
  "liquidity",
  "investment",
  "property",
  "receivable",
];
export const NEGATIVE_ACCOUNT_TYPES: AccountAccountType[] = ["liability"];

export function getOverallStats(
  accounts: accountsPageFragment$data["accounts"],
) {
  const asset = accounts.reduce((acc, account) => {
    if (POSITIVE_ACCOUNT_TYPES.includes(account.accountType)) {
      return acc.add(currency(account.balance));
    }
    return acc;
  }, currency(0));

  const liability = accounts.reduce((acc, account) => {
    if (NEGATIVE_ACCOUNT_TYPES.includes(account.accountType)) {
      return acc.add(currency(account.balance));
    }
    return acc;
  }, currency(0));

  const netWorth = asset.add(liability);

  return {
    asset,
    liability,
    netWorth,
  };
}
