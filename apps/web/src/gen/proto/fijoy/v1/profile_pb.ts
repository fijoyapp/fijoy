// @generated by protoc-gen-es v2.2.2 with parameter "target=ts"
// @generated from file fijoy/v1/profile.proto (package fijoy.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import { file_buf_validate_validate } from "../../buf/validate/validate_pb";
import type { EmptySchema, Timestamp } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_empty, file_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file fijoy/v1/profile.proto.
 */
export const file_fijoy_v1_profile: GenFile = /*@__PURE__*/
  fileDesc("ChZmaWpveS92MS9wcm9maWxlLnByb3RvEghmaWpveS52MSKwAQoHUHJvZmlsZRITCgJpZBgBIAEoCUIHukgEcgIQARIeCgpjdXJyZW5jaWVzGAIgAygJQgq6SAeSAQQIARgBEhcKBmxvY2FsZRgDIAEoCUIHukgEcgIQARIfCg5uZXRfd29ydGhfZ29hbBgEIAEoCUIHukgEcgIQARI2CgpjcmVhdGVkX2F0GAUgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcEIGukgDyAEBIlcKFENyZWF0ZVByb2ZpbGVSZXF1ZXN0Eh4KCmN1cnJlbmNpZXMYASADKAlCCrpIB5IBBAgBGAESHwoObmV0X3dvcnRoX2dvYWwYAiABKAlCB7pIBHICEAEiZAoUVXBkYXRlUHJvZmlsZVJlcXVlc3QSHAoKY3VycmVuY2llcxgBIAMoCUIIukgFkgECGAESGwoObmV0X3dvcnRoX2dvYWwYAiABKAlIAIgBAUIRCg9fbmV0X3dvcnRoX2dvYWwymQIKDlByb2ZpbGVTZXJ2aWNlEkIKDUNyZWF0ZVByb2ZpbGUSHi5maWpveS52MS5DcmVhdGVQcm9maWxlUmVxdWVzdBoRLmZpam95LnYxLlByb2ZpbGUSPAoKR2V0UHJvZmlsZRIWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eRoRLmZpam95LnYxLlByb2ZpbGUiA5ACARJCCg1VcGRhdGVQcm9maWxlEh4uZmlqb3kudjEuVXBkYXRlUHJvZmlsZVJlcXVlc3QaES5maWpveS52MS5Qcm9maWxlEkEKDURlbGV0ZVByb2ZpbGUSFi5nb29nbGUucHJvdG9idWYuRW1wdHkaFi5nb29nbGUucHJvdG9idWYuRW1wdHkiAEJ7Cgxjb20uZmlqb3kudjFCDFByb2ZpbGVQcm90b1ABWhxmaWpveS9wcm90by9maWpveS92MTtmaWpveXYxogIDRlhYqgIIRmlqb3kuVjHKAghGaWpveVxWMeICFEZpam95XFYxXEdQQk1ldGFkYXRh6gIJRmlqb3k6OlYxYgZwcm90bzM", [file_buf_validate_validate, file_google_protobuf_empty, file_google_protobuf_timestamp]);

/**
 * @generated from message fijoy.v1.Profile
 */
export type Profile = Message<"fijoy.v1.Profile"> & {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: repeated string currencies = 2;
   */
  currencies: string[];

  /**
   * @generated from field: string locale = 3;
   */
  locale: string;

  /**
   * @generated from field: string net_worth_goal = 4;
   */
  netWorthGoal: string;

  /**
   * @generated from field: google.protobuf.Timestamp created_at = 5;
   */
  createdAt?: Timestamp;
};

/**
 * Describes the message fijoy.v1.Profile.
 * Use `create(ProfileSchema)` to create a new message.
 */
export const ProfileSchema: GenMessage<Profile> = /*@__PURE__*/
  messageDesc(file_fijoy_v1_profile, 0);

/**
 * @generated from message fijoy.v1.CreateProfileRequest
 */
export type CreateProfileRequest = Message<"fijoy.v1.CreateProfileRequest"> & {
  /**
   * @generated from field: repeated string currencies = 1;
   */
  currencies: string[];

  /**
   * @generated from field: string net_worth_goal = 2;
   */
  netWorthGoal: string;
};

/**
 * Describes the message fijoy.v1.CreateProfileRequest.
 * Use `create(CreateProfileRequestSchema)` to create a new message.
 */
export const CreateProfileRequestSchema: GenMessage<CreateProfileRequest> = /*@__PURE__*/
  messageDesc(file_fijoy_v1_profile, 1);

/**
 * @generated from message fijoy.v1.UpdateProfileRequest
 */
export type UpdateProfileRequest = Message<"fijoy.v1.UpdateProfileRequest"> & {
  /**
   * @generated from field: repeated string currencies = 1;
   */
  currencies: string[];

  /**
   * @generated from field: optional string net_worth_goal = 2;
   */
  netWorthGoal?: string;
};

/**
 * Describes the message fijoy.v1.UpdateProfileRequest.
 * Use `create(UpdateProfileRequestSchema)` to create a new message.
 */
export const UpdateProfileRequestSchema: GenMessage<UpdateProfileRequest> = /*@__PURE__*/
  messageDesc(file_fijoy_v1_profile, 2);

/**
 * @generated from service fijoy.v1.ProfileService
 */
export const ProfileService: GenService<{
  /**
   * @generated from rpc fijoy.v1.ProfileService.CreateProfile
   */
  createProfile: {
    methodKind: "unary";
    input: typeof CreateProfileRequestSchema;
    output: typeof ProfileSchema;
  },
  /**
   * @generated from rpc fijoy.v1.ProfileService.GetProfile
   */
  getProfile: {
    methodKind: "unary";
    input: typeof EmptySchema;
    output: typeof ProfileSchema;
  },
  /**
   * @generated from rpc fijoy.v1.ProfileService.UpdateProfile
   */
  updateProfile: {
    methodKind: "unary";
    input: typeof UpdateProfileRequestSchema;
    output: typeof ProfileSchema;
  },
  /**
   * @generated from rpc fijoy.v1.ProfileService.DeleteProfile
   */
  deleteProfile: {
    methodKind: "unary";
    input: typeof EmptySchema;
    output: typeof EmptySchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_fijoy_v1_profile, 0);

