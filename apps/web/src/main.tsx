import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import packageJson from "../package.json";

// Import the generated route tree
import { QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./auth";
import { Toaster } from "./components/ui/sonner";

import { TransportProvider } from "@connectrpc/connect-query";
import { finalTransport } from "./lib/connect";
import { queryClient } from "./lib/query";
import { App } from "./app";
import { ProfileProvider } from "./profile";

import * as Sentry from "@sentry/react";
import { env } from "./env";

Sentry.init({
  dsn: env.VITE_SENTRY_DSN_WEB,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/api\.fijoy\.app/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  release: packageJson.version,
});

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
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <TransportProvider transport={finalTransport}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ProfileProvider>
              <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <App />
                <Toaster />
              </ThemeProvider>
            </ProfileProvider>
          </AuthProvider>
        </QueryClientProvider>
      </TransportProvider>
    </StrictMode>,
  );
}
