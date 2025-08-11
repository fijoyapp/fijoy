import { env } from "@/env";
import { toast } from "sonner";

export const setProfile = async (profileID: string) => {
  const response = await fetch(env.VITE_SERVER_URL + "/v1/auth/set-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `profile_id=${encodeURIComponent(profileID)}`,
    credentials: "include",
    redirect: "manual",
  });

  if (response.type === "opaqueredirect" || response.status === 302) {
    window.location.href = "/home";
  } else {
    toast.error("Failed to load profile, please try again!");
  }
};
