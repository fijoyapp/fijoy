import { createContext, useContext } from "react";
import { useQuery } from "@connectrpc/connect-query";
import { getUser } from "./gen/proto/fijoy/v1/user-UserService_connectquery";
import { User } from "./gen/proto/fijoy/v1/user_pb";

export interface AuthContext {
  user: User | undefined;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useQuery(getUser, {}, { retry: false });

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
