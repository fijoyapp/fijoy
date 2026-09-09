/**
 * @generated SignedSource<<51918d9d9c63d4315db89db10665b4db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type newInvestmentCryptoQuoteQuery$variables = {
  skipQuote?: boolean | null | undefined;
  symbol?: string | null | undefined;
};
export type newInvestmentCryptoQuoteQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"newInvestmentCryptoQuoteFragment">;
};
export type newInvestmentCryptoQuoteQuery = {
  response: newInvestmentCryptoQuoteQuery$data;
  variables: newInvestmentCryptoQuoteQuery$variables;
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
    "name": "newInvestmentCryptoQuoteQuery",
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
        "name": "newInvestmentCryptoQuoteFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "newInvestmentCryptoQuoteQuery",
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
            "concreteType": "CryptoQuoteResult",
            "kind": "LinkedField",
            "name": "cryptoQuote",
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
    "cacheID": "c648e020e619e116dedae3cea0762716",
    "id": null,
    "metadata": {},
    "name": "newInvestmentCryptoQuoteQuery",
    "operationKind": "query",
    "text": "query newInvestmentCryptoQuoteQuery(\n  $skipQuote: Boolean = true\n  $symbol: String = \"\"\n) {\n  ...newInvestmentCryptoQuoteFragment_4moOa4\n}\n\nfragment newInvestmentCryptoQuoteFragment_4moOa4 on Query {\n  cryptoQuote(symbol: $symbol) @skip(if: $skipQuote) {\n    currentPrice\n    symbol\n    exchange\n    name\n    currency\n  }\n}\n"
  }
};
})();

(node as any).hash = "e564c7815c5d038f347f6c5cfe678b91";

export default node;
