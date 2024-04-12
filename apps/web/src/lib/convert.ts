import { AccountType } from "@/gen/proto/fijoy/v1/account_pb";
import { AccountTypeEnum } from "@/types/accounts";

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
