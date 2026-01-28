/**
 * @generated SignedSource<<b7d45264ee3e9ba8094862216603d125>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type RecurringSubscriptionInterval = "month" | "week" | "year" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type subscriptionCardFragment$data = {
  readonly cost: string;
  readonly currency: {
    readonly code: string;
  };
  readonly fxRate: string;
  readonly icon: string | null | undefined;
  readonly id: string;
  readonly interval: RecurringSubscriptionInterval;
  readonly intervalCount: number;
  readonly name: string;
  readonly startDate: any;
  readonly " $fragmentType": "subscriptionCardFragment";
};
export type subscriptionCardFragment$key = {
  readonly " $data"?: subscriptionCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"subscriptionCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "subscriptionCardFragment",
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
      "name": "icon",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cost",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "fxRate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "interval",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "intervalCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startDate",
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
    }
  ],
  "type": "RecurringSubscription",
  "abstractKey": null
};

(node as any).hash = "ac15caa523e73beb1577fcd455e1404d";

export default node;
