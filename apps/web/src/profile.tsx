import { createContext } from "react";
import {
  profileFragment$data,
  profileFragment$key,
} from "./lib/queries/__generated__/profileFragment.graphql";

export interface ProfileContext {
  profile: profileFragment$data[number];
  profileRef: profileFragment$key[number];
  profiles: profileFragment$data;
  profilesRef: profileFragment$key;
}

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
      value={{ profile, profileRef, profiles, profilesRef }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
