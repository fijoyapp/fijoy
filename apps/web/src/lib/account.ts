import { Accounts, AccountType } from "@/gen/proto/fijoy/v1/account_pb";
import { Timestamp } from "@bufbuild/protobuf";
import currency from "currency.js";

export function accountsGroupBy(accounts: Accounts) {
  const liquidities = accounts.accounts.filter(
    (account) => account.accountType === AccountType.LIQUIDITY,
  );

  const investments = accounts.accounts.filter(
    (account) => account.accountType === AccountType.INVESTMENT,
  );

  const properties = accounts.accounts.filter(
    (account) => account.accountType === AccountType.PROPERTY,
  );

  const receivables = accounts.accounts.filter(
    (account) => account.accountType === AccountType.RECEIVABLE,
  );

  const liabilities = accounts.accounts.filter(
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

export function getOverallStats(accounts: Accounts) {
  const asset = accounts.accounts.reduce((acc, account) => {
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

  const liability = accounts.accounts.reduce((acc, account) => {
    if (account.accountType === AccountType.LIABILITY) {
      return acc.add(currency(account.balance));
    }
    return acc;
  }, currency(0));

  const netWorth = asset.subtract(liability);

  const lastUpdatedTimestamp = accounts.accounts.reduce((acc, account) => {
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
