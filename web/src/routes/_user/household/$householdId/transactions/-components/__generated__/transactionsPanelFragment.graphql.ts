/**
 * @generated SignedSource<<81c817d7245ad808c1785c9a9ed849b4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type transactionsPanelFragment$data = {
  readonly financialReport: {
    readonly " $fragmentSpreads": FragmentRefs<"financialSummaryCardsFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"transactionsListFragment">;
  readonly " $fragmentType": "transactionsPanelFragment";
};
export type transactionsPanelFragment$key = {
  readonly " $data"?: transactionsPanelFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"transactionsPanelFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "endDate"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "startDate"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "where"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "transactionsPanelFragment",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "where",
          "variableName": "where"
        }
      ],
      "kind": "FragmentSpread",
      "name": "transactionsListFragment"
    },
    {
      "alias": null,
      "args": [
        {
          "fields": [
            {
              "kind": "Variable",
              "name": "endDate",
              "variableName": "endDate"
            },
            {
              "kind": "Variable",
              "name": "startDate",
              "variableName": "startDate"
            }
          ],
          "kind": "ObjectValue",
          "name": "period"
        }
      ],
      "concreteType": "FinancialReport",
      "kind": "LinkedField",
      "name": "financialReport",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "financialSummaryCardsFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "39bdbba2d637b52239c29e6005749f0e";

export default node;
