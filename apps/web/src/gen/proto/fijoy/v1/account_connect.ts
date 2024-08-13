// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts"
// @generated from file fijoy/v1/account.proto (package fijoy.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Account, Accounts, CreateAccountRequest, GetAccountByIdRequest } from "./account_pb.js";
import { Empty, MethodIdempotency, MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service fijoy.v1.AccountService
 */
export const AccountService = {
  typeName: "fijoy.v1.AccountService",
  methods: {
    /**
     * @generated from rpc fijoy.v1.AccountService.CreateAccount
     */
    createAccount: {
      name: "CreateAccount",
      I: CreateAccountRequest,
      O: Account,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc fijoy.v1.AccountService.GetAccounts
     */
    getAccounts: {
      name: "GetAccounts",
      I: Empty,
      O: Accounts,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.NoSideEffects,
    },
    /**
     * @generated from rpc fijoy.v1.AccountService.GetAccountById
     */
    getAccountById: {
      name: "GetAccountById",
      I: GetAccountByIdRequest,
      O: Account,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.NoSideEffects,
    },
  }
} as const;

