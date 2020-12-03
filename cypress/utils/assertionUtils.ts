/// <reference types="cypress"/>

export function assertToastMessageDisplayed(toastMessage: string) {
  return cy.get(".toastr").should("be.visible").should("contain.text", toastMessage);
}

export function assertLoadingSpinnerIsVisible() {
  return cy.get(".spinner-icon").should("be.visible");
}
