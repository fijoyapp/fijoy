/**
 * @generated SignedSource<<8387bdc438a00547f6fa4f5b855f8a6b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type currencyQuery$variables = Record<PropertyKey, never>;
export type currencyQuery$data = {
  readonly currencies: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"currencyFragment">;
  }>;
};
export type currencyQuery = {
  response: currencyQuery$data;
  variables: currencyQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "currencyQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "currencyFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "currencyQuery",
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
            "name": "code",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locale",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b260c6bda0b8aefe9812bf0f128cc87a",
    "id": null,
    "metadata": {},
    "name": "currencyQuery",
    "operationKind": "query",
    "text": "query currencyQuery {\n  currencies {\n    ...currencyFragment\n  }\n}\n\nfragment currencyFragment on Currency {\n  code\n  locale\n}\n"
  }
};

(node as any).hash = "a548375f7c62f58ad530eabe144d3472";

export default node;
