import { env } from "@/env";
import { createConnectTransport } from "@connectrpc/connect-web";

export const finalTransport = createConnectTransport({
  baseUrl: env.VITE_SERVER_URL,
  fetch: (input, init) => fetch(input, { ...init, credentials: "include" }),
  useHttpGet: true,
});
