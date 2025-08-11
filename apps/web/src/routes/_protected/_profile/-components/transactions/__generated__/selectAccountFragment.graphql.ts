/**
 * @generated SignedSource<<fafeeca62e8d3f3a8ffd249528c6ad81>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type AccountTickerType = "crypto" | "currency" | "stock" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type selectAccountFragment$data = {
  readonly accounts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly amount: string;
        readonly currencySymbol: string;
        readonly id: string;
        readonly name: string;
        readonly tickerType: AccountTickerType;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "selectAccountFragment";
};
export type selectAccountFragment$key = {
  readonly " $data"?: selectAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"selectAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "selectAccountFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1000
        }
      ],
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
                  "kind": "RequiredField",
                  "field": {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  },
                  "action": "THROW"
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
                  "name": "amount",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "currencySymbol",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "tickerType",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "accounts(first:1000)"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "6c1cd3964aaac1b8dc005326667d5617";

export default node;
