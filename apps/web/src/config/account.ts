import { AccountType } from "@/gen/proto/fijoy/v1/account_pb";
import { AccountTypeDetail } from "@/types/account";
import { match } from "ts-pattern";

export function getAccountTypeDetail(
  accountType: AccountType,
): AccountTypeDetail {
  return match(accountType)
    .with(AccountType.UNSPECIFIED as 0, () => ({
      name: "Unspecified",
      description: "Unspecified",
    }))
    .with(AccountType.LIQUIDITY as 1, () => ({
      name: "Liquidity",
      description: "Liquid assets that can be quickly converted to cash",
    }))
    .with(AccountType.INVESTMENT as 2, () => ({
      name: "Investment",
      description: "Investment assets such as stocks, cryptocurrencies, etc.",
    }))
    .with(AccountType.PROPERTY as 3, () => ({
      name: "Property",
      description: "Property assets such as real estate, vehicles, etc.",
    }))
    .with(AccountType.RECEIVABLE as 4, () => ({
      name: "Receivable",
      description: "Assets that other people owe to you",
    }))
    .with(AccountType.LIABILITY as 5, () => ({
      name: "Liability",
      description: "Debts such as loans, mortgages, etc.",
    }))
    .exhaustive();
}
