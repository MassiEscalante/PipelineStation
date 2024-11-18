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
  e2e: {
    setupNodeEvents(on, config) {
      // You can implement node event listeners here if needed
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Specify the pattern for e2e tests
    supportFile: "cypress/support/commands.js", // Reuse commands.js for e2e tests
  },
});