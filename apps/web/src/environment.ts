import {
  Store,
  RecordSource,
  Environment,
  Network,
  Observable,
} from "relay-runtime";
import type { FetchFunction, IEnvironment } from "relay-runtime";
import { env } from "./env";

const fetchFn: FetchFunction = (params, variables) => {
  const response = fetch(env.VITE_SERVER_URL + "/query", {
    method: "POST",
    headers: [["Content-Type", "application/json"]],
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
    credentials: "include",
  });

  return Observable.from(response.then((data) => data.json()));
};

export function createEnvironment(): IEnvironment {
  const network = Network.create(fetchFn);
  const store = new Store(new RecordSource());
  return new Environment({ store, network });
}
