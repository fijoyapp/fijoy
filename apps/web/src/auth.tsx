import { type userFragment$data } from "./lib/queries/__generated__/userFragment.graphql";
import { createContext } from "react";

export interface AuthContext {
  user: userFragment$data;
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: userFragment$data;
}) {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
