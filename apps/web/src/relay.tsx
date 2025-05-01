import { useMemo } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { createEnvironment } from "./environment";

export function RelayEnvironment({ children }: { children: React.ReactNode }) {
  const environment = useMemo(() => {
    return createEnvironment();
  }, []);

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
}
