// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file fijoy/v1/transaction.proto (package fijoy.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

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
   * @generated from field: string amount = 3;
   */
  amount = "";

  /**
   * @generated from field: string amount_delta = 4;
   */
  amountDelta = "";

  /**
   * @generated from field: string value = 5;
   */
  value = "";

  /**
   * @generated from field: string fx_rate = 6;
   */
  fxRate = "";

  /**
   * @generated from field: string balance = 7;
   */
  balance = "";

  /**
   * @generated from field: string balance_delta = 8;
   */
  balanceDelta = "";

  /**
   * @generated from field: string note = 9;
   */
  note = "";

  /**
   * @generated from field: google.protobuf.Timestamp created_at = 10;
   */
  createdAt?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp updated_at = 11;
   */
  updatedAt?: Timestamp;

  constructor(data?: PartialMessage<Transaction>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.Transaction";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "amount", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "amount_delta", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "fx_rate", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "balance", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "balance_delta", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 9, name: "note", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 10, name: "created_at", kind: "message", T: Timestamp },
    { no: 11, name: "updated_at", kind: "message", T: Timestamp },
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
 * @generated from message fijoy.v1.TransactionList
 */
export class TransactionList extends Message<TransactionList> {
  /**
   * @generated from field: repeated fijoy.v1.Transaction items = 1;
   */
  items: Transaction[] = [];

  constructor(data?: PartialMessage<TransactionList>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.TransactionList";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "items", kind: "message", T: Transaction, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TransactionList {
    return new TransactionList().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TransactionList {
    return new TransactionList().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TransactionList {
    return new TransactionList().fromJsonString(jsonString, options);
  }

  static equals(a: TransactionList | PlainMessage<TransactionList> | undefined, b: TransactionList | PlainMessage<TransactionList> | undefined): boolean {
    return proto3.util.equals(TransactionList, a, b);
  }
}

/**
 * @generated from message fijoy.v1.CreateTransactionRequest
 */
export class CreateTransactionRequest extends Message<CreateTransactionRequest> {
  /**
   * @generated from field: string account_id = 1;
   */
  accountId = "";

  /**
   * @generated from field: string amount_delta = 2;
   */
  amountDelta = "";

  /**
   * @generated from field: string value = 3;
   */
  value = "";

  /**
   * @generated from field: string fx_rate = 4;
   */
  fxRate = "";

  /**
   * @generated from field: string note = 5;
   */
  note = "";

  constructor(data?: PartialMessage<CreateTransactionRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.CreateTransactionRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "amount_delta", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "fx_rate", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "note", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateTransactionRequest {
    return new CreateTransactionRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateTransactionRequest {
    return new CreateTransactionRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateTransactionRequest {
    return new CreateTransactionRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateTransactionRequest | PlainMessage<CreateTransactionRequest> | undefined, b: CreateTransactionRequest | PlainMessage<CreateTransactionRequest> | undefined): boolean {
    return proto3.util.equals(CreateTransactionRequest, a, b);
  }
}

/**
 * @generated from message fijoy.v1.GetTransactionRequest
 */
export class GetTransactionRequest extends Message<GetTransactionRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<GetTransactionRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.GetTransactionRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetTransactionRequest {
    return new GetTransactionRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetTransactionRequest {
    return new GetTransactionRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetTransactionRequest {
    return new GetTransactionRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetTransactionRequest | PlainMessage<GetTransactionRequest> | undefined, b: GetTransactionRequest | PlainMessage<GetTransactionRequest> | undefined): boolean {
    return proto3.util.equals(GetTransactionRequest, a, b);
  }
}

/**
 * @generated from message fijoy.v1.GetTransactionsRequest
 */
export class GetTransactionsRequest extends Message<GetTransactionsRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<GetTransactionsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.GetTransactionsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetTransactionsRequest {
    return new GetTransactionsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetTransactionsRequest {
    return new GetTransactionsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetTransactionsRequest {
    return new GetTransactionsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetTransactionsRequest | PlainMessage<GetTransactionsRequest> | undefined, b: GetTransactionsRequest | PlainMessage<GetTransactionsRequest> | undefined): boolean {
    return proto3.util.equals(GetTransactionsRequest, a, b);
  }
}

/**
 * @generated from message fijoy.v1.GetTransactionsByAccountRequest
 */
export class GetTransactionsByAccountRequest extends Message<GetTransactionsByAccountRequest> {
  /**
   * @generated from field: string account_id = 1;
   */
  accountId = "";

  constructor(data?: PartialMessage<GetTransactionsByAccountRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.GetTransactionsByAccountRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "account_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetTransactionsByAccountRequest {
    return new GetTransactionsByAccountRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetTransactionsByAccountRequest {
    return new GetTransactionsByAccountRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetTransactionsByAccountRequest {
    return new GetTransactionsByAccountRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetTransactionsByAccountRequest | PlainMessage<GetTransactionsByAccountRequest> | undefined, b: GetTransactionsByAccountRequest | PlainMessage<GetTransactionsByAccountRequest> | undefined): boolean {
    return proto3.util.equals(GetTransactionsByAccountRequest, a, b);
  }
}

/**
 * @generated from message fijoy.v1.UpdateTransactionRequest
 */
export class UpdateTransactionRequest extends Message<UpdateTransactionRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: optional string amount_delta = 2;
   */
  amountDelta?: string;

  /**
   * @generated from field: optional string value = 3;
   */
  value?: string;

  /**
   * @generated from field: optional string fx_rate = 4;
   */
  fxRate?: string;

  /**
   * @generated from field: optional string note = 5;
   */
  note?: string;

  constructor(data?: PartialMessage<UpdateTransactionRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.UpdateTransactionRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "amount_delta", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 3, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 4, name: "fx_rate", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 5, name: "note", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateTransactionRequest {
    return new UpdateTransactionRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateTransactionRequest {
    return new UpdateTransactionRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateTransactionRequest {
    return new UpdateTransactionRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateTransactionRequest | PlainMessage<UpdateTransactionRequest> | undefined, b: UpdateTransactionRequest | PlainMessage<UpdateTransactionRequest> | undefined): boolean {
    return proto3.util.equals(UpdateTransactionRequest, a, b);
  }
}

/**
 * @generated from message fijoy.v1.DeleteTransactionRequest
 */
export class DeleteTransactionRequest extends Message<DeleteTransactionRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<DeleteTransactionRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.DeleteTransactionRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteTransactionRequest {
    return new DeleteTransactionRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteTransactionRequest {
    return new DeleteTransactionRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteTransactionRequest {
    return new DeleteTransactionRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteTransactionRequest | PlainMessage<DeleteTransactionRequest> | undefined, b: DeleteTransactionRequest | PlainMessage<DeleteTransactionRequest> | undefined): boolean {
    return proto3.util.equals(DeleteTransactionRequest, a, b);
  }
}

