/**
 * @generated SignedSource<<ebd1133b0e77beca89b2d6aca378f928>>
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locales",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "df6e059dd7b87777d0180d65b9360ee8",
    "id": null,
    "metadata": {},
    "name": "newHouseholdQuery",
    "operationKind": "query",
    "text": "query newHouseholdQuery {\n  ...newHouseholdFragment\n}\n\nfragment newHouseholdFragment on Query {\n  currencies {\n    id\n    code\n    locales\n  }\n}\n"
  }
};

(node as any).hash = "bccda5df1579385d83625d7e10b7ed2b";

export default node;
