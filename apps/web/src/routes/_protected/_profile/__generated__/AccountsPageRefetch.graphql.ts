/**
 * @generated SignedSource<<78bccae7fe4d9c29dd8a3d8b612d34ed>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountsPageRefetch$variables = Record<PropertyKey, never>;
export type AccountsPageRefetch$data = {
  readonly " $fragmentSpreads": FragmentRefs<"accountsPageFragment">;
};
export type AccountsPageRefetch = {
  response: AccountsPageRefetch$data;
  variables: AccountsPageRefetch$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AccountsPageRefetch",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "accountsPageFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AccountsPageRefetch",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "accounts",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "accountType",
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
            "kind": "ScalarField",
            "name": "symbol",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "updatedAt",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8b1d281d4cd17c3b8d5ef0c965699d86",
    "id": null,
    "metadata": {},
    "name": "AccountsPageRefetch",
    "operationKind": "query",
    "text": "query AccountsPageRefetch {\n  ...accountsPageFragment\n}\n\nfragment accountsPageFragment on Query {\n  accounts {\n    id\n    accountType\n    balance\n    ...cardFragment\n  }\n}\n\nfragment cardFragment on Account {\n  id\n  name\n  balance\n  accountType\n  symbol\n  updatedAt\n}\n"
  }
};

(node as any).hash = "a1ba9ae7a097f15b7423bd6a965fbed1";

export default node;
