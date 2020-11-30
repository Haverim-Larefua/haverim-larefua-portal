/// <reference types="cypress"/>

export function assertToastMessageDisplayed(toastMessage: string) {
  cy.get(".toastr").should("be.visible").should("contain.text", toastMessage);
}
