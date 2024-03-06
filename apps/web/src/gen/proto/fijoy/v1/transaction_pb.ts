// @generated by protoc-gen-es v1.7.2 with parameter "target=ts"
// @generated from file fijoy/v1/transaction.proto (package fijoy.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";
import { Money } from "./money_pb.js";

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

  /**
   * @generated from enum value: TRANSACTION_TYPE_ADJUSTMENT = 4;
   */
  ADJUSTMENT = 4,
}
// Retrieve enum metadata with: proto3.getEnumType(TransactionType)
proto3.util.setEnumType(TransactionType, "fijoy.v1.TransactionType", [
  { no: 0, name: "TRANSACTION_TYPE_UNSPECIFIED" },
  { no: 1, name: "TRANSACTION_TYPE_EXPENSE" },
  { no: 2, name: "TRANSACTION_TYPE_INCOME" },
  { no: 3, name: "TRANSACTION_TYPE_TRANSFER" },
  { no: 4, name: "TRANSACTION_TYPE_ADJUSTMENT" },
]);

/**
 * @generated from message fijoy.v1.Transaction
 */
export class Transaction extends Message<Transaction> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string account_id = 2;
   */
  accountId = "";

  /**
   * @generated from field: string user_id = 3;
   */
  userId = "";

  /**
   * @generated from field: string workspace_id = 4;
   */
  workspaceId = "";

  /**
   * @generated from field: fijoy.v1.TransactionType transaction_type = 5;
   */
  transactionType = TransactionType.UNSPECIFIED;

  /**
   * @generated from field: fijoy.v1.Money amount = 6;
   */
  amount?: Money;

  /**
   * @generated from field: string currency = 7;
   */
  currency = "";

  /**
   * @generated from field: google.protobuf.Timestamp datetime = 8;
   */
  datetime?: Timestamp;

  /**
   * @generated from field: optional string category_id = 9;
   */
  categoryId?: string;

  /**
   * @generated from field: optional string entity = 10;
   */
  entity?: string;

  /**
   * @generated from field: optional string note = 11;
   */
  note?: string;

  constructor(data?: PartialMessage<Transaction>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.Transaction";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "user_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "workspace_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "transaction_type", kind: "enum", T: proto3.getEnumType(TransactionType) },
    { no: 6, name: "amount", kind: "message", T: Money },
    { no: 7, name: "currency", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "datetime", kind: "message", T: Timestamp },
    { no: 9, name: "category_id", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 10, name: "entity", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 11, name: "note", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Transaction {
    return new Transaction().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Transaction {
    return new Transaction().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Transaction {
    return new Transaction().fromJsonString(jsonString, options);
  }

  static equals(a: Transaction | PlainMessage<Transaction> | undefined, b: Transaction | PlainMessage<Transaction> | undefined): boolean {
    return proto3.util.equals(Transaction, a, b);
  }
}

/**
 * @generated from message fijoy.v1.Transactions
 */
export class Transactions extends Message<Transactions> {
  /**
   * @generated from field: repeated fijoy.v1.Transaction transactions = 1;
   */
  transactions: Transaction[] = [];

  constructor(data?: PartialMessage<Transactions>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.Transactions";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "transactions", kind: "message", T: Transaction, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Transactions {
    return new Transactions().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Transactions {
    return new Transactions().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Transactions {
    return new Transactions().fromJsonString(jsonString, options);
  }

  static equals(a: Transactions | PlainMessage<Transactions> | undefined, b: Transactions | PlainMessage<Transactions> | undefined): boolean {
    return proto3.util.equals(Transactions, a, b);
  }
}

/**
 * @generated from message fijoy.v1.CreateIncomeTransactionRequest
 */
export class CreateIncomeTransactionRequest extends Message<CreateIncomeTransactionRequest> {
  /**
   * @generated from field: string account_id = 1;
   */
  accountId = "";

  /**
   * @generated from field: fijoy.v1.Money amount = 2;
   */
  amount?: Money;

  /**
   * @generated from field: google.protobuf.Timestamp datetime = 3;
   */
  datetime?: Timestamp;

  /**
   * @generated from field: optional string category_id = 4;
   */
  categoryId?: string;

  /**
   * @generated from field: optional string entity = 5;
   */
  entity?: string;

  /**
   * @generated from field: optional string note = 6;
   */
  note?: string;

  constructor(data?: PartialMessage<CreateIncomeTransactionRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.CreateIncomeTransactionRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "amount", kind: "message", T: Money },
    { no: 3, name: "datetime", kind: "message", T: Timestamp },
    { no: 4, name: "category_id", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 5, name: "entity", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 6, name: "note", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateIncomeTransactionRequest {
    return new CreateIncomeTransactionRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateIncomeTransactionRequest {
    return new CreateIncomeTransactionRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateIncomeTransactionRequest {
    return new CreateIncomeTransactionRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateIncomeTransactionRequest | PlainMessage<CreateIncomeTransactionRequest> | undefined, b: CreateIncomeTransactionRequest | PlainMessage<CreateIncomeTransactionRequest> | undefined): boolean {
    return proto3.util.equals(CreateIncomeTransactionRequest, a, b);
  }
}

/**
 * @generated from message fijoy.v1.CreateExpenseTransactionRequest
 */
export class CreateExpenseTransactionRequest extends Message<CreateExpenseTransactionRequest> {
  /**
   * @generated from field: string account_id = 1;
   */
  accountId = "";

  /**
   * @generated from field: fijoy.v1.Money amount = 2;
   */
  amount?: Money;

  /**
   * @generated from field: google.protobuf.Timestamp datetime = 3;
   */
  datetime?: Timestamp;

  /**
   * @generated from field: optional string category_id = 4;
   */
  categoryId?: string;

  /**
   * @generated from field: optional string entity = 5;
   */
  entity?: string;

  /**
   * @generated from field: optional string note = 6;
   */
  note?: string;

  constructor(data?: PartialMessage<CreateExpenseTransactionRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.CreateExpenseTransactionRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "amount", kind: "message", T: Money },
    { no: 3, name: "datetime", kind: "message", T: Timestamp },
    { no: 4, name: "category_id", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 5, name: "entity", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 6, name: "note", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateExpenseTransactionRequest {
    return new CreateExpenseTransactionRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateExpenseTransactionRequest {
    return new CreateExpenseTransactionRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateExpenseTransactionRequest {
    return new CreateExpenseTransactionRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateExpenseTransactionRequest | PlainMessage<CreateExpenseTransactionRequest> | undefined, b: CreateExpenseTransactionRequest | PlainMessage<CreateExpenseTransactionRequest> | undefined): boolean {
    return proto3.util.equals(CreateExpenseTransactionRequest, a, b);
  }
}

/**
 * @generated from message fijoy.v1.CreateTransferTransactionRequest
 */
export class CreateTransferTransactionRequest extends Message<CreateTransferTransactionRequest> {
  /**
   * @generated from field: string from_account_id = 1;
   */
  fromAccountId = "";

  /**
   * @generated from field: string to_account_id = 2;
   */
  toAccountId = "";

  /**
   * @generated from field: fijoy.v1.Money from_amount = 3;
   */
  fromAmount?: Money;

  /**
   * @generated from field: fijoy.v1.Money to_amount = 4;
   */
  toAmount?: Money;

  /**
   * @generated from field: google.protobuf.Timestamp datetime = 5;
   */
  datetime?: Timestamp;

  /**
   * @generated from field: optional string category_id = 6;
   */
  categoryId?: string;

  /**
   * @generated from field: optional string entity = 7;
   */
  entity?: string;

  /**
   * @generated from field: optional string note = 8;
   */
  note?: string;

  constructor(data?: PartialMessage<CreateTransferTransactionRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.CreateTransferTransactionRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "from_account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "to_account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "from_amount", kind: "message", T: Money },
    { no: 4, name: "to_amount", kind: "message", T: Money },
    { no: 5, name: "datetime", kind: "message", T: Timestamp },
    { no: 6, name: "category_id", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 7, name: "entity", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 8, name: "note", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateTransferTransactionRequest {
    return new CreateTransferTransactionRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateTransferTransactionRequest {
    return new CreateTransferTransactionRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateTransferTransactionRequest {
    return new CreateTransferTransactionRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateTransferTransactionRequest | PlainMessage<CreateTransferTransactionRequest> | undefined, b: CreateTransferTransactionRequest | PlainMessage<CreateTransferTransactionRequest> | undefined): boolean {
    return proto3.util.equals(CreateTransferTransactionRequest, a, b);
  }
}

/**
 * @generated from message fijoy.v1.CreateAdjustmentTransactionRequest
 */
export class CreateAdjustmentTransactionRequest extends Message<CreateAdjustmentTransactionRequest> {
  /**
   * @generated from field: string account_id = 1;
   */
  accountId = "";

  /**
   * @generated from field: fijoy.v1.Money amount = 2;
   */
  amount?: Money;

  /**
   * @generated from field: google.protobuf.Timestamp datetime = 3;
   */
  datetime?: Timestamp;

  /**
   * @generated from field: optional string category_id = 4;
   */
  categoryId?: string;

  /**
   * @generated from field: optional string entity = 5;
   */
  entity?: string;

  /**
   * @generated from field: optional string note = 6;
   */
  note?: string;

  constructor(data?: PartialMessage<CreateAdjustmentTransactionRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.CreateAdjustmentTransactionRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "amount", kind: "message", T: Money },
    { no: 3, name: "datetime", kind: "message", T: Timestamp },
    { no: 4, name: "category_id", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 5, name: "entity", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 6, name: "note", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateAdjustmentTransactionRequest {
    return new CreateAdjustmentTransactionRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateAdjustmentTransactionRequest {
    return new CreateAdjustmentTransactionRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateAdjustmentTransactionRequest {
    return new CreateAdjustmentTransactionRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateAdjustmentTransactionRequest | PlainMessage<CreateAdjustmentTransactionRequest> | undefined, b: CreateAdjustmentTransactionRequest | PlainMessage<CreateAdjustmentTransactionRequest> | undefined): boolean {
    return proto3.util.equals(CreateAdjustmentTransactionRequest, a, b);
  }
}

/**
 * @generated from message fijoy.v1.GetTransactionByIdRequest
 */
export class GetTransactionByIdRequest extends Message<GetTransactionByIdRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<GetTransactionByIdRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.GetTransactionByIdRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetTransactionByIdRequest {
    return new GetTransactionByIdRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetTransactionByIdRequest {
    return new GetTransactionByIdRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetTransactionByIdRequest {
    return new GetTransactionByIdRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetTransactionByIdRequest | PlainMessage<GetTransactionByIdRequest> | undefined, b: GetTransactionByIdRequest | PlainMessage<GetTransactionByIdRequest> | undefined): boolean {
    return proto3.util.equals(GetTransactionByIdRequest, a, b);
  }
}

/**
 * @generated from message fijoy.v1.DeleteTransactionByIdRequest
 */
export class DeleteTransactionByIdRequest extends Message<DeleteTransactionByIdRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<DeleteTransactionByIdRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.DeleteTransactionByIdRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteTransactionByIdRequest {
    return new DeleteTransactionByIdRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteTransactionByIdRequest {
    return new DeleteTransactionByIdRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteTransactionByIdRequest {
    return new DeleteTransactionByIdRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteTransactionByIdRequest | PlainMessage<DeleteTransactionByIdRequest> | undefined, b: DeleteTransactionByIdRequest | PlainMessage<DeleteTransactionByIdRequest> | undefined): boolean {
    return proto3.util.equals(DeleteTransactionByIdRequest, a, b);
  }
}

