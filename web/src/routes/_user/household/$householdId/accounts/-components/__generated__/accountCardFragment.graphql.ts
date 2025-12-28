/**
 * @generated SignedSource<<163fbc79b8611ed6f528f35126126e24>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type AccountType = "investment" | "liability" | "liquidity" | "property" | "receivable" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type accountCardFragment$data = {
  readonly balance: string;
  readonly currency: {
    readonly code: string;
  };
  readonly id: string;
  readonly name: string;
  readonly type: AccountType;
  readonly updateTime: any;
  readonly user: {
    readonly name: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"accountBalanceDisplayFragment_account">;
  readonly " $fragmentType": "accountCardFragment";
};
export type accountCardFragment$key = {
  readonly " $data"?: accountCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"accountCardFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "accountCardFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updateTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Currency",
      "kind": "LinkedField",
      "name": "currency",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "code",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "balance",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "accountBalanceDisplayFragment_account"
    }
  ],
  "type": "Account",
  "abstractKey": null
};
})();

(node as any).hash = "a42eaa360f4ed2ad17b5f57667a591d7";

export default node;
