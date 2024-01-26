import { env } from "@/env";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch(env.VITE_BACKEND_URL + "/user", {
        credentials: "include",
      });
      return User.parse(await response.json());
    },
    retry: false,
  });
};
