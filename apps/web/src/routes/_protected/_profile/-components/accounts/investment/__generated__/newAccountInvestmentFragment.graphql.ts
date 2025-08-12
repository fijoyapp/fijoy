/**
 * @generated SignedSource<<73eba88f744151122a1a98cf188e62d7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type newAccountInvestmentFragment$data = {
  readonly assetInfo: {
    readonly currency: string;
    readonly currentPrice: string;
    readonly exchange: string;
    readonly name: string;
  } | null | undefined;
  readonly " $fragmentType": "newAccountInvestmentFragment";
};
export type newAccountInvestmentFragment$key = {
  readonly " $data"?: newAccountInvestmentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"newAccountInvestmentFragment">;
};

import NewAccountInvestmentRefetchQuery_graphql from './NewAccountInvestmentRefetchQuery.graphql';

const node: ReaderFragment = {
  "argumentDefinitions": [
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
      "operation": NewAccountInvestmentRefetchQuery_graphql
    }
  },
  "name": "newAccountInvestmentFragment",
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
      "concreteType": "AssetInfo",
      "kind": "LinkedField",
      "name": "assetInfo",
      "plural": false,
      "selections": [
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
          "name": "currentPrice",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "db82d2d06ae42adf7b217e8304d9f17a";

export default node;
