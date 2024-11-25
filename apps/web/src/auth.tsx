import { createContext, useEffect, useState } from "react";

import { createClient } from "@connectrpc/connect";
import { User } from "./gen/proto/fijoy/v1/user_pb";
import { UserService } from "./gen/proto/fijoy/v1/user_pb";
import { finalTransport } from "./lib/connect";

export interface AuthContext {
  user: User | undefined;
  isLoading: boolean;
}

const userClient = createClient(UserService, finalTransport);

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userClient
      .getUser({})
      .catch(() => {
        // console.error(error);
      })
      .then((user) => {
        setUser(user || undefined);
        setIsLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
