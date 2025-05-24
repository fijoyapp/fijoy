/**
 * @generated SignedSource<<b8594b77483f601f9854e70af97fd7fe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type finalStepMutation$variables = {
  currencies: string;
  locale: string;
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "currencies"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "locale"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "netWorthGoal"
},
v3 = [
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
            "name": "locale",
            "variableName": "locale"
          },
          {
            "kind": "Variable",
            "name": "netWorthGoal",
            "variableName": "netWorthGoal"
          },
          {
            "kind": "Literal",
            "name": "userID",
            "value": ""
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "finalStepMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "finalStepMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "23745534b1f7ec1173b546f030fa5d6c",
    "id": null,
    "metadata": {},
    "name": "finalStepMutation",
    "operationKind": "mutation",
    "text": "mutation finalStepMutation(\n  $currencies: String!\n  $netWorthGoal: String!\n  $locale: String!\n) {\n  createProfile(input: {currencies: $currencies, netWorthGoal: $netWorthGoal, locale: $locale, userID: \"\"}) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "05b18a7c81059376440b976aeb079976";

export default node;
