import { createContext, useCallback, useEffect, useState } from "react";
import { Profile } from "./gen/proto/fijoy/v1/profile_pb";
import { ProfileService } from "./gen/proto/fijoy/v1/profile_connect";
import { createPromiseClient } from "@connectrpc/connect";

import { finalTransport } from "./lib/connect";

export interface ProfileContext {
  profile: Profile | undefined;
  isLoading: boolean;
  refresh: () => void;
}

const profileClient = createPromiseClient(ProfileService, finalTransport);

export const ProfileContext = createContext<ProfileContext | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    setIsLoading(true);
    profileClient
      .getProfile({})
      .catch(() => {
        // console.error(error);
      })
      .then((profile) => {
        setProfile(profile || undefined);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile: profile, isLoading, refresh }}>
      {children}
    </ProfileContext.Provider>
  );
}
