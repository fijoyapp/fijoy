import { createContext } from "react";
import { profileFragment$data } from "./lib/queries/__generated__/profileFragment.graphql";

export interface ProfileContext {
  profile: profileFragment$data[number];
}

export const ProfileContext = createContext<ProfileContext | null>(null);

export function ProfileProvider({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: profileFragment$data[number];
}) {
  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
}
