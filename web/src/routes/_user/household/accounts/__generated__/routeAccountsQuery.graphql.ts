/**
 * @generated SignedSource<<db1c364a2666bcf026a17abeb1e44c7e>>
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
  readonly " $fragmentSpreads": FragmentRefs<"accountsListPageFragment">;
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
            "name": "balance",
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "dae2a77ae382e7aa47c9d356338fa059",
    "id": null,
    "metadata": {},
    "name": "routeAccountsQuery",
    "operationKind": "query",
    "text": "query routeAccountsQuery {\n  ...accountsListPageFragment\n}\n\nfragment accountBalanceDisplayFragment_account on Account {\n  balance\n  currency {\n    code\n    id\n  }\n}\n\nfragment accountCardFragment on Account {\n  id\n  name\n  type\n  balance\n  ...accountBalanceDisplayFragment_account\n}\n\nfragment accountsListPageFragment on Query {\n  accounts {\n    id\n    type\n    balance\n    ...accountCardFragment\n  }\n}\n"
  }
};
})();

(node as any).hash = "c667e964f84164eaf4850dd49d646a90";

export default node;
