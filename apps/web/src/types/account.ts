import { AccountType } from "@/gen/proto/fijoy/v1/account_pb";
import { z, type TypeOf } from "zod";

export const AccountTypeEnum = z.nativeEnum(AccountType);
export type AccountTypeEnum = TypeOf<typeof AccountTypeEnum>;

export type AccountTypeDetail = {
  name: string;
  description: string;
};
