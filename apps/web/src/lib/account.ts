import type { AccountAccountType } from "@/routes/_protected/_profile/-components/accounts/__generated__/cardFragment.graphql";
import currency from "currency.js";
import _ from "lodash";
import invariant from "tiny-invariant";

export type GroupedAccounts = ReadonlyArray<
  | {
      readonly node:
        | {
            readonly accountType: AccountAccountType;
            readonly balance: string;
            readonly id: string;
          }
        | null
        | undefined;
    }
  | null
  | undefined
>;

export function accountsGroupBy(
  accounts: GroupedAccounts,
  // eslint-disable-next-line relay/no-future-added-value
): Record<Exclude<AccountAccountType, "%future added value">, GroupedAccounts> {
  const groups = _.groupBy(accounts, (account) => account!.node!.accountType);

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

export function getOverallStats(accounts: GroupedAccounts) {
  invariant(accounts);

  const asset = accounts.reduce((acc, account) => {
    invariant(account && account.node);

    if (POSITIVE_ACCOUNT_TYPES.includes(account.node.accountType)) {
      return acc.add(currency(account.node.balance));
    }
    return acc;
  }, currency(0));

  const liability = accounts.reduce((acc, account) => {
    invariant(account && account.node);

    if (NEGATIVE_ACCOUNT_TYPES.includes(account.node.accountType)) {
      return acc.add(currency(account.node.balance));
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
