import { RelayEnvironmentProvider } from "react-relay";
import { environment } from "./environment";

export function RelayEnvironment({ children }: { children: React.ReactNode }) {
  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
}
