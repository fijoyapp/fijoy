import { AccountAccountType } from "@/components/accounts/__generated__/cardFragment.graphql";
import { accountsQuery$data } from "@/routes/_protected/_profile/accounts/__generated__/accountsQuery.graphql";
import currency from "currency.js";
import _ from "lodash";

export function accountsGroupBy(
  accounts: accountsQuery$data,
): Record<
  Exclude<AccountAccountType, "%future added value">,
  accountsQuery$data["accounts"]
> {
  const groups = _.groupBy(accounts.accounts, (account) => account.accountType);

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

export function getOverallStats(accounts: accountsQuery$data) {
  const asset = accounts.accounts.reduce((acc, account) => {
    if (POSITIVE_ACCOUNT_TYPES.includes(account.accountType)) {
      return acc.add(currency(account.balance));
    }
    return acc;
  }, currency(0));

  const liability = accounts.accounts.reduce((acc, account) => {
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
