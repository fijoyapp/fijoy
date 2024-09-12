// @generated by protoc-gen-connect-es v1.5.0 with parameter "target=ts"
// @generated from file fijoy/v1/transaction.proto (package fijoy.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CreateTransactionRequest, CreateTransactionsRequest, DeleteTransactionByIdRequest, GetTransactionByIdRequest, GetTransactionsByAccountIdRequest, Transaction, Transactions } from "./transaction_pb.js";
import { Empty, MethodIdempotency, MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service fijoy.v1.TransactionService
 */
export const TransactionService = {
  typeName: "fijoy.v1.TransactionService",
  methods: {
    /**
     * @generated from rpc fijoy.v1.TransactionService.CreateTransaction
     */
    createTransaction: {
      name: "CreateTransaction",
      I: CreateTransactionRequest,
      O: Transaction,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc fijoy.v1.TransactionService.CreateTransactions
     */
    createTransactions: {
      name: "CreateTransactions",
      I: CreateTransactionsRequest,
      O: Transactions,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc fijoy.v1.TransactionService.GetTransactionById
     */
    getTransactionById: {
      name: "GetTransactionById",
      I: GetTransactionByIdRequest,
      O: Transaction,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.NoSideEffects,
    },
    /**
     * @generated from rpc fijoy.v1.TransactionService.GetTransactionsByAccountId
     */
    getTransactionsByAccountId: {
      name: "GetTransactionsByAccountId",
      I: GetTransactionsByAccountIdRequest,
      O: Transactions,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.NoSideEffects,
    },
    /**
     * @generated from rpc fijoy.v1.TransactionService.GetTransactions
     */
    getTransactions: {
      name: "GetTransactions",
      I: Empty,
      O: Transactions,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.NoSideEffects,
    },
    /**
     * @generated from rpc fijoy.v1.TransactionService.DeleteTransactionById
     */
    deleteTransactionById: {
      name: "DeleteTransactionById",
      I: DeleteTransactionByIdRequest,
      O: Empty,
      kind: MethodKind.Unary,
    },
  }
} as const;

