import { useProfileStore } from "@/store/profile";
import { queryClient } from "./query";
import { env } from "@/env";

export function logout() {
  queryClient.removeQueries();
  useProfileStore.getState().reset();
  window.location.replace(env.VITE_SERVER_URL + "/v1/auth/logout");
}
