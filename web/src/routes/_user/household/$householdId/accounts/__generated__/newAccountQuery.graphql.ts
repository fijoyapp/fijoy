/**
 * @generated SignedSource<<e080485e158d5375220885074d9442d5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type newAccountQuery$variables = Record<PropertyKey, never>;
export type newAccountQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"newAccountFragment">;
};
export type newAccountQuery = {
  response: newAccountQuery$data;
  variables: newAccountQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "newAccountQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "newAccountFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "newAccountQuery",
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "62b99106f9c95b7083ccb6b1908f796b",
    "id": null,
    "metadata": {},
    "name": "newAccountQuery",
    "operationKind": "query",
    "text": "query newAccountQuery {\n  ...newAccountFragment\n}\n\nfragment newAccountFragment on Query {\n  accounts {\n    id\n  }\n}\n"
  }
};

(node as any).hash = "61249ef108899fcc94a14af055f728e4";

export default node;
