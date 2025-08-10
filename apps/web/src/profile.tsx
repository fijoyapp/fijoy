import { createContext } from "react";
import type {
  profileFragment$data,
  profileFragment$key,
} from "./lib/queries/__generated__/profileFragment.graphql";

export interface ProfileContext {
  profile: profileFragment$data[number];
  defaultCurrency: string;
  profileRef: profileFragment$key[number];
  profiles: profileFragment$data;
  profilesRef: profileFragment$key;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ProfileContext = createContext<ProfileContext | null>(null);

export function ProfileProvider({
  children,
  profile,
  profileRef,
  profiles,
  profilesRef,
}: {
  children: React.ReactNode;
  profile: profileFragment$data[number];
  profileRef: profileFragment$key[number];
  profiles: profileFragment$data;
  profilesRef: profileFragment$key;
}) {
  return (
    <ProfileContext.Provider
      value={{
        profile,
        profileRef,
        profiles,
        profilesRef,
        defaultCurrency: profile.currencies[0],
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
