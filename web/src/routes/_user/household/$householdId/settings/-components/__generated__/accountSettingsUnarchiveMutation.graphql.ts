/**
 * @generated SignedSource<<d64e07bfccc27254967e62039b335f60>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type accountSettingsUnarchiveMutation$variables = {
  id: string;
};
export type accountSettingsUnarchiveMutation$data = {
  readonly unarchiveAccount: {
    readonly archived: boolean;
    readonly id: string;
  };
};
export type accountSettingsUnarchiveMutation = {
  response: accountSettingsUnarchiveMutation$data;
  variables: accountSettingsUnarchiveMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Account",
    "kind": "LinkedField",
    "name": "unarchiveAccount",
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
        "name": "archived",
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
    "name": "accountSettingsUnarchiveMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "accountSettingsUnarchiveMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "88c9deb2a41c19771bb081b425f4bab6",
    "id": null,
    "metadata": {},
    "name": "accountSettingsUnarchiveMutation",
    "operationKind": "mutation",
    "text": "mutation accountSettingsUnarchiveMutation(\n  $id: ID!\n) {\n  unarchiveAccount(id: $id) {\n    id\n    archived\n  }\n}\n"
  }
};
})();

(node as any).hash = "81da19057eac15639bdcfe07f6488590";

export default node;
