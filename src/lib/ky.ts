import { env } from "@/env";
import ky from "ky";

export const api = ky.extend({
  prefixUrl: env.VITE_BACKEND_URL + "/v1",
  credentials: "same-origin",
});
