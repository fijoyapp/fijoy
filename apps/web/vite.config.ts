import { sentryVitePlugin } from "@sentry/vite-plugin";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-vite-plugin";
import packageJson from "./package.json";
import tailwindcss from "@tailwindcss/vite";

import relay from "vite-plugin-relay";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tanstackRouter({ routeFileIgnorePattern: "^(__generated__|-)" }),
    sentryVitePlugin({
      org: "fijoy",
      project: "web",
      release: {
        name: packageJson.version,
      },
      telemetry: false,
    }),
    relay,
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
  },
});
