/**
 * @generated SignedSource<<72a8d3bf85066bc56e1cf150659a13ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type transactionsQuery$variables = Record<PropertyKey, never>;
export type transactionsQuery$data = {
  readonly transactions: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"transactionCardFragment">;
  }>;
};
export type transactionsQuery = {
  response: transactionsQuery$data;
  variables: transactionsQuery$variables;
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
    "name": "transactionsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Transaction",
        "kind": "LinkedField",
        "name": "transactions",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "transactionCardFragment"
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
    "name": "transactionsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Transaction",
        "kind": "LinkedField",
        "name": "transactions",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "note",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "amount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "datetime",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createdAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "updatedAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "account",
            "plural": false,
            "selections": [
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
                "name": "symbolType",
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
    "cacheID": "52c8b506cb2a8ceaa64846698b8d8da3",
    "id": null,
    "metadata": {},
    "name": "transactionsQuery",
    "operationKind": "query",
    "text": "query transactionsQuery {\n  transactions {\n    id\n    ...transactionCardFragment\n  }\n}\n\nfragment transactionCardFragment on Transaction {\n  id\n  note\n  amount\n  datetime\n  createdAt\n  updatedAt\n  account {\n    symbol\n    symbolType\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "8019f80830107e6347bf3390c6a50a7f";

export default node;
