import { Account, AccountType } from "@/gen/proto/fijoy/v1/account_pb";
import { timestampFromMs } from "@bufbuild/protobuf/wkt";
import currency from "currency.js";
import _ from "lodash";

export function accountsGroupBy(accounts: Account[]) {
  const groups = _.groupBy(accounts, (account) => account.accountType);

  return {
    liquidities: groups[AccountType.LIQUIDITY] || [],
    investments: groups[AccountType.INVESTMENT] || [],
    properties: groups[AccountType.PROPERTY] || [],
    receivables: groups[AccountType.RECEIVABLE] || [],
    liabilities: groups[AccountType.LIABILITY] || [],
  };
}

export const POSITIVE_ACCOUNT_TYPES = [
  AccountType.LIQUIDITY,
  AccountType.INVESTMENT,
  AccountType.PROPERTY,
  AccountType.RECEIVABLE,
];
export const NEGATIVE_ACCOUNT_TYPES = [AccountType.LIABILITY];

export function getOverallStats(accounts: Account[]) {
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

  const lastUpdatedTimestamp = accounts.reduce((acc, account) => {
    if (account.updatedAt) {
      if (acc.nanos < account.updatedAt.nanos) {
        return account.updatedAt;
      }
      return acc;
    }
    return acc;
  }, timestampFromMs(0));

  return {
    asset,
    liability,
    netWorth,
    lastUpdatedTimestamp,
  };
}
