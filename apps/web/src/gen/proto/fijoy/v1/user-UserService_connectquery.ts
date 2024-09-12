// @generated by protoc-gen-connect-query v1.4.2 with parameter "target=ts"
// @generated from file fijoy/v1/user.proto (package fijoy.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Empty, MethodIdempotency, MethodKind } from "@bufbuild/protobuf";
import { User } from "./user_pb.js";

/**
 * @generated from rpc fijoy.v1.UserService.GetUser
 */
export const getUser = {
  localName: "getUser",
  name: "GetUser",
  kind: MethodKind.Unary,
  I: Empty,
  O: User,
      idempotency: MethodIdempotency.NoSideEffects,
  service: {
    typeName: "fijoy.v1.UserService"
  }
} as const;
