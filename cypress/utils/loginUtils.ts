/// <reference types="cypress"/>
export function logIn() {
  Cypress.config("pageLoadTimeout", 60000);
  Cypress.config("defaultCommandTimeout", 15000);

  const isAdminLoggedIn = localStorage.getItem("admin")?.length > 0;
  if (!isAdminLoggedIn) {
    return cy.visit("/").then(() => {
      cy.get('input[name="username"]')
        .click()
        .clear()
        .type(Cypress.env("user"))
        .get('input[name="password"]')
        .click()
        .clear()
        .type(Cypress.env("password"))
        .get(".ffa-button")
        .click();
    });
  }
}
