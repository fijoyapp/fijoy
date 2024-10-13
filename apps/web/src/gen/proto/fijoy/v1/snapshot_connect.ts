// @generated by protoc-gen-connect-es v1.6.1 with parameter "target=ts"
// @generated from file fijoy/v1/snapshot.proto (package fijoy.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { AccountSnapshotList, GetAccountSnapshotsRequest, GetOverallSnapshotsRequest, OverallSnapshotList } from "./snapshot_pb.js";
import { MethodIdempotency, MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service fijoy.v1.SnapshotService
 */
export const SnapshotService = {
  typeName: "fijoy.v1.SnapshotService",
  methods: {
    /**
     * @generated from rpc fijoy.v1.SnapshotService.GetOverallSnapshots
     */
    getOverallSnapshots: {
      name: "GetOverallSnapshots",
      I: GetOverallSnapshotsRequest,
      O: OverallSnapshotList,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.NoSideEffects,
    },
    /**
     * @generated from rpc fijoy.v1.SnapshotService.GetAccountSnapshots
     */
    getAccountSnapshots: {
      name: "GetAccountSnapshots",
      I: GetAccountSnapshotsRequest,
      O: AccountSnapshotList,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.NoSideEffects,
    },
  }
} as const;
