import globals from "globals";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import { Linter } from "eslint";
import parser from "@typescript-eslint/parser"; // Explicitly import the parser

/** @type {Linter.FlatConfig[]} */
export default [
  {
    files: ["src/**/*.{ts,tsx}"], // Explicitly include src files
    languageOptions: {
      parser, // Pass the imported parser
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...Object.fromEntries(
          Object.entries(globals.browser).filter(([key]) => key.trim() === key) // Filter out globals with spaces
        ),
      },
    },
    plugins: {
      "react-refresh": eslintPluginReactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": "warn", // Simplified rule
    },
  },
];