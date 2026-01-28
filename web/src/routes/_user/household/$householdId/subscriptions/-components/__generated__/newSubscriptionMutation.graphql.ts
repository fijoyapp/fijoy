/**
 * @generated SignedSource<<df7f7e070e4c46bebe7ed8d8cbc1433e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type RecurringSubscriptionInterval = "month" | "week" | "year" | "%future added value";
export type CreateRecurringSubscriptionInput = {
  active?: boolean | null | undefined;
  cost?: string | null | undefined;
  currencyID: string;
  icon?: string | null | undefined;
  interval: RecurringSubscriptionInterval;
  intervalCount?: number | null | undefined;
  name: string;
  startDate: any;
};
export type newSubscriptionMutation$variables = {
  input: CreateRecurringSubscriptionInput;
};
export type newSubscriptionMutation$data = {
  readonly createRecurringSubscription: {
    readonly node: {
      readonly active: boolean;
      readonly cost: string;
      readonly id: string;
      readonly interval: RecurringSubscriptionInterval;
      readonly intervalCount: number;
      readonly name: string;
      readonly startDate: any;
    } | null | undefined;
  };
};
export type newSubscriptionMutation = {
  response: newSubscriptionMutation$data;
  variables: newSubscriptionMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "RecurringSubscriptionEdge",
    "kind": "LinkedField",
    "name": "createRecurringSubscription",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RecurringSubscription",
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
            "name": "name",
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
            "kind": "ScalarField",
            "name": "cost",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "active",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "newSubscriptionMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "newSubscriptionMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "20dde2afdb4ba8d393453f1601dec1b4",
    "id": null,
    "metadata": {},
    "name": "newSubscriptionMutation",
    "operationKind": "mutation",
    "text": "mutation newSubscriptionMutation(\n  $input: CreateRecurringSubscriptionInput!\n) {\n  createRecurringSubscription(input: $input) {\n    node {\n      id\n      name\n      interval\n      intervalCount\n      startDate\n      cost\n      active\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f60fec1e01251ea355d504c5c730da2e";

export default node;
