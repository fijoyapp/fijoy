/**
 * @generated SignedSource<<3b156836722d86c3534afb7d06828511>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type finalStepMutation$variables = {
  currencies: string;
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
    "cacheID": "07e1dfbc2d194e394466512d84b46a97",
    "id": null,
    "metadata": {},
    "name": "finalStepMutation",
    "operationKind": "mutation",
    "text": "mutation finalStepMutation(\n  $currencies: String!\n  $netWorthGoal: String!\n) {\n  createProfile(input: {currencies: $currencies, netWorthGoal: $netWorthGoal}) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "77e66d28cd695f037024a3cee08d5ab8";

export default node;
