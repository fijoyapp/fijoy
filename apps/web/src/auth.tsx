import { createContext } from "react";

import { useQuery } from "@tanstack/react-query";
import { fetchQuery, graphql } from "relay-runtime";
import { environment } from "./environment";
import { authQuery } from "./__generated__/authQuery.graphql";

export interface AuthContext {
  user: authQuery["response"]["user"] | undefined;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContext | null>(null);

const UserQuery = graphql`
  query authQuery {
    user {
      id
    }
  }
`;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return fetchQuery<authQuery>(environment, UserQuery, {})
        .toPromise()
        .catch(() => null);
    },
  });

  return (
    <AuthContext.Provider value={{ user: data?.user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
