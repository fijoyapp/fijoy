import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

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
