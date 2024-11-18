// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Example custom command to log in
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
});

// Example command to load questions
Cypress.Commands.add('loadQuestions', (fixture = 'questions.json') => {
    cy.intercept('GET', '/api/questions/random', { fixture }).as('getQuestions');
});
  
  // You can add more commands here as needed