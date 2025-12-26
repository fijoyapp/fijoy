/**
 * @generated SignedSource<<6414d1c499b38c2a62df0ca519b11025>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type accountsQuery$variables = Record<PropertyKey, never>;
export type accountsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"accountsListPageFragment">;
};
export type accountsQuery = {
  response: accountsQuery$data;
  variables: accountsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "accountsQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "accountsListPageFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "accountsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "accounts",
        "plural": true,
        "selections": [
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
            "name": "balanceInHouseholdCurrency",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
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
              },
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d29793cc06c9d24e711ecb057973d608",
    "id": null,
    "metadata": {},
    "name": "accountsQuery",
    "operationKind": "query",
    "text": "query accountsQuery {\n  ...accountsListPageFragment\n}\n\nfragment accountBalanceDisplayFragment_account on Account {\n  balance\n  currency {\n    code\n    id\n  }\n}\n\nfragment accountCardFragment on Account {\n  id\n  name\n  type\n  currency {\n    code\n    id\n  }\n  balance\n  ...accountBalanceDisplayFragment_account\n}\n\nfragment accountsListPageFragment on Query {\n  accounts {\n    id\n    type\n    balanceInHouseholdCurrency\n    ...accountCardFragment\n  }\n}\n"
  }
};
})();

(node as any).hash = "eca0f376f20e794d806315b9a01f8246";

export default node;
