import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/user";
import axios from "axios";
import { env } from "./env";

export interface AuthContext {
  user: User | null;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get(env.VITE_BACKEND_URL + "/user", {
        withCredentials: true,
      })
      .then((r) => {
        setUser(User.parse(r.data));
      })
      .catch(() => setUser(null));
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
