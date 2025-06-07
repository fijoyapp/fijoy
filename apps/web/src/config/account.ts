import { AccountType, type AccountTypeDetail } from "@/types/account";
import { match } from "ts-pattern";

export function getAccountTypeDetail(
  accountType: AccountType,
): AccountTypeDetail {
  return match(accountType)
    .with("liquidity", () => ({
      name: "Liquidity",
      description: "Liquid assets that can be quickly converted to cash",
    }))
    .with("investment", () => ({
      name: "Investment",
      description: "Investment assets such as stocks, cryptocurrencies, etc.",
    }))
    .with("property", () => ({
      name: "Property",
      description: "Property assets such as real estate, vehicles, etc.",
    }))
    .with("receivable", () => ({
      name: "Receivable",
      description: "Assets that other people owe to you",
    }))
    .with("liability", () => ({
      name: "Liability",
      description: "Debts such as credit cards, loans, mortgages, etc.",
    }))
    .exhaustive();
}
