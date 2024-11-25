import { env } from "@/env";
import { useProfileStore } from "@/store/profile";
import { Interceptor } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

const setProfileIdHeader: Interceptor = (next) => (request) => {
  const profileStore = useProfileStore.getState();

  if (profileStore.profile) {
    request.header.append("Fijoy-Profile-Id", profileStore.profile.id);
  }

  return next(request);
};

export const finalTransport = createConnectTransport({
  baseUrl: env.VITE_SERVER_URL,
  fetch: (input, init) => fetch(input, { ...init, credentials: "include" }),
  interceptors: [setProfileIdHeader],
  useHttpGet: true,
});
