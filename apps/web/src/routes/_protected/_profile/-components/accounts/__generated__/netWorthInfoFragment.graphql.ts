/**
 * @generated SignedSource<<d6945b68e0318fa629087df675e5675f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type AccountAccountType = "investment" | "liability" | "liquidity" | "property" | "receivable" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type netWorthInfoFragment$data = {
  readonly accounts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly accountType: AccountAccountType;
        readonly balance: string;
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"cardFragment">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
    readonly pageInfo: {
      readonly hasNextPage: boolean;
    };
  };
  readonly " $fragmentType": "netWorthInfoFragment";
};
export type netWorthInfoFragment$key = {
  readonly " $data"?: netWorthInfoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"netWorthInfoFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "netWorthInfoFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
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
                  "name": "accountType",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "balance",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "cardFragment"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "accounts(first:20)"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "4c9b1865b567e3460df56e746bba4c22";

export default node;
