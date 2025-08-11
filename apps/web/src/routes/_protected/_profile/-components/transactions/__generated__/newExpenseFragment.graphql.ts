/**
 * @generated SignedSource<<0a0f4ddedb3f2955abc58ae1df0b728e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type newExpenseFragment$data = {
  readonly accounts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly currencySymbol: string;
        readonly id: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentSpreads": FragmentRefs<"selectAccountFragment">;
  readonly " $fragmentType": "newExpenseFragment";
};
export type newExpenseFragment$key = {
  readonly " $data"?: newExpenseFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"newExpenseFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "newExpenseFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "selectAccountFragment"
    },
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
                  "name": "currencySymbol",
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

(node as any).hash = "8757536e3a958607a2b7ceab5a6ccef0";

export default node;
