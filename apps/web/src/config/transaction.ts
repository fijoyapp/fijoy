import { TransactionType } from "@/gen/proto/fijoy/v1/transaction_pb";

type TransactionTypeConfig = {
  name: string;
};

export const transactionTypeConfigMap: Record<
  Exclude<TransactionType, TransactionType.UNSPECIFIED>,
  TransactionTypeConfig
> = {
  [TransactionType.ADJUSTMENT]: {
    name: "Adjustment",
  },
  [TransactionType.INCOME]: {
    name: "Income",
  },
  [TransactionType.EXPENSE]: {
    name: "Expense",
  },
  [TransactionType.TRANSFER]: {
    name: "Transfer",
  },
};
