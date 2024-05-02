import { AccountType } from "@/gen/proto/fijoy/v1/account_pb";
import { TransactionType } from "@/gen/proto/fijoy/v1/transaction_pb";
import { AccountTypeEnum } from "@/types/account";
import { TransactionTypeEnum } from "@/types/transaction";

export function tsAccountTypeToProto(
  accountType: AccountTypeEnum,
): AccountType {
  switch (accountType) {
    case "cash":
      return AccountType.CASH;
    case "debt":
      return AccountType.DEBT;
    case "investment":
      return AccountType.INVESTMENT;
    case "other_asset":
      return AccountType.OTHER_ASSET;
  }
}

export function tsTransactionTypeToProto(
  transactionType: TransactionTypeEnum,
): TransactionType {
  switch (transactionType) {
    case "expense":
      return TransactionType.EXPENSE;
    case "income":
      return TransactionType.INCOME;
    case "transfer":
      return TransactionType.TRANSFER;
  }
}
