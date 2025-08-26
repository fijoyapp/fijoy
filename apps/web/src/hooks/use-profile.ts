import { ProfileContext } from "@/profile";
import { use } from "react";

export function useProfile() {
  const context = use(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within an ProfileProvider");
  }
  return context;
}
