/**
 * @generated SignedSource<<024cde3ac935da24882e810b4da1c72c>>
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
  readonly " $fragmentSpreads": FragmentRefs<"newInvestmentCryptoQuoteFragment" | "newInvestmentFragment" | "newInvestmentStockQuoteFragment">;
};
export type newInvestmentQuery = {
  response: newInvestmentQuery$data;
  variables: newInvestmentQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "symbol",
    "value": ""
  }
],
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "currentPrice",
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
    "name": "exchange",
    "storageKey": null
  },
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "currency",
    "storageKey": null
  }
];
return {
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
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "newInvestmentStockQuoteFragment"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "newInvestmentCryptoQuoteFragment"
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
                  (v0/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "StockQuoteResult",
        "kind": "LinkedField",
        "name": "stockQuote",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": "stockQuote(symbol:\"\")"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CryptoQuoteResult",
        "kind": "LinkedField",
        "name": "cryptoQuote",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": "cryptoQuote(symbol:\"\")"
      }
    ]
  },
  "params": {
    "cacheID": "cb81f547cb73c7780b82e896c208d50c",
    "id": null,
    "metadata": {},
    "name": "newInvestmentQuery",
    "operationKind": "query",
    "text": "query newInvestmentQuery {\n  ...newInvestmentFragment\n  ...newInvestmentStockQuoteFragment\n  ...newInvestmentCryptoQuoteFragment\n}\n\nfragment newInvestmentCryptoQuoteFragment on Query {\n  cryptoQuote(symbol: \"\") {\n    currentPrice\n    symbol\n    exchange\n    name\n    currency\n  }\n}\n\nfragment newInvestmentFragment on Query {\n  accounts {\n    edges {\n      node {\n        id\n        type\n        name\n      }\n    }\n  }\n}\n\nfragment newInvestmentStockQuoteFragment on Query {\n  stockQuote(symbol: \"\") {\n    currentPrice\n    symbol\n    exchange\n    name\n    currency\n  }\n}\n"
  }
};
})();

(node as any).hash = "2233c2654a08ec13a086ee8e60ae1c2d";

export default node;
