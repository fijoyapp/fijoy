/**
 * @generated SignedSource<<a509396bfec88359ce7a10a730a855f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type newInvestmentQuery$variables = Record<PropertyKey, never>;
export type newInvestmentQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"newInvestmentFragment">;
};
export type newInvestmentQuery = {
  response: newInvestmentQuery$data;
  variables: newInvestmentQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "newInvestmentQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "newInvestmentFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "newInvestmentQuery",
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
    "cacheID": "ea0e23d384d2b515f107c53067f98b6d",
    "id": null,
    "metadata": {},
    "name": "newInvestmentQuery",
    "operationKind": "query",
    "text": "query newInvestmentQuery {\n  ...newInvestmentFragment\n}\n\nfragment newInvestmentFragment on Query {\n  currencies {\n    id\n    code\n  }\n}\n"
  }
};

(node as any).hash = "5717e245fb4066411f1ea60154201fb8";

export default node;
