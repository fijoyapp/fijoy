/**
 * @generated SignedSource<<c250eca294060b9f27fd3d3f5066528a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type finalStepMutation$variables = {
  currencies: ReadonlyArray<string>;
  netWorthGoal: string;
};
export type finalStepMutation$data = {
  readonly createProfile: {
    readonly id: string;
  };
};
export type finalStepMutation = {
  response: finalStepMutation$data;
  variables: finalStepMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "currencies"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "netWorthGoal"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "currencies",
            "variableName": "currencies"
          },
          {
            "kind": "Variable",
            "name": "netWorthGoal",
            "variableName": "netWorthGoal"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "Profile",
    "kind": "LinkedField",
    "name": "createProfile",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "finalStepMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "finalStepMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "338e1cb94b3244baa331d77b99c13373",
    "id": null,
    "metadata": {},
    "name": "finalStepMutation",
    "operationKind": "mutation",
    "text": "mutation finalStepMutation(\n  $currencies: [String!]!\n  $netWorthGoal: String!\n) {\n  createProfile(input: {currencies: $currencies, netWorthGoal: $netWorthGoal}) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "f6fc9c263d7adf18df1e1c03f048e8da";

export default node;
