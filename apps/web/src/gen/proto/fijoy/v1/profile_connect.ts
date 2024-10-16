// @generated by protoc-gen-connect-es v1.6.1 with parameter "target=ts"
// @generated from file fijoy/v1/profile.proto (package fijoy.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CreateProfileRequest, Profile, UpdateProfileRequest } from "./profile_pb.js";
import { Empty, MethodIdempotency, MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service fijoy.v1.ProfileService
 */
export const ProfileService = {
  typeName: "fijoy.v1.ProfileService",
  methods: {
    /**
     * @generated from rpc fijoy.v1.ProfileService.CreateProfile
     */
    createProfile: {
      name: "CreateProfile",
      I: CreateProfileRequest,
      O: Profile,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc fijoy.v1.ProfileService.GetProfile
     */
    getProfile: {
      name: "GetProfile",
      I: Empty,
      O: Profile,
      kind: MethodKind.Unary,
      idempotency: MethodIdempotency.NoSideEffects,
    },
    /**
     * @generated from rpc fijoy.v1.ProfileService.UpdateProfile
     */
    updateProfile: {
      name: "UpdateProfile",
      I: UpdateProfileRequest,
      O: Profile,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc fijoy.v1.ProfileService.DeleteProfile
     */
    deleteProfile: {
      name: "DeleteProfile",
      I: Empty,
      O: Empty,
      kind: MethodKind.Unary,
    },
  }
} as const;

