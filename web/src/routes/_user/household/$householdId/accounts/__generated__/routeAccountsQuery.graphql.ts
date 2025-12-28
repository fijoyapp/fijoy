/**
 * @generated SignedSource<<722d6425f0ab33e2200f1e4a656c3ddd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type routeAccountsQuery$variables = Record<PropertyKey, never>;
export type routeAccountsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"accountsPanelFragment">;
};
export type routeAccountsQuery = {
  response: routeAccountsQuery$data;
  variables: routeAccountsQuery$variables;
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
    "name": "routeAccountsQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "accountsPanelFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routeAccountsQuery",
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
    "cacheID": "ad37a59c27f428efb4fc496f2045631d",
    "id": null,
    "metadata": {},
    "name": "routeAccountsQuery",
    "operationKind": "query",
    "text": "query routeAccountsQuery {\n  ...accountsPanelFragment\n}\n\nfragment accountBalanceDisplayFragment_account on Account {\n  balance\n  currency {\n    code\n    id\n  }\n}\n\nfragment accountCardFragment on Account {\n  id\n  name\n  type\n  updateTime\n  currency {\n    code\n    id\n  }\n  balance\n  ...accountBalanceDisplayFragment_account\n}\n\nfragment accountsPanelFragment on Query {\n  accounts {\n    id\n    type\n    balanceInHouseholdCurrency\n    ...accountCardFragment\n  }\n}\n"
  }
};
})();

(node as any).hash = "81ba72b4dd01e656e857556d21ab1f9e";

export default node;
