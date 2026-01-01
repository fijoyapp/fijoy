/**
 * @generated SignedSource<<e65cac21dfa9717fc9e2574d01b94ea1>>
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
        "concreteType": "AccountConnection",
        "kind": "LinkedField",
        "name": "accounts",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Account",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
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
                    "name": "type",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e9484c0b767b7b7fb2322beb670c8b2f",
    "id": null,
    "metadata": {},
    "name": "newInvestmentQuery",
    "operationKind": "query",
    "text": "query newInvestmentQuery {\n  ...newInvestmentFragment\n}\n\nfragment newInvestmentFragment on Query {\n  accounts {\n    edges {\n      node {\n        id\n        type\n        name\n      }\n    }\n  }\n}\n"
  }
};

(node as any).hash = "5717e245fb4066411f1ea60154201fb8";

export default node;
