import { ProfileContext } from "@/profile";
import { useContext } from "react";

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within an ProfileProvider");
  }
  return context;
}
