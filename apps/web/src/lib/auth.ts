import { queryClient } from "./query";
import { env } from "@/env";

export function logout() {
  queryClient.removeQueries();
  window.location.replace(env.VITE_SERVER_URL + "/v1/auth/logout");
}
