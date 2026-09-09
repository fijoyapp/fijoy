/**
 * @generated SignedSource<<e686032142540eb7c4cc60bd8e223763>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type newInvestmentCryptoQuoteFragment$data = {
  readonly cryptoQuote?: {
    readonly currency: string;
    readonly currentPrice: string;
    readonly exchange: string;
    readonly name: string;
    readonly symbol: string;
  } | null | undefined;
  readonly " $fragmentType": "newInvestmentCryptoQuoteFragment";
};
export type newInvestmentCryptoQuoteFragment$key = {
  readonly " $data"?: newInvestmentCryptoQuoteFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"newInvestmentCryptoQuoteFragment">;
};

import newInvestmentCryptoQuoteQuery_graphql from './newInvestmentCryptoQuoteQuery.graphql';

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
      "operation": newInvestmentCryptoQuoteQuery_graphql
    }
  },
  "name": "newInvestmentCryptoQuoteFragment",
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
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "e564c7815c5d038f347f6c5cfe678b91";

export default node;
