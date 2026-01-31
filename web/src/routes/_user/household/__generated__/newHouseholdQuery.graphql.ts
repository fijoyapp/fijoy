/**
 * @generated SignedSource<<2dff4cc19461865147c58de9134aed7a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type newHouseholdQuery$variables = Record<PropertyKey, never>;
export type newHouseholdQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"newHouseholdFragment">;
};
export type newHouseholdQuery = {
  response: newHouseholdQuery$data;
  variables: newHouseholdQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "newHouseholdQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "newHouseholdFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "newHouseholdQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Currency",
        "kind": "LinkedField",
        "name": "currencies",
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
            "name": "code",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "dc4b1545606d3c3579dba8076d0df537",
    "id": null,
    "metadata": {},
    "name": "newHouseholdQuery",
    "operationKind": "query",
    "text": "query newHouseholdQuery {\n  ...newHouseholdFragment\n}\n\nfragment newHouseholdFragment on Query {\n  currencies {\n    id\n    code\n  }\n}\n"
  }
};

(node as any).hash = "bccda5df1579385d83625d7e10b7ed2b";

export default node;
