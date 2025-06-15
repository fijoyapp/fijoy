import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import pluginRouter from "@tanstack/eslint-plugin-router";
import relay from "eslint-plugin-relay";

export default tseslint.config(
  { ignores: ["./dist", "./coverage", "./src/gen"] },
  {
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      pluginRouter.configs["flat/recommended"],
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: { relay },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...relay.configs["ts-recommended"].rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-console": "error",
    },
  },
);
