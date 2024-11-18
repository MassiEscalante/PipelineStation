import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}", // For component tests
    supportFile: "cypress/support/commands.js", // Direct reference to commands.js
  },
});