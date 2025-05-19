import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { profileQueryOptions } from "./lib/queries/profile";
import { profileQuery } from "./lib/queries/__generated__/profileQuery.graphql";

export interface ProfileContext {
  profile: profileQuery["response"]["profiles"][number] | undefined;
  isLoading: boolean;
}

export const ProfileContext = createContext<ProfileContext | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useQuery(profileQueryOptions());

  return (
    <ProfileContext.Provider value={{ profile: data?.profiles[0], isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
}
