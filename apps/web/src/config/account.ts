import { AccountType } from "@/gen/proto/fijoy/v1/account_pb";

type AccountTypeConfig = {
  isDebt: boolean;
  name: string;
  description: string;
};

export const accountTypeConfigMap: Record<
  Exclude<AccountType, AccountType.UNSPECIFIED>,
  AccountTypeConfig
> = {
  [AccountType.CASH]: {
    isDebt: false,
    name: "Cash",
    description: "Holds liquid funds for immediate use.",
  },
  [AccountType.DEBT]: {
    isDebt: true,
    name: "Debt",
    description: "Represents money owed, such as loans or credit balances.",
  },
  [AccountType.INVESTMENT]: {
    isDebt: false,
    name: "Investment",
    description:
      "Used for buying and selling securities like stocks and bonds.",
  },
  [AccountType.OTHER_ASSET]: {
    isDebt: false,
    name: "Other Asset",
    description:
      "Includes valuable possessions like real estate, vehicles, or collectibles.",
  },
};
