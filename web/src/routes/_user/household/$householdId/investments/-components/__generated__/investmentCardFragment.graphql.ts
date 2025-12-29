/**
 * @generated SignedSource<<6d60d2a1c154fe5e4586bf99cc7dc30a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type InvestmentType = "crypto" | "stock" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type investmentCardFragment$data = {
  readonly currency: {
    readonly code: string;
  };
  readonly id: string;
  readonly name: string;
  readonly type: InvestmentType;
  readonly updateTime: any;
  readonly value: string;
  readonly " $fragmentType": "investmentCardFragment";
};
export type investmentCardFragment$key = {
  readonly " $data"?: investmentCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"investmentCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "investmentCardFragment",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updateTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Currency",
      "kind": "LinkedField",
      "name": "currency",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "code",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "value",
      "storageKey": null
    }
  ],
  "type": "Investment",
  "abstractKey": null
};

(node as any).hash = "622e81ccfe2171deaf3e97dc826c95e9";

export default node;
