/**
 * @generated SignedSource<<bb89961647a629860aaa3c99e2452e66>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderInlineDataFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type transactionCategoryPickerFragment$data = {
  readonly icon: string;
  readonly latestTransaction: {
    readonly datetime: any;
  } | null | undefined;
  readonly name: string;
  readonly " $fragmentType": "transactionCategoryPickerFragment";
};
export type transactionCategoryPickerFragment$key = {
  readonly " $data"?: transactionCategoryPickerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"transactionCategoryPickerFragment">;
};

const node: ReaderInlineDataFragment = {
  "kind": "InlineDataFragment",
  "name": "transactionCategoryPickerFragment"
};

(node as any).hash = "13dda3528cf01eafba02f6addbea9c46";

export default node;
