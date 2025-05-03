import { accountsFragment$data } from "@/routes/_protected/_profile/accounts/__generated__/accountsFragment.graphql";
import currency from "currency.js";
import _ from "lodash";

export function accountsGroupBy(accounts: accountsFragment$data) {
  const groups = _.groupBy(accounts, (account) => account.accountType);

  return {
    liquidities: groups["liquidity"] || [],
    investments: groups["investment"] || [],
    properties: groups["property"] || [],
    receivables: groups["receivable"] || [],
    liabilities: groups["liability"] || [],
  };
}

export const POSITIVE_ACCOUNT_TYPES = [
  "liquidity",
  "investment",
  "property",
  "receivable",
];
export const NEGATIVE_ACCOUNT_TYPES = ["liability"];

export function getOverallStats(accounts: accountsFragment$data) {
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
