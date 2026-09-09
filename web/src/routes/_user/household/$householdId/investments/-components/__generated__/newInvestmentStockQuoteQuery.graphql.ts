/**
 * @generated SignedSource<<557ac263ac5a115c4680d6d80153af61>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type newInvestmentStockQuoteQuery$variables = {
  skipQuote?: boolean | null | undefined;
  symbol?: string | null | undefined;
};
export type newInvestmentStockQuoteQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"newInvestmentStockQuoteFragment">;
};
export type newInvestmentStockQuoteQuery = {
  response: newInvestmentStockQuoteQuery$data;
  variables: newInvestmentStockQuoteQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": true,
    "kind": "LocalArgument",
    "name": "skipQuote"
  },
  {
    "defaultValue": "",
    "kind": "LocalArgument",
    "name": "symbol"
  }
],
v1 = {
  "kind": "Variable",
  "name": "symbol",
  "variableName": "symbol"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "newInvestmentStockQuoteQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "skipQuote",
            "variableName": "skipQuote"
          },
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "newInvestmentStockQuoteFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "newInvestmentStockQuoteQuery",
    "selections": [
      {
        "condition": "skipQuote",
        "kind": "Condition",
        "passingValue": false,
        "selections": [
          {
            "alias": null,
            "args": [
              (v1/*: any*/)
            ],
            "concreteType": "StockQuoteResult",
            "kind": "LinkedField",
            "name": "stockQuote",
            "plural": false,
            "selections": [
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "currency",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "96693b6678b5d1a56ee8b6c35c417f5d",
    "id": null,
    "metadata": {},
    "name": "newInvestmentStockQuoteQuery",
    "operationKind": "query",
    "text": "query newInvestmentStockQuoteQuery(\n  $skipQuote: Boolean = true\n  $symbol: String = \"\"\n) {\n  ...newInvestmentStockQuoteFragment_4moOa4\n}\n\nfragment newInvestmentStockQuoteFragment_4moOa4 on Query {\n  stockQuote(symbol: $symbol) @skip(if: $skipQuote) {\n    currentPrice\n    symbol\n    exchange\n    name\n    currency\n  }\n}\n"
  }
};
})();

(node as any).hash = "9688bc2218e2e2c6981404e83a42ada3";

export default node;
