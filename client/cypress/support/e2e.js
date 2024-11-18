// Handle uncaught exceptions in tests
Cypress.on('uncaught:exception', (err) => {
    console.error('Uncaught exception:', err);
    return false; // Prevent Cypress from failing tests
  });