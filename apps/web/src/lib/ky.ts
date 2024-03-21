import { env } from "@/env";
import ky from "ky";

export const api = ky.create({
  prefixUrl: env.VITE_SERVER_URL + "/v1",
  credentials: "include",
});
