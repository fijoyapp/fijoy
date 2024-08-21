// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file fijoy/v1/currency.proto (package fijoy.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message fijoy.v1.Currency
 */
export class Currency extends Message<Currency> {
  /**
   * @generated from field: string code = 1;
   */
  code = "";

  /**
   * @generated from field: string locale = 2;
   */
  locale = "";

  constructor(data?: PartialMessage<Currency>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.Currency";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "code", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "locale", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Currency {
    return new Currency().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Currency {
    return new Currency().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Currency {
    return new Currency().fromJsonString(jsonString, options);
  }

  static equals(a: Currency | PlainMessage<Currency> | undefined, b: Currency | PlainMessage<Currency> | undefined): boolean {
    return proto3.util.equals(Currency, a, b);
  }
}

/**
 * @generated from message fijoy.v1.Currencies
 */
export class Currencies extends Message<Currencies> {
  /**
   * @generated from field: repeated fijoy.v1.Currency currencies = 1;
   */
  currencies: Currency[] = [];

  constructor(data?: PartialMessage<Currencies>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "fijoy.v1.Currencies";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "currencies", kind: "message", T: Currency, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Currencies {
    return new Currencies().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Currencies {
    return new Currencies().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Currencies {
    return new Currencies().fromJsonString(jsonString, options);
  }

  static equals(a: Currencies | PlainMessage<Currencies> | undefined, b: Currencies | PlainMessage<Currencies> | undefined): boolean {
    return proto3.util.equals(Currencies, a, b);
  }
}

