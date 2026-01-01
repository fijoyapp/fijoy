/**
 * @generated SignedSource<<555fb9297ff8c1d822a9a65b47a7542b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type newInvestmentFragment$data = {
  readonly currencies: ReadonlyArray<{
    readonly code: string;
    readonly id: string;
  }>;
  readonly " $fragmentType": "newInvestmentFragment";
};
export type newInvestmentFragment$key = {
  readonly " $data"?: newInvestmentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"newInvestmentFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "newInvestmentFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Currency",
      "kind": "LinkedField",
      "name": "currencies",
      "plural": true,
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
          "name": "code",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "afc72db741991780be4056a889ee1574";

export default node;
