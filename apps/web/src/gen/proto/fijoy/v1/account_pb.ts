// @generated by protoc-gen-es v2.2.2 with parameter "target=ts"
// @generated from file fijoy/v1/account.proto (package fijoy.v1, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import { file_buf_validate_validate } from "../../buf/validate/validate_pb";
import type { EmptySchema, Timestamp } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_empty, file_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file fijoy/v1/account.proto.
 */
export const file_fijoy_v1_account: GenFile = /*@__PURE__*/
  fileDesc("ChZmaWpveS92MS9hY2NvdW50LnByb3RvEghmaWpveS52MSKdAwoHQWNjb3VudBITCgJpZBgBIAEoCUIHukgEcgIQARIVCgRuYW1lGAIgASgJQge6SARyAhABEjMKDGFjY291bnRfdHlwZRgDIAEoDjIVLmZpam95LnYxLkFjY291bnRUeXBlQga6SAPIAQESFQoIYXJjaGl2ZWQYBCABKAhCA7pIABIXCgZzeW1ib2wYBSABKAlCB7pIBHICEAESOAoLc3ltYm9sX3R5cGUYBiABKA4yGy5maWpveS52MS5BY2NvdW50U3ltYm9sVHlwZUIGukgDyAEBEhYKBmFtb3VudBgHIAEoCUIGukgDyAEBEhUKBXZhbHVlGAggASgJQga6SAPIAQESDwoHZnhfcmF0ZRgJIAEoCRIXCgdiYWxhbmNlGAogASgJQga6SAPIAQESNgoKY3JlYXRlZF9hdBgLIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXBCBrpIA8gBARI2Cgp1cGRhdGVkX2F0GAwgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcEIGukgDyAEBIjcKC0FjY291bnRMaXN0EigKBWl0ZW1zGAEgAygLMhEuZmlqb3kudjEuQWNjb3VudEIGukgDyAEBIrUBChRDcmVhdGVBY2NvdW50UmVxdWVzdBIVCgRuYW1lGAEgASgJQge6SARyAhABEjMKDGFjY291bnRfdHlwZRgCIAEoDjIVLmZpam95LnYxLkFjY291bnRUeXBlQga6SAPIAQESFwoGc3ltYm9sGAMgASgJQge6SARyAhABEjgKC3N5bWJvbF90eXBlGAQgASgOMhsuZmlqb3kudjEuQWNjb3VudFN5bWJvbFR5cGVCBrpIA8gBASJrChRVcGRhdGVBY2NvdW50UmVxdWVzdBITCgJpZBgBIAEoCUIHukgEcgIQARIRCgRuYW1lGAIgASgJSACIAQESFQoIYXJjaGl2ZWQYAyABKAhIAYgBAUIHCgVfbmFtZUILCglfYXJjaGl2ZWQiKAoRR2V0QWNjb3VudFJlcXVlc3QSEwoCaWQYASABKAlCB7pIBHICEAEquAEKC0FjY291bnRUeXBlEhwKGEFDQ09VTlRfVFlQRV9VTlNQRUNJRklFRBAAEhoKFkFDQ09VTlRfVFlQRV9MSVFVSURJVFkQARIbChdBQ0NPVU5UX1RZUEVfSU5WRVNUTUVOVBACEhkKFUFDQ09VTlRfVFlQRV9QUk9QRVJUWRADEhsKF0FDQ09VTlRfVFlQRV9SRUNFSVZBQkxFEAQSGgoWQUNDT1VOVF9UWVBFX0xJQUJJTElUWRAFKpkBChFBY2NvdW50U3ltYm9sVHlwZRIjCh9BQ0NPVU5UX1NZTUJPTF9UWVBFX1VOU1BFQ0lGSUVEEAASIAocQUNDT1VOVF9TWU1CT0xfVFlQRV9DVVJSRU5DWRABEh4KGkFDQ09VTlRfU1lNQk9MX1RZUEVfQ1JZUFRPEAISHQoZQUNDT1VOVF9TWU1CT0xfVFlQRV9TVE9DSxADMp4CCg5BY2NvdW50U2VydmljZRJCCg1DcmVhdGVBY2NvdW50Eh4uZmlqb3kudjEuQ3JlYXRlQWNjb3VudFJlcXVlc3QaES5maWpveS52MS5BY2NvdW50EkEKC0dldEFjY291bnRzEhYuZ29vZ2xlLnByb3RvYnVmLkVtcHR5GhUuZmlqb3kudjEuQWNjb3VudExpc3QiA5ACARJBCgpHZXRBY2NvdW50EhsuZmlqb3kudjEuR2V0QWNjb3VudFJlcXVlc3QaES5maWpveS52MS5BY2NvdW50IgOQAgESQgoNVXBkYXRlQWNjb3VudBIeLmZpam95LnYxLlVwZGF0ZUFjY291bnRSZXF1ZXN0GhEuZmlqb3kudjEuQWNjb3VudEJ7Cgxjb20uZmlqb3kudjFCDEFjY291bnRQcm90b1ABWhxmaWpveS9wcm90by9maWpveS92MTtmaWpveXYxogIDRlhYqgIIRmlqb3kuVjHKAghGaWpveVxWMeICFEZpam95XFYxXEdQQk1ldGFkYXRh6gIJRmlqb3k6OlYxYgZwcm90bzM", [file_buf_validate_validate, file_google_protobuf_empty, file_google_protobuf_timestamp]);

/**
 * @generated from message fijoy.v1.Account
 */
export type Account = Message<"fijoy.v1.Account"> & {
  /**
   * the standard stuff
   *
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string name = 2;
   */
  name: string;

  /**
   * @generated from field: fijoy.v1.AccountType account_type = 3;
   */
  accountType: AccountType;

  /**
   * @generated from field: bool archived = 4;
   */
  archived: boolean;

  /**
   * @generated from field: string symbol = 5;
   */
  symbol: string;

  /**
   * @generated from field: fijoy.v1.AccountSymbolType symbol_type = 6;
   */
  symbolType: AccountSymbolType;

  /**
   * @generated from field: string amount = 7;
   */
  amount: string;

  /**
   * @generated from field: string value = 8;
   */
  value: string;

  /**
   * @generated from field: string fx_rate = 9;
   */
  fxRate: string;

  /**
   * @generated from field: string balance = 10;
   */
  balance: string;

  /**
   * @generated from field: google.protobuf.Timestamp created_at = 11;
   */
  createdAt?: Timestamp;

  /**
   * @generated from field: google.protobuf.Timestamp updated_at = 12;
   */
  updatedAt?: Timestamp;
};

/**
 * Describes the message fijoy.v1.Account.
 * Use `create(AccountSchema)` to create a new message.
 */
export const AccountSchema: GenMessage<Account> = /*@__PURE__*/
  messageDesc(file_fijoy_v1_account, 0);

/**
 * @generated from message fijoy.v1.AccountList
 */
export type AccountList = Message<"fijoy.v1.AccountList"> & {
  /**
   * @generated from field: repeated fijoy.v1.Account items = 1;
   */
  items: Account[];
};

/**
 * Describes the message fijoy.v1.AccountList.
 * Use `create(AccountListSchema)` to create a new message.
 */
export const AccountListSchema: GenMessage<AccountList> = /*@__PURE__*/
  messageDesc(file_fijoy_v1_account, 1);

/**
 * @generated from message fijoy.v1.CreateAccountRequest
 */
export type CreateAccountRequest = Message<"fijoy.v1.CreateAccountRequest"> & {
  /**
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * @generated from field: fijoy.v1.AccountType account_type = 2;
   */
  accountType: AccountType;

  /**
   * @generated from field: string symbol = 3;
   */
  symbol: string;

  /**
   * @generated from field: fijoy.v1.AccountSymbolType symbol_type = 4;
   */
  symbolType: AccountSymbolType;
};

/**
 * Describes the message fijoy.v1.CreateAccountRequest.
 * Use `create(CreateAccountRequestSchema)` to create a new message.
 */
export const CreateAccountRequestSchema: GenMessage<CreateAccountRequest> = /*@__PURE__*/
  messageDesc(file_fijoy_v1_account, 2);

/**
 * @generated from message fijoy.v1.UpdateAccountRequest
 */
export type UpdateAccountRequest = Message<"fijoy.v1.UpdateAccountRequest"> & {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: optional string name = 2;
   */
  name?: string;

  /**
   * @generated from field: optional bool archived = 3;
   */
  archived?: boolean;
};

/**
 * Describes the message fijoy.v1.UpdateAccountRequest.
 * Use `create(UpdateAccountRequestSchema)` to create a new message.
 */
export const UpdateAccountRequestSchema: GenMessage<UpdateAccountRequest> = /*@__PURE__*/
  messageDesc(file_fijoy_v1_account, 3);

/**
 * @generated from message fijoy.v1.GetAccountRequest
 */
export type GetAccountRequest = Message<"fijoy.v1.GetAccountRequest"> & {
  /**
   * @generated from field: string id = 1;
   */
  id: string;
};

/**
 * Describes the message fijoy.v1.GetAccountRequest.
 * Use `create(GetAccountRequestSchema)` to create a new message.
 */
export const GetAccountRequestSchema: GenMessage<GetAccountRequest> = /*@__PURE__*/
  messageDesc(file_fijoy_v1_account, 4);

/**
 * @generated from enum fijoy.v1.AccountType
 */
export enum AccountType {
  /**
   * @generated from enum value: ACCOUNT_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: ACCOUNT_TYPE_LIQUIDITY = 1;
   */
  LIQUIDITY = 1,

  /**
   * @generated from enum value: ACCOUNT_TYPE_INVESTMENT = 2;
   */
  INVESTMENT = 2,

  /**
   * @generated from enum value: ACCOUNT_TYPE_PROPERTY = 3;
   */
  PROPERTY = 3,

  /**
   * @generated from enum value: ACCOUNT_TYPE_RECEIVABLE = 4;
   */
  RECEIVABLE = 4,

  /**
   * @generated from enum value: ACCOUNT_TYPE_LIABILITY = 5;
   */
  LIABILITY = 5,
}

/**
 * Describes the enum fijoy.v1.AccountType.
 */
export const AccountTypeSchema: GenEnum<AccountType> = /*@__PURE__*/
  enumDesc(file_fijoy_v1_account, 0);

/**
 * @generated from enum fijoy.v1.AccountSymbolType
 */
export enum AccountSymbolType {
  /**
   * @generated from enum value: ACCOUNT_SYMBOL_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: ACCOUNT_SYMBOL_TYPE_CURRENCY = 1;
   */
  CURRENCY = 1,

  /**
   * @generated from enum value: ACCOUNT_SYMBOL_TYPE_CRYPTO = 2;
   */
  CRYPTO = 2,

  /**
   * @generated from enum value: ACCOUNT_SYMBOL_TYPE_STOCK = 3;
   */
  STOCK = 3,
}

/**
 * Describes the enum fijoy.v1.AccountSymbolType.
 */
export const AccountSymbolTypeSchema: GenEnum<AccountSymbolType> = /*@__PURE__*/
  enumDesc(file_fijoy_v1_account, 1);

/**
 * @generated from service fijoy.v1.AccountService
 */
export const AccountService: GenService<{
  /**
   * @generated from rpc fijoy.v1.AccountService.CreateAccount
   */
  createAccount: {
    methodKind: "unary";
    input: typeof CreateAccountRequestSchema;
    output: typeof AccountSchema;
  },
  /**
   * @generated from rpc fijoy.v1.AccountService.GetAccounts
   */
  getAccounts: {
    methodKind: "unary";
    input: typeof EmptySchema;
    output: typeof AccountListSchema;
  },
  /**
   * @generated from rpc fijoy.v1.AccountService.GetAccount
   */
  getAccount: {
    methodKind: "unary";
    input: typeof GetAccountRequestSchema;
    output: typeof AccountSchema;
  },
  /**
   * @generated from rpc fijoy.v1.AccountService.UpdateAccount
   */
  updateAccount: {
    methodKind: "unary";
    input: typeof UpdateAccountRequestSchema;
    output: typeof AccountSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_fijoy_v1_account, 0);

