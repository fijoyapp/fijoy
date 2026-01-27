/**
 * @generated SignedSource<<6c4e1a1c99f4209112d5a55e5cc71554>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type RecurringSubscriptionInterval = "day" | "month" | "week" | "year" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type subscriptionCardFragment$data = {
  readonly cost: string;
  readonly fxRate: string;
  readonly icon: string | null | undefined;
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
    }
  ],
  "type": "RecurringSubscription",
  "abstractKey": null
};

(node as any).hash = "e1ac51f1349cdccef8b479521777aff4";

export default node;
