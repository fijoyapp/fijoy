import { Account, AccountType } from "@/gen/proto/fijoy/v1/account_pb";
import { Timestamp } from "@bufbuild/protobuf";
import currency from "currency.js";

export function accountsGroupBy(accounts: Account[]) {
  const liquidities = accounts.filter(
    (account) => account.accountType === AccountType.LIQUIDITY,
  );

  const investments = accounts.filter(
    (account) => account.accountType === AccountType.INVESTMENT,
  );

  const properties = accounts.filter(
    (account) => account.accountType === AccountType.PROPERTY,
  );

  const receivables = accounts.filter(
    (account) => account.accountType === AccountType.RECEIVABLE,
  );

  const liabilities = accounts.filter(
    (account) => account.accountType === AccountType.LIABILITY,
  );

  return {
    liquidities,
    investments,
    properties,
    receivables,
    liabilities,
  };
}

export function getOverallStats(accounts: Account[]) {
  accounts = accounts.filter((account) => account.includeInStats);
  const asset = accounts.reduce((acc, account) => {
    if (
      account.accountType === AccountType.LIQUIDITY ||
      account.accountType === AccountType.INVESTMENT ||
      account.accountType === AccountType.PROPERTY ||
      account.accountType === AccountType.RECEIVABLE
    ) {
      return acc.add(currency(account.balance));
    }
    return acc;
  }, currency(0));

  const liability = accounts.reduce((acc, account) => {
    if (account.accountType === AccountType.LIABILITY) {
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
  }, new Timestamp());

  return {
    asset,
    liability,
    netWorth,
    lastUpdatedTimestamp,
  };
}
