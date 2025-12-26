/**
 * @generated SignedSource<<1e61e4160082dd16644945f11509343d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useCurrencyQuery$variables = Record<PropertyKey, never>;
export type useCurrencyQuery$data = {
  readonly households: ReadonlyArray<{
    readonly locale: string;
  }>;
};
export type useCurrencyQuery = {
  response: useCurrencyQuery$data;
  variables: useCurrencyQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locale",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useCurrencyQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Household",
        "kind": "LinkedField",
        "name": "households",
        "plural": true,
        "selections": [
          (v0/*: any*/)
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
    "name": "useCurrencyQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Household",
        "kind": "LinkedField",
        "name": "households",
        "plural": true,
        "selections": [
          (v0/*: any*/),
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
    "cacheID": "2a86463aaafead83137a7f348c197af4",
    "id": null,
    "metadata": {},
    "name": "useCurrencyQuery",
    "operationKind": "query",
    "text": "query useCurrencyQuery {\n  households {\n    locale\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "2b4310efc28b9b63b692638a6f9ceaa9";

export default node;
