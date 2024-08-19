// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file fijoy/v1/profile.proto (package fijoy.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

/**
 * @generated from message fijoy.v1.Profile
 */
export class Profile extends Message<Profile> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string user_id = 2;
   */
  userId = "";

  /**
   * @generated from field: repeated string currencies = 3;
   */
  currencies: string[] = [];

  /**
   * @generated from field: string locale = 4;
   */
  locale = "";

  /**
   * @generated from field: google.protobuf.Timestamp created_at = 5;
   */
  createdAt?: Timestamp;

  constructor(data?: PartialMessage<Profile>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.Profile";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "user_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "currencies", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 4, name: "locale", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "created_at", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Profile {
    return new Profile().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Profile {
    return new Profile().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Profile {
    return new Profile().fromJsonString(jsonString, options);
  }

  static equals(a: Profile | PlainMessage<Profile> | undefined, b: Profile | PlainMessage<Profile> | undefined): boolean {
    return proto3.util.equals(Profile, a, b);
  }
}

/**
 * @generated from message fijoy.v1.CreateProfileRequest
 */
export class CreateProfileRequest extends Message<CreateProfileRequest> {
  /**
   * @generated from field: repeated string currencies = 1;
   */
  currencies: string[] = [];

  /**
   * @generated from field: string locale = 2;
   */
  locale = "";

  constructor(data?: PartialMessage<CreateProfileRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.CreateProfileRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "currencies", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 2, name: "locale", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateProfileRequest {
    return new CreateProfileRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateProfileRequest {
    return new CreateProfileRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateProfileRequest {
    return new CreateProfileRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateProfileRequest | PlainMessage<CreateProfileRequest> | undefined, b: CreateProfileRequest | PlainMessage<CreateProfileRequest> | undefined): boolean {
    return proto3.util.equals(CreateProfileRequest, a, b);
  }
}

/**
 * @generated from message fijoy.v1.UpdateCurrencyRequest
 */
export class UpdateCurrencyRequest extends Message<UpdateCurrencyRequest> {
  /**
   * @generated from field: repeated string currencies = 2;
   */
  currencies: string[] = [];

  constructor(data?: PartialMessage<UpdateCurrencyRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.UpdateCurrencyRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 2, name: "currencies", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateCurrencyRequest {
    return new UpdateCurrencyRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateCurrencyRequest {
    return new UpdateCurrencyRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateCurrencyRequest {
    return new UpdateCurrencyRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateCurrencyRequest | PlainMessage<UpdateCurrencyRequest> | undefined, b: UpdateCurrencyRequest | PlainMessage<UpdateCurrencyRequest> | undefined): boolean {
    return proto3.util.equals(UpdateCurrencyRequest, a, b);
  }
}

/**
 * @generated from message fijoy.v1.UpdateLocaleRequest
 */
export class UpdateLocaleRequest extends Message<UpdateLocaleRequest> {
  /**
   * @generated from field: string locale = 1;
   */
  locale = "";

  constructor(data?: PartialMessage<UpdateLocaleRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.UpdateLocaleRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "locale", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateLocaleRequest {
    return new UpdateLocaleRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateLocaleRequest {
    return new UpdateLocaleRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateLocaleRequest {
    return new UpdateLocaleRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateLocaleRequest | PlainMessage<UpdateLocaleRequest> | undefined, b: UpdateLocaleRequest | PlainMessage<UpdateLocaleRequest> | undefined): boolean {
    return proto3.util.equals(UpdateLocaleRequest, a, b);
  }
}

