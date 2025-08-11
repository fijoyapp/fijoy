import type { RootQuery$data } from "./routes/__generated__/RootQuery.graphql";
import { createContext } from "react";

export interface DataContext {
  data: RootQuery$data;
}

// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext<DataContext | null>(null);

export function DataProvider({
  children,
  data,
}: {
  data: RootQuery$data;
  children: React.ReactNode;
}) {
  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
}
