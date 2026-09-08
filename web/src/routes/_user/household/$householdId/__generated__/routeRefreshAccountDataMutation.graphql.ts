/**
 * @generated SignedSource<<111f636ebebd25504911167e677a9d80>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type routeRefreshAccountDataMutation$variables = Record<PropertyKey, never>;
export type routeRefreshAccountDataMutation$data = {
  readonly refresh: boolean;
};
export type routeRefreshAccountDataMutation = {
  response: routeRefreshAccountDataMutation$data;
  variables: routeRefreshAccountDataMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "refresh",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "routeRefreshAccountDataMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routeRefreshAccountDataMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "f868b032477e700bd3a5114e9b15f087",
    "id": null,
    "metadata": {},
    "name": "routeRefreshAccountDataMutation",
    "operationKind": "mutation",
    "text": "mutation routeRefreshAccountDataMutation {\n  refresh\n}\n"
  }
};
})();

(node as any).hash = "02a030ad4648da7d20867c8b07f34c37";

export default node;
