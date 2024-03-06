// @generated by protoc-gen-es v1.7.2 with parameter "target=ts"
// @generated from file fijoy/v1/transaction.proto (package fijoy.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum fijoy.v1.TransactionType
 */
export enum TransactionType {
  /**
   * @generated from enum value: TRANSACTION_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: TRANSACTION_TYPE_EXPENSE = 1;
   */
  EXPENSE = 1,

  /**
   * @generated from enum value: TRANSACTION_TYPE_INCOME = 2;
   */
  INCOME = 2,

  /**
   * @generated from enum value: TRANSACTION_TYPE_TRANSFER = 3;
   */
  TRANSFER = 3,
}
// Retrieve enum metadata with: proto3.getEnumType(TransactionType)
proto3.util.setEnumType(TransactionType, "fijoy.v1.TransactionType", [
  { no: 0, name: "TRANSACTION_TYPE_UNSPECIFIED" },
  { no: 1, name: "TRANSACTION_TYPE_EXPENSE" },
  { no: 2, name: "TRANSACTION_TYPE_INCOME" },
  { no: 3, name: "TRANSACTION_TYPE_TRANSFER" },
]);
