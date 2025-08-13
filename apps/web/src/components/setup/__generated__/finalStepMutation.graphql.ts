/**
 * @generated SignedSource<<4b704ddb269c461b2396760de41c9ec1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type finalStepMutation$variables = {
  currencies: ReadonlyArray<string>;
  name: string;
  netWorthGoal: string;
};
export type finalStepMutation$data = {
  readonly createProfile: {
    readonly currencies: ReadonlyArray<string>;
    readonly id: string;
    readonly locale: string;
    readonly name: string;
    readonly netWorthGoal: string;
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
  "name": "name"
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
            "name": "name",
            "variableName": "name"
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
        "name": "netWorthGoal",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "locale",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "currencies",
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
    "cacheID": "4b77772bfb965ece6da0297117470f16",
    "id": null,
    "metadata": {},
    "name": "finalStepMutation",
    "operationKind": "mutation",
    "text": "mutation finalStepMutation(\n  $currencies: [String!]!\n  $netWorthGoal: String!\n  $name: String!\n) {\n  createProfile(input: {currencies: $currencies, netWorthGoal: $netWorthGoal, name: $name}) {\n    id\n    name\n    netWorthGoal\n    locale\n    currencies\n  }\n}\n"
  }
};
})();

(node as any).hash = "d4ae079e91b1b1db37e92f3b477bf4e1";

export default node;
