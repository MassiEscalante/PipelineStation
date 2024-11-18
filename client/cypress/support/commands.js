// ***********************************************
// This file contains custom Cypress commands
// ***********************************************

// Custom command to simulate login
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Custom command to load mock questions
Cypress.Commands.add("loadQuestions", (fixture = "questions.json") => {
  cy.intercept("GET", "/api/questions/random", { fixture }).as("getQuestions");
});

// Custom command to mount React components in tests
import { mount } from "cypress/react"; // Import the mount function from @cypress/react
Cypress.Commands.add("mount", mount);

// Example usage:
// cy.mount(<MyComponent />);