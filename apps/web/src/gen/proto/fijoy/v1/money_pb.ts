// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file fijoy/v1/money.proto (package fijoy.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, protoInt64 } from "@bufbuild/protobuf";

/**
 * Represents an amount of money with its currency type.
 *
 * @generated from message fijoy.v1.Money
 */
export class Money extends Message<Money> {
  /**
   * The three-letter currency code defined in ISO 4217.
   *
   * @generated from field: string currency_code = 1;
   */
  currencyCode = "";

  /**
   * The whole units of the amount.
   * For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.
   *
   * @generated from field: int64 units = 2;
   */
  units = protoInt64.zero;

  /**
   * TODO: write some validation logic for this
   * Number of nano (10^-9) units of the amount.
   * The value must be between -999,999,999 and +999,999,999 inclusive.
   * If `units` is positive, `nanos` must be positive or zero.
   * If `units` is zero, `nanos` can be positive, zero, or negative.
   * If `units` is negative, `nanos` must be negative or zero.
   * For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.
   *
   * @generated from field: int32 nanos = 3;
   */
  nanos = 0;

  constructor(data?: PartialMessage<Money>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.Money";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "currency_code", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "units", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "nanos", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Money {
    return new Money().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Money {
    return new Money().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Money {
    return new Money().fromJsonString(jsonString, options);
  }

  static equals(a: Money | PlainMessage<Money> | undefined, b: Money | PlainMessage<Money> | undefined): boolean {
    return proto3.util.equals(Money, a, b);
  }
}

