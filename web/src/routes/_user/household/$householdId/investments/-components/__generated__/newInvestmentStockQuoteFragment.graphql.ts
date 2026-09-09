/**
 * @generated SignedSource<<0480255f4d6a602b5fd95b59a1ab3de3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type newInvestmentStockQuoteFragment$data = {
  readonly stockQuote?: {
    readonly currency: string;
    readonly currentPrice: string;
    readonly exchange: string;
    readonly name: string;
    readonly symbol: string;
  } | null | undefined;
  readonly " $fragmentType": "newInvestmentStockQuoteFragment";
};
export type newInvestmentStockQuoteFragment$key = {
  readonly " $data"?: newInvestmentStockQuoteFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"newInvestmentStockQuoteFragment">;
};

import newInvestmentStockQuoteQuery_graphql from './newInvestmentStockQuoteQuery.graphql';

const node: ReaderFragment = {
  "argumentDefinitions": [
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
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": newInvestmentStockQuoteQuery_graphql
    }
  },
  "name": "newInvestmentStockQuoteFragment",
  "selections": [
    {
      "condition": "skipQuote",
      "kind": "Condition",
      "passingValue": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Variable",
              "name": "symbol",
              "variableName": "symbol"
            }
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
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "9688bc2218e2e2c6981404e83a42ada3";

export default node;
