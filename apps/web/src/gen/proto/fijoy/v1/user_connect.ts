// @generated by protoc-gen-connect-es v1.5.0 with parameter "target=ts"
// @generated from file fijoy/v1/user.proto (package fijoy.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Empty, MethodIdempotency, MethodKind } from "@bufbuild/protobuf";
import { User } from "./user_pb.js";

/**
 * @generated from service fijoy.v1.UserService
 */
export const UserService = {
  typeName: "fijoy.v1.UserService",
  methods: {
    /**
     * @generated from rpc fijoy.v1.UserService.GetUser
     */
    getUser: {
      name: "GetUser",
      I: Empty,
      O: User,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.NoSideEffects,
    },
  }
} as const;

