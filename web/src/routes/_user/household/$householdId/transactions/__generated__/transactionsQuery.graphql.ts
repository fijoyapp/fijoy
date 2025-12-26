/**
 * @generated SignedSource<<1ea5c9879e6eb15c746aa0ed3927b027>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type transactionsQuery$variables = Record<PropertyKey, never>;
export type transactionsQuery$data = {
  readonly transactions: ReadonlyArray<{
    readonly id: string;
  }>;
};
export type transactionsQuery = {
  response: transactionsQuery$data;
  variables: transactionsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Transaction",
    "kind": "LinkedField",
    "name": "transactions",
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "transactionsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "transactionsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "ae9184e9fa69422f5507db5f00b1dd3d",
    "id": null,
    "metadata": {},
    "name": "transactionsQuery",
    "operationKind": "query",
    "text": "query transactionsQuery {\n  transactions {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "9d1734a23480d6389e7a46d681a0f122";

export default node;
