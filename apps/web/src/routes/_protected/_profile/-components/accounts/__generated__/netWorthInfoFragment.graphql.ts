/**
 * @generated SignedSource<<87efb283b4445ccc46ab5bae768e499e>>
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
          "value": 5
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
      "storageKey": "accounts(first:5)"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "0f54bb531ed57a6b3654f959159dc2ff";

export default node;
