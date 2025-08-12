import "./instrument.ts";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// Import the generated route tree
import { QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";

import { queryClient } from "./lib/query";
import { App } from "./app";

import { RelayEnvironment } from "./relay";
import * as Sentry from "@sentry/react";

BigInt.prototype["toJSON"] = function (): string {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

// Render the app
const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement, {
    // Callback called when an error is thrown and not caught by an ErrorBoundary.
    onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
      // eslint-disable-next-line no-console
      console.warn("Uncaught error", error, errorInfo.componentStack);
    }),
    // Callback called when React catches an error in an ErrorBoundary.
    onCaughtError: Sentry.reactErrorHandler(),
    // Callback called when React automatically recovers from errors.
    onRecoverableError: Sentry.reactErrorHandler(),
  });

  root.render(
    <StrictMode>
      <RelayEnvironment>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <App />
            <Toaster />
          </ThemeProvider>
        </QueryClientProvider>
      </RelayEnvironment>
    </StrictMode>,
  );
}
